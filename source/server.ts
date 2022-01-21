import express from 'express'
import bodyParser from 'body-parser'
import config from './config/config'
import logger from './util/logger'

const NAMESPACE = 'Server'
const router = express()

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// rules of API
router.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET POST PATCH DELETE')
		return res.status(200).json({})
	}
	next()
})

// Route not found
router.use((req, res, next) => {
	const error = new Error('not found')
	logger.error(`404 || ${error.message} || ${error.stack}`)
	return res.status(404).json({
		message: error.message
	})
})

router.listen(config.server.port, () => {
	console.log(`SERVER is running on port ${config.server.port}`)
})

