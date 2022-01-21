import dotenv from 'dotenv'

dotenv.config()

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'twitterdb'
const MYSQL_USER = process.env.MYSQL_USER || 'twitterdb'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'twitterdb'

const SERVER_HOSTNAME = process.env.SERVER_PORT || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 8000

const SERVER = {
	hostname: SERVER_HOSTNAME,
	port: SERVER_PORT
}

const config = {
	server: SERVER
}

export default config