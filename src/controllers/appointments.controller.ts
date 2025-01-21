import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUpdateAppointments } from '../types/appointment.requests'
const prisma = new PrismaClient()

// GET ALL APOINTMENTS
async function getAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	try {
		let data = await prisma.apointments.findMany({
			include: { user: true, bike: true },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET HIS APOINTMENTS

async function getHisAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	const { userId } = req.params
	console.log(userId)

	try {
		let data = await prisma.apointments.findMany({
			where: { userId },
			include: {
				user: true,
				bike: true,
			},
		})
		console.log('>>>>>>>>>>>>>>>>', data)
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET ONE APOINTMENT
async function getOneAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	const { appointmentId } = req.params
	console.log(appointmentId)

	try {
		let data = await prisma.apointments.findUnique({
			where: { id: appointmentId },
			include: { user: true },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// CREATE AN APOINTMENT
async function createAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	console.log(req.body)

	try {
		const { userId } = req.params
		let preferredDate = new Date(req.body.preferredDate)
		let { bikeId } = req.body
		let createdAppointment = await prisma.apointments.create({
			data: { preferredDate, bikeId, userId },
		})
		res.status(201).json(createdAppointment)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// DELETE A BIKE
async function deleteAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	try {
		let { appointmentId } = req.params
		let data = await prisma.apointments.delete({
			where: { id: appointmentId },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// UPDATE AN APOINTMENT
async function updateAppointments(
	req: RequestCreateUpdateAppointments,
	res: Response,
	next: NextFunction
) {
	//  retrieving data from body
	const { bikeId } = req.body
	const preferredDate = new Date(req.body.preferredDate)
	const dateUpdated = {
		bikeId,
		preferredDate,
	}
	try {
		let { appointmentId } = req.params
		let data = await prisma.apointments.update({
			where: { id: appointmentId },
			data: dateUpdated,
		})

		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	getAppointments,
	createAppointments,
	deleteAppointments,
	updateAppointments,
	getHisAppointments,
	getOneAppointments,
}
