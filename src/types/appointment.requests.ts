import { Request } from 'express'

export interface RequestCreateUpdateAppointments extends Request {
	body: {
		bikeId?: string
		preferredDate?: string
	}
}
