import { Router, Request, Response, NextFunction } from 'express'
import Controller from '@/utils/interfaces/controller.interface'
import validationMiddleware from '@/middleware/validation.middleware'
import vaildate from '@/resources/validations/user.validation'
import HttpException from '@/utils/exceptions/http.exception'
import UserService from '@/resources/services/user.service'
import { checkJwt } from '@/middleware/authentication'

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
		this.router.post(`${this.path}/login`, validationMiddleware(vaildate.login), this.loginUser)
		this.router.get(`${this.path}`, checkJwt, this.getUser)
		this.router.get(`${this.path}/logout`, this.loggingOut)
	}

	private createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { username, email, password } = req.body
			const user = await this.UserService.createUser(username, email, password)
			res.status(201).json({ user })
		} catch (error) {
			next(new HttpException(400, `Cannot create User`))
		}
	}

	private loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			const { email, password } = req.body
			const token = await this.UserService.loginUser(email, password)
			if (token) {
				res.status(202).send(token)
			} else {
				res.status(401).json({})
			}
		} catch (error) {
			next(new HttpException(401, `Cannot access User`))
		}
	}

	private getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			console.log(res.locals.user)
		} catch (error) {
			next(new HttpException(500, 'Something went wrong'))
		}
	}

	private loggingOut = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
		try {
			res.setHeader('Set-Cookie', ['Authorization=;Max-age=0'])
			res.send(200)
		} catch (error) {
			next(new HttpException(500, `Cannot Logout`))
		}
	}

	// private postTweet = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
	// 	try {
	// 		const { } = req.body
	// 	} catch (error) {
	// 		next(new HttpException(400, `Cannot create a tweet`))
	// 	}
	// }
}

export default UserController
