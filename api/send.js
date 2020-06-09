import Bluebird from 'bluebird'
import { sendMail, mailSchema } from '../mail'
import { Logger } from '../infrastructure'
import { validateSchema, handleSuccessResponse, handleErrorResponse } from '../common'

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  return Bluebird.resolve(req.body)
    .tap(validateSchema(mailSchema))
    .then(schema => sendMail(schema))
    .then(handleSuccessResponse(res))
    .catch(handleErrorResponse(res, Logger))
}

