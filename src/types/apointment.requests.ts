import { Request } from 'express'

export interface RequestCreateUpdateApointments extends Request {
	body: {
		bikeId?: string
		preferredDate?: string
	}
}
