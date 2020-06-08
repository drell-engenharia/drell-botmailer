// import { logFormat } from './format-levels'
import { createLogger, transports } from 'winston'

const { Console } = transports

const Logger = createLogger({
  level: 'info',
  defaultMeta: {
    projectLabel: 'send-mail'
  },
  exitOnError: false,
  transports: [
    new Console()
  ]
})

export {
  Logger
}
