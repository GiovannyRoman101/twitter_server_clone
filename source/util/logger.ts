import expressWinston from 'express-winston'
import winston, { transports, format } from 'winston'

const logger = winston.createLogger({
	transports: [
		new transports.File({
			filename: './log/server.log',
			format: format.combine(
				format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
				format.align(),
				format.printf((info) => `${info.level}: ${info.timestamp}:${info.message} `)
			)
		}),
		new transports.Console({
			format: format.combine(
				format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
				format.align(),
				format.printf((info) => `${info.level}: ${info.timestamp}:${info.message} `)
			)
		})
	]
})



export default logger