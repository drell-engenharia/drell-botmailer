import Bluebird from 'bluebird'
import { ApplicationError } from './errors'

export const validateSchema = schema => payload => {
  return schema.validate(payload, { abortEarly: false })
    .catch(({ errors }) => Bluebird.reject(new ApplicationError({ code: 400, errors })))
}
