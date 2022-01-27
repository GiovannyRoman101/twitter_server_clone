import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.bearer
	const { JWT_SECRET } = process.env

	let jwtPayload
	if (!token || !JWT_SECRET) {
		return res.status(401).send('access denied')
	} else {
		try {
			const tokenBody = Array.isArray(token) ? token[0] : token
			jwtPayload = <any>jwt.verify(tokenBody, JWT_SECRET)
			// user id in res.locals.user
			res.locals.jwtPayload = jwtPayload
			res.locals.user = res.locals.jwtPayload.id
		} catch (err) {
			return res.status(401).json({ message: 'Invalid auth token provided' })
		}

		const { id } = jwtPayload
		const newToken = jwt.sign({ id }, JWT_SECRET, {
			expiresIn: '1h'
		})
		res.setHeader('Bearer', newToken)
		next()
	}
}
