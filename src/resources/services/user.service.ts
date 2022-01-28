import User from '@/entities/User'
import Tweet from '@/entities/Tweet'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UserService {
	public async createUser(username: string, email: string, password: string): Promise<User> {
		try {
			const user = new User()
			user.username = username
			user.email = email
			user.password = await bcrypt.hash(password, 10)
			await user.save()
			return user
		} catch (error) {
			throw new Error('Unable to create User')
		}
	}

	public async loginUser(email: string, password: string): Promise<string | null> {
		try {
			const user = await User.findOne({ where: [{ email: email }] })
			const { JWT_SECRET } = process.env
			const payload = {
				id: user?.id
			}
			if (user && JWT_SECRET) {
				const result = await bcrypt.compare(password, user.password)
				const token = jwt.sign(payload, JWT_SECRET, {
					expiresIn: '1h'
				})
				return result ? token : null
			} else {
				return null
			}
		} catch (error) {
			throw new Error('Unable to accesss user')
		}
	}

	public async createTweet(id: number, message: string): Promise<Tweet> {
		try {
			const tweet = new Tweet()
			tweet.id = id
			tweet.message = message
			tweet.save()
			return tweet
		} catch (error) {
			throw new Error('Unable to create Tweet')
		}
	}
}

export default UserService
