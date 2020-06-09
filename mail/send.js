import nodemailer from 'nodemailer'
import { credentials } from '../config'

const transporter = nodemailer.createTransport(
  {
    host: "smtp.office365.com", // hostname
    secure: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: credentials.user,
      pass: credentials.pass,
    }
  }
  // {
  //   service:'hotmail',
  //   auth: {
  //     user: credentials.user,
  //     pass: credentials.pass,
  //   }
  // }
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

