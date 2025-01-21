import router, { Router } from 'express'
import { isAuthenticated } from '../middleware/jwt.middleware'

const {
	createUser,
	verifyUser,
	logInUser,
} = require('../controllers/users.controller')
const authRoute = Router()

// Sign Up Create User
authRoute.post('/signup', createUser)

// Login User
authRoute.post('/login', logInUser)

// Verify User
authRoute.get('/verify', isAuthenticated, verifyUser)

export = authRoute
