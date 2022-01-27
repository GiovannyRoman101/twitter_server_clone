import { cleanEnv, str, port } from 'envalid'

function validateEnv(): void {
	cleanEnv(process.env, {
		NODE_ENV: str({
			choices: ['development', 'production']
		}),
		PORT: port({ default: 3000 }),
		MYSQL_HOST: str(),
		MYSQL_DATABASE: str(),
		MYSQL_USER: str(),
		MYSQL_PASSWORD: str(),
		JWT_SECRET: str()
	})
}

export default validateEnv
