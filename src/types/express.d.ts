// import { Request } from 'express'

// declare namespace Express {
// 	interface Request {
// 		payload?: {
// 			id?: string
// 			firstName: string
// 			email: string
// 			isEmployee: boolean
// 		}
// 	}
// }
import { Request } from 'express'

declare global {
	namespace Express {
		interface Request {
			payload?: {
				id?: string
				firstName: string
				email: string
				isEmployee: boolean
			}
		}
	}
}
