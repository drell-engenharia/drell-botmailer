import nodemailer from 'nodemailer'
import { credentials } from '../config'

const transporter = nodemailer.createTransport(
  {
    host: credentials.host,
    secure: credentials.secure,
    port: credentials.port,
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: credentials.user,
      pass: credentials.pass,
    }
  }
)

export const sendMail = async ({ text, subject, name, to}) => 
  await transporter.sendMail(
    {
      text,
      subject,
      from: `${name} <${credentials.user}>`,
      to
    }
  )
  .then(({response}) => ({send: true, response}))
  .catch(err => ({error: err, send: false}))

