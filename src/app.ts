import express, { Application } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import { User } from './entities/User'
import { Tweet } from './entities/Tweet'
import Controller from '@/utils/interfaces/controller.interface'
import ErrorMiddleware from '@/middleware/error.middleware'
import { createConnection } from 'typeorm'

class App {
	public port: number
	public express: Application

	constructor(controllers: Controller[], port: number) {
		this.express = express()
		this.port = port
		this.initializeDataBase()
		this.initializeMiddleWare()
		this.initializeController(controllers)
		this.initalizeErrorHandling()
	}
	/**
	 *
	 */
	private initializeDataBase(): void {
		const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env

		createConnection({
			type: 'mysql',
			database: MYSQL_DATABASE,
			host: MYSQL_HOST,
			username: MYSQL_USER,
			password: MYSQL_PASSWORD,
			logging: true,
			synchronize: true,
			entities: [User, Tweet]
		})
	}

	private initializeMiddleWare(): void {
		this.express.use(helmet())
		this.express.use(cors())
		this.express.use(express.json())
		this.express.use(express.urlencoded({ extended: false }))
		this.express.use(compression())
	}

	private initializeController(controllers: Controller[]): void {
		controllers.forEach((controller: Controller) => {
			this.express.use('/api', controller.router)
		})
	}

	private initalizeErrorHandling(): void {
		this.express.use(ErrorMiddleware)
	}

	public listen(): void {
		this.express.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`)
		})
	}
}

export default App
