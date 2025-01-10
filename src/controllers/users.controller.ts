import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestCreateUser } from '../types/requests'
const prisma = new PrismaClient()

// GET ALL USERS
async function getUsers(req: Request, res: Response) {
	try {
		let data = await prisma.user.findMany()
		res.status(201).json(data)
	} catch (error) {
		console.log(error)
	}
}

// CREATE A USER
async function createUser(req: RequestCreateUser, res: Response) {
	console.log(req.body)

	try {
		let { firstName, email, password } = req.body
		let data = await prisma.user.create({
			data: { firstName, email, password },
		})
		res.status(201).json(data)
	} catch (error) {}
}

// DELETE A USER
async function deleteUser(req: Request, res: Response) {
	try {
		let { userId } = req.params
		let data = await prisma.user.delete({
			where: { id: userId },
		})
		res.status(200).json(data)
	} catch (error) {}
}
// UPDATE A USER
async function updateUser(req: Request, res: Response) {
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
	} catch (error) {}
}

module.exports = { getUsers, createUser, deleteUser, updateUser }
