import { Request } from 'express'

export interface RequestCreateUpdateBike extends Request {
	body: {
		id?: string
		plate?: string
		model?: string
		family?: string
		vin?: string
	}
}
