import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUpdateUser } from '../types/user.requests'
const prisma = new PrismaClient()

// GET ALL USERS
async function getUsers(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	try {
		let data = await prisma.user.findMany()
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// GET one USERS
async function getOneUser(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	const { userId } = req.params
	try {
		let data = await prisma.user.findUnique({
			where: { id: userId },
			include: {
				bikes: true,
				Apointments: true,
			},
		})
		res.status(201).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// CREATE A USER
async function createUser(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	console.log(req.body)

	try {
		let { firstName, email, password } = req.body
		let createdUser = await prisma.user.create({
			data: { firstName, email, password },
		})
		res.status(201).json(createdUser)
	} catch (err) {
		console.log(err)
		next(err)
	}
}

// DELETE A USER
async function deleteUser(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	try {
		let { userId } = req.params
		let data = await prisma.user.delete({
			where: { id: userId },
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// UPDATE A USER
async function updateUser(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	//  retrieving data from body
	const {
		firstName,
		email,
		isAdmin,
		lastName,
		phone,
		isEmployee,
		avatar,
		address,
		bike,
	} = req.body

	// reassigning data
	const updatedUser = {
		firstName,
		email,
		isAdmin,
		lastName,
		phone,
		isEmployee,
		avatar,
		address,
		bike,
	}
	try {
		let { userId } = req.params
		let data = await prisma.user.update({
			where: { id: userId },
			data: updatedUser,
		})
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		next(err)
	}
}
// get une user by email to login
async function verifyUser(
	req: RequestCreateUpdateUser,
	res: Response,
	next: NextFunction
) {
	try {
		let data = await prisma.user.findUnique({
			where: { email: req.body.email },
			include: {
				bikes: true,
				Apointments: true,
			},
		})
		if (
			req.body.password === data.password &&
			req.body.email === data.email
		) {
			let dataToSend = { ...data, password: 'NothingToShow' }
			res.status(200).json(dataToSend)
		} else {
			res.send(403).json({ message: `Someting wrong!!` })
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
	verifyUser,
	getOneUser,
}
