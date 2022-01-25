import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interface'

class TweetController implements Controller {
	public path: string
	public router = Router()
	constructor() {
		this.path = '/tweets'
		this.initializeRoutes()
	}

	private initializeRoutes(): void {
		this.router.get(this.path)
	}
}

export default TweetController
