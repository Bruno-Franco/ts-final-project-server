import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUpdateUser } from '../types/user.requests'
// const jwt = require('jsonwebtoken')
// const { JwtPayload } = require('jsonwebtoken')
import jwt, { JwtPayload } from 'jsonwebtoken'
const prisma = new PrismaClient()

export interface CustomRequest extends Request {
	token: string | JwtPayload
}

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
	try {
		//////////////////////////////////////////
		// CREATE A EMPLOYEE ACCOUNT BY HIS DOMAIN
		const isDomain: string = '@hd.com'
		const domainSignUp: string = req.body.email.slice(
			req.body.email.indexOf('@'),
			req.body.email.length
		)
		let { firstName, email, password, isEmployee } = req.body
		// let response = await prisma.user.findUnique({
		// 	where: { email: req.body.email },
		// })
		// console.log('>>>>>>>>>>>>>>>', response.email, req.body.email)

		// if (response.email === req.body.email) {
		// 	return res.status(409).json({ message: `Error` })
		// }
		if (isDomain === domainSignUp) {
			let createdUser = await prisma.user.create({
				data: { firstName, email, password, isEmployee: true },
			})
			console.log('>>>>>>>>>>', createUser)

			return res.status(201).json(createdUser)
		}

		// let createdUser = await prisma.user.create({
		// 	data: { firstName, email, password, isEmployee },
		// })
		// return res.status(201).json(createdUser)

		// return res.status(409).json({ message: `Error` })
		////////////////////////////
		////////////////////////////
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
async function logInUser(
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
			const { id, email, firstName, isEmployee } = data
			const payload = { id, email, firstName, isEmployee }
			const authTOKEN = jwt.sign(payload, process.env.TOKEN_SECRET, {
				algorithm: 'HS256',
				expiresIn: '72h',
			})

			let dataToSend = { ...data, password: 'NothingToShow' }

			res.status(200).json({ data: dataToSend, token: authTOKEN })
		} else {
			res.send(403).json({ message: `Someting wrong!!` })
		}
	} catch (err) {
		console.log(err)
		next(err)
	}
}

async function verifyUser(req: Request, res: Response, next: NextFunction) {
	res.status(200).json((req as CustomRequest).token)
}

module.exports = {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
	logInUser,
	getOneUser,
	verifyUser,
}
