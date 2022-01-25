import User from '../../entities/User'
import bcrypt from 'bcryptjs'

class UserService {
	public async create(username: string, email: string, password: string): Promise<User> {
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
}

export default UserService
