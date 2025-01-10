import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUpdateBike } from '../types/bike.requests'
const prisma = new PrismaClient()

// GET ALL bikes
async function getBikes(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	try {
		let data = await prisma.bike.findMany()
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET HIS bikes
async function getHisBikes(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	const { userId } = req.params
	try {
		let data = await prisma.bike.findMany({
			where: { userId },
			include: { user: true },
		})
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET ONE bike
async function getOneBike(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	const { plate } = req.body
	console.log(plate)

	try {
		let data = await prisma.bike.findUnique({
			where: { plate },
			include: { user: true },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// CREATE A BIKE
async function createBike(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	console.log(req.body)

	try {
		const userId = req.params.userId
		let { plate, vin, model, family } = req.body
		let createdBike = await prisma.bike.create({
			data: { plate, vin, model, family, userId },
		})
		res.status(201).json(createdBike)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// DELETE A BIKE
async function deleteBike(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	try {
		let { bikeId } = req.params
		let data = await prisma.user.delete({
			where: { id: bikeId },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// UPDATE A Bike
async function updateBike(
	req: RequestCreateUpdateBike,
	res: Response,
	next: NextFunction
) {
	//  retrieving data from body
	const { plate, vin, model, family } = req.body

	// reassigning data
	const updatedBike = {
		plate,
		vin,
		model,
		family,
	}
	try {
		let { userId } = req.params
		let data = await prisma.bike.update({
			where: { id: userId },
			data: updatedBike,
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	getBikes,
	createBike,
	deleteBike,
	updateBike,
	getHisBikes,
	getOneBike,
}
