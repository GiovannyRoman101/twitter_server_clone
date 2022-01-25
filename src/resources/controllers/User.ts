import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import validationMiddleware from '@/middleware/validation.middleware'
import vaildate from '@/resources/validations/user.validation'
import HttpException from '@/utils/exceptions/http.exception'
import UserService from '@/resources/services/user.service'

class UserController implements Controller {
	public path: string
	public router = Router()
	private UserService: UserService
	constructor() {
		this.path = '/users'
		this.UserService = new UserService()
		this.initalizeRoutes()
	}

	private initalizeRoutes(): void {
		this.router.post(`${this.path}`, validationMiddleware(vaildate.create), this.createUser)
	}

	private createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { username, email, password } = req.body
			const user = await this.UserService.create(username, email, password)
			res.status(201).json({ user })
		} catch (error) {
			next(new HttpException(400, `Cannot create User`))
		}
	}
}

export default UserController
