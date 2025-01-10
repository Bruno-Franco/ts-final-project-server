import { Request } from 'express'

declare namespace Express {
	interface Request {
		payload?: {
			userName: string
			email: string
		}
	}
}
declare namespace Express {
	interface Request {
		updateUser?: {
			firstName: string
			email: string
			isAdmin?: boolean
			lastName?: string
			phone?: number
			isEmployee?: boolean
			avatar?: string
			address?: string
			bike?: string[]
		}
	}
}
