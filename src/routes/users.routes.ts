import router, { Router } from 'express'
const {
	getUsers,
	createUser,
	deleteUser,
	updateUser,
} = require('../controllers/users.controller')

const userRoute = Router()

// GET all users
userRoute.get('/', getUsers)
// CREATE a user
userRoute.post('/', createUser)
// DELETE a user
userRoute.delete('/:userId', deleteUser)
// UPDATE a user
userRoute.put('/:userId', updateUser)

export = userRoute
