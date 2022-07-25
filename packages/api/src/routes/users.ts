import getUser from '../modules/getUser'
import validateSession from '../modules/validateSession'
import type { UserDocument } from '../schemas/users'
import type { Router } from '../types'

const userRouter = async (api: Router) => {
  api.addHook('preValidation', validateSession)

  api.get('/@me', async request => {
    const user = await getUser(request.user.email) as UserDocument

    user.password = undefined // in case delete does not work as expected

    delete user.password

    return {
      user
    }
  })

  /*
  api.patch('/users/@me/passwordless', async req => {
    
  })

  api.patch('/users/@me/2fa', async req => {
    const secret = authenticator.generateSecret()
    const keyuri = authenticator.keyuri(req.body.email, 'drgn.js', secret)
  })
  */
}

export default userRouter
