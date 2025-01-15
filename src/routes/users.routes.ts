import router, { Router } from 'express'
const {
	getUsers,
	deleteUser,
	updateUser,
	getOneUser,
} = require('../controllers/users.controller')

const userRoute = Router()

// GET all users
userRoute.get('/', getUsers)
// GET one users
userRoute.get('/users/:userId', getOneUser)
// DELETE a user
userRoute.delete('/:userId', deleteUser)
// UPDATE a user
userRoute.put('/update-user/:userId', updateUser)

export = userRoute
