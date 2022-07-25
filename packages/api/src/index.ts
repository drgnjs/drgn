import fastifyCompress from '@fastify/compress'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import fastifyJwt from '@fastify/jwt'
import fastifyRateLimit from '@fastify/rate-limit'
import { Type } from '@sinclair/typebox'
import fastify from 'fastify'
import mongoose from 'mongoose'
import { authenticator } from 'otplib'
import { globalCache, loginAttemptsCache, userCache } from './modules/cache'
import decrypt from './modules/decrypt'
import encrypt from './modules/encrypt'
import getUser from './modules/getUser'
import mailer from './modules/mailer'
import validateSession from './modules/validateSession'
import serverRouter from './routes/servers'
import userRouter from './routes/users'
import insightsSchema from './schemas/insights'
import userSchema from './schemas/users'
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

/* ................ create server ................ */

const api = fastify({
  ajv: {
    customOptions: {
      strict: 'log',
      keywords: ['kind', 'modifier']
    }
  }
}).withTypeProvider<TypeBoxTypeProvider>()

/* ................ plugins ................ */

await api.register(fastifyCompress)

await api.register(fastifyHelmet)

await api.register(fastifyCors, {
  origin: '*'
})

await api.register(fastifyJwt, {
  secret: JWT_SECRET
})

await api.register(fastifyRateLimit, {
  max: RATE_LIMIT,
  timeWindow: '1m',
  global: true
})

/* ................ enable caching ................ */

api.addHook('onRequest', async (request, reply) => {
  reply.header('cache-control', 'public, max-age=30')
})

/* ................ routers ................ */

// @ts-ignore
await api.register(serverRouter, {
  prefix: '/servers'
})

// @ts-ignore
await api.register(userRouter, {
  prefix: '/users'
})

/* ................ /insights ................ */

api.post('/insights', {
  schema: {
    body: Type.Object({
      os: Type.String({
        maxLength: 64
      }),
      version: Type.String({
        minLength: 5,
        maxLength: 10
      })
    })
  },
  onRequest: validateSession,
  // @ts-ignore
  preHandler: api.rateLimit({
    max: 1,
    timeWindow: '30m'
  })
}, async request => {
  const document = new insightsSchema({
    // @ts-ignore
    os: request.body.os,
    // @ts-ignore
    version: request.body.version
  })

  await document.save()
})

/* ................ /login ................ */

api.post('/login', {
  schema: {
    body: Type.Object({
      email: Type.String({
        minLength: 6,
        maxLength: 64
      }),
      password: Type.Optional(
        Type.String({
          minLength: 8,
          maxLength: 64
        })
      ),
      token: Type.Optional(
        Type.String()
      ),
      pin: Type.Optional(
        Type.String({
          minLength: 6,
          maxLength: 6
        })
      )
    })
  }
}, async (request, reply) => {
  const loginAttempts: number | undefined = await loginAttemptsCache.get(request.body.email)

  // block any further attempts
  if (loginAttempts && loginAttempts > 9)
    throw new Error('too much tries')

  // send email notification on 10 attempts
  if (loginAttempts && loginAttempts === 10)
    await mailer.sendMail({
      from: '"drgn" <noreply@support.drgnjs.com>',
      to: request.body.email,
      subject: 'Caught a hacker',
      text: `Hey there! 👋\n\nSomeone has tried to log in to your account several times. We blocked the attempt and paused the login to your account for the next hour.\n\nBest regards,\nthe drgn.js crew 😎`,
      html: `<p>Hey there! 👋<br /><br />Someone has tried to log in to your account several times. We blocked the attempt and paused the login to your account for the next hour.<br /><br />Best regards,<br />the drgn.js crew 😎</p>`
    })

  // increase login attempts
  if (!loginAttempts) await loginAttemptsCache.set(request.body.email, 1)
  else await loginAttemptsCache.update(request.body.email, loginAttempts + 1)

  const user = await getUser(request.body.email)

  if (!user)
    throw new Error('invalid email')

  if (user.passwordless) { // passwordless login
    if (!request.body.token) {
      const verifyToken = await reply.jwtSign({
        email: user.email
      }, { expiresIn: '10m' })

      await mailer.sendMail({
        from: '"drgn" <noreply@support.drgnjs.com>',
        to: user.email,
        subject: 'Verify your login',
        text: `Hey there! 👋\n\nSomeone is trying to log in into your account. If this is you, use the below code for the login.\n\nYour code: ${verifyToken}\n\nBest regards,\nthe drgn.js crew 😎`,
        html: `<p>Hey there! 👋<br /><br />Someone is trying to log in into your account. If this is you, use the below code for the login.<br /><br />Your code: <b>${verifyToken}</b><br /><br />Best regards,<br />the drgn.js crew 😎</p>`
      })
      
      throw new Error('missing token')
    }

    api.jwt.verify(request.body.token, async (err, decoded) => {
      if (err || decoded.email !== user.email)
        throw new Error('invalid token')
        
      reply.send({
        user,
        token: await reply.jwtSign({
          email: user.email,
          loggedIn: true,
          ip: request.ip
        }, { expiresIn: '30d' })
      })
    })
  } else if (user.twoFactor) { // 2fa login
    if (request.body.password !== await decrypt(user.password))
      throw new Error('invalid password')

    if (!request.body.pin)
      throw new Error('missing pin')

    if (!authenticator.check(request.body.pin, await decrypt(user.secret)))
      throw new Error('invalid pin')

    return {
      user,
      token: await reply.jwtSign({
        email: user.email,
        loggedIn: true,
        ip: request.ip
      }, { expiresIn: '30d' })
    }
  } else {
    if (request.body.password !== await decrypt(user.password))
      throw new Error('invalid password')

    return {
      user,
      token: await reply.jwtSign({
        email: user.email,
        loggedIn: true,
        ip: request.ip
      }, { expiresIn: '30d' })
    }
  }
})

