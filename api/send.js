import Bluebird from 'bluebird'
import { sendMail, mailSchema } from '../mail'
import { Logger } from '../infrastructure'
import { validateSchema, handleSuccessResponse, handleErrorResponse } from '../common'


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  return Bluebird.resolve(req.body)
    .tap(validateSchema(mailSchema))
    .then(schema => sendMail(schema))
    .then(handleSuccessResponse(res))
    .catch(handleErrorResponse(res, Logger))
}

export default allowCors(handler)
