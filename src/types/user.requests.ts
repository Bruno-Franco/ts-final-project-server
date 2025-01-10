import { Request } from 'express'

export interface RequestCreateUpdateUser extends Request {
	body: {
		firstName: string
		lastName?: string
		email: string
		isAdmin?: boolean
		password: string
		phone: number
		isEmployee?: boolean
		avatar?: string
		address?: string
		bike?: string[]
	}
}
