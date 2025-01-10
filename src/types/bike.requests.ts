import { Request } from 'express'

export interface RequestCreateUpdateBike extends Request {
	body: {
		plate?: string
		model?: string
		family?: string
		vin?: string
	}
}
