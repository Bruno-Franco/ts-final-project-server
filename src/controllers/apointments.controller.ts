import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUpdateApointments } from '../types/apointment.requests'
const prisma = new PrismaClient()

// GET ALL APOINTMENTS
async function getApointments(
	req: RequestCreateUpdateApointments,
	res: Response,
	next: NextFunction
) {
	try {
		let data = await prisma.apointments.findMany({
			include: { user: true },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET HIS APOINTMENTS

async function getHisApointments(
	req: RequestCreateUpdateApointments,
	res: Response,
	next: NextFunction
) {
	const { bikeId } = req.body
	try {
		let data = await prisma.apointments.findMany({
			where: { bikeId },
			include: { user: true },
		})
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET ONE APOINTMENT
async function getOneApointments(
	req: RequestCreateUpdateApointments,
	res: Response,
	next: NextFunction
) {
	const { apointmentId } = req.params
	console.log(apointmentId)

	try {
		let data = await prisma.apointments.findUnique({
			where: { id: apointmentId },
			include: { user: true },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// CREATE AN APOINTMENT
async function createApointments(
	req: RequestCreateUpdateApointments,
	res: Response,
	next: NextFunction
) {
	console.log(req.body)

	try {
		const { userId } = req.params
		let preferredDate = new Date(req.body.preferredDate)
		let { bikeId } = req.body
		let createdApointment = await prisma.apointments.create({
			data: { preferredDate, bikeId, userId },
		})
		res.status(201).json(createdApointment)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// DELETE A BIKE
async function deleteApointments(
	req: RequestCreateUpdateApointments,
	res: Response,
	next: NextFunction
) {
	try {
		let { apointmentId } = req.params
		let data = await prisma.apointments.delete({
			where: { id: apointmentId },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// UPDATE AN APOINTMENT
async function updateApointments(
	req: RequestCreateUpdateApointments,
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
		let { apointmentId } = req.params
		let data = await prisma.apointments.update({
			where: { id: apointmentId },
			data: dateUpdated,
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	getApointments,
	createApointments,
	deleteApointments,
	updateApointments,
	getHisApointments,
	getOneApointments,
}
