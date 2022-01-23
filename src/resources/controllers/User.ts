import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interface'

class UserController implements Controller {
	public path: string
	public router = Router()
	constructor() {
		this.path = '/users'
		this.initalizeRoutes()
	}

	private initalizeRoutes(): void {
		this.router.post(this.path)
	}
}

export default UserController
