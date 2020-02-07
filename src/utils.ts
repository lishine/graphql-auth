import { verify } from 'jsonwebtoken'
import { Context } from './context'

export const APP_SECRET = 'appsecret321'

interface Token {
	userId: string
}

export function getUserId(context: Context) {
	const Authorization = context.request.get('Authorization')
	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		console.log('token', token)
		const verifiedToken = verify(token, APP_SECRET) as Token
		console.log('verifiedToken', verifiedToken)
		return verifiedToken && verifiedToken.userId
	}
}
