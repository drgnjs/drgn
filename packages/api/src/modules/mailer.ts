import nodemailer from 'nodemailer'

const mailer = nodemailer.createTransport({
  host: 'support.drgnjs.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
})

export default mailer
