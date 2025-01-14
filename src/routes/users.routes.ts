import router, { Router } from 'express'
const {
	getUsers,
	deleteUser,
	updateUser,
} = require('../controllers/users.controller')

const userRoute = Router()

// GET all users
userRoute.get('/', getUsers)
// DELETE a user
userRoute.delete('/:userId', deleteUser)
// UPDATE a user
userRoute.put('/:userId', updateUser)

export = userRoute
