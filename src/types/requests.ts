import { Request } from 'express'

interface RequestCreateUser extends Request {
	body: {
		firstName: string
		email: string
		isAdmin?: boolean
		password: string
	}
}
// interface RequestUpdateUser extends Request {
// 	body: {
// 		firstName: string
// 		email: string
// 		isAdmin?: boolean
// 		lastName?: string
// 		phone?: number
// 		isEmployee?: boolean
// 		avatar?: string
// 		address?: string
// 		bike?: string[]
// 	}
// }

export { RequestCreateUser }