/* ................ /register ................ */

api.post('/register', {
  schema: {
    body: Type.Object({
      email: Type.String({
        minLength: 6,
        maxLength: 64
      }),
      password: Type.String({
        minLength: 8,
        maxLength: 64
      })
    })
  }
}, async (request, reply) => {
  const email = request.body.email.toLowerCase()

  if (await userCache.has(email))
    throw new Error('email already taken')

  const count = await userSchema.count({ email })

  if (count !== 0) {
    throw new Error('email already taken')
  } else {
    const token = await reply.jwtSign({
      email: request.body.email,
      password: request.body.password
    }, { expiresIn: '10m' })
  
    await mailer.sendMail({
      from: '"drgn" <noreply@support.drgnjs.com>',
      to: request.body.email,
      subject: 'Verify your account',
      text: `Hey there! 👋\n\nClick ${DEV ? 'http://127.0.0.1:5000' : 'https://api.drgnjs.com'}/register/complete?token=${token} to get verified and complete your account setup.\n\nBest regards,\nthe drgn.js crew 😎`,
      html: `<p>Hey there! 👋<br /><br />Click <a href="${DEV ? 'http://127.0.0.1:5000' : 'https://api.drgnjs.com'}/register/complete?token=${token}">here</a> to get verified and complete your account setup.<br /><br />Best regards,<br />the drgn.js crew 😎</p>`
    })
  }
})

/* ................ /register/complete ................ */

api.get('/register/complete', {
  schema: {
    querystring: Type.Object({
      token: Type.String()
    })
  }
}, async (request, reply) => {
  let success = false

  api.jwt.verify(request.query.token, async (err, decoded) => {
    if (!err) {
      success = true

      const user = new userSchema({
        email: decoded.email,
        password: await encrypt(decoded.password),
        signupNumber: await userSchema.count() + 1
      })
  
      await user.save()
    }
  })

  if (success) reply.redirect('https://drgnjs.com/welcome')
  else reply.redirect('https://drgnjs.com/error?registration_issue')
})

/* ................ /download ................ */

api.get('/download', {
  schema: {
    querystring: Type.Object({
      platform: Type.Optional(
        Type.String()
      ),
      format: Type.Optional(
        Type.String()
      )
    })
  }
}, async (request, reply) => {
  let latestVersion = await globalCache.get('latestVersion')

  if (!latestVersion) {
    const { tag_name } = await (await fetch('https://api.github.com/repos/drgnjs/drgn/releases/latest')).json()

    await globalCache.set('latestVersion', tag_name)

    latestVersion = tag_name
  }

  if (request.query.platform === 'windows')
    return reply.redirect(`https://github.com/drgnjs/drgn/releases/download/${latestVersion}/drgn_${latestVersion.replace('v', '')}_x64_en-US.msi`)

  if (request.query.platform === 'linux')
    if (request.query.format === 'deb')
      return reply.redirect(`https://github.com/drgnjs/drgn/releases/download/${latestVersion}/drgn_${latestVersion.replace('v', '')}_amd64.deb`)
    else if (request.query.format === 'tar.gz')
      return reply.redirect(`https://github.com/drgnjs/drgn/releases/download/${latestVersion}/drgn.app.tar.gz`)
    else if (request.query.format === 'AppImage')
      return reply.redirect(`https://github.com/drgnjs/drgn/releases/download/${latestVersion}/drgn_${latestVersion.replace('v', '')}_amd64.AppImage`)
    else
      throw new Error('invalid format')

  if (request.query.platform === 'mac')
    return reply.redirect(`https://github.com/drgnjs/drgn/releases/download/${latestVersion}/drgn_${latestVersion.replace('v', '')}_x64.dmg`)

  throw new Error('invalid platform')
})

/* ................ status ................ */

api.head('/status', async () => {
  // respond without a body
})

/* ................ not found ................ */

api.setNotFoundHandler(async (request, reply) => {
  reply.statusCode = 404
  
  return {
    statusCode: 404,
    error: 'not found',
    message: 'not found'
  }
})

/* ................ error ................ */

api.setErrorHandler(async (err, request, reply) => {
  reply.code(400)

  return {
    statusCode: 400,
    error: 'Bad Request',
    message: err.message ? err.message : 'something went wrong'
  }
})

/* ................ launch server ................ */

await mongoose.connect(MONGO)

await api.listen({
  host: '127.0.0.1',
  port: PORT
})

console.log('API running!')
