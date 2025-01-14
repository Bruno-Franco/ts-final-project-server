import router, { Router } from 'express'

const { createUser, verifyUser } = require('../controllers/users.controller')
const authRoute = Router()

// Sign Up Create User
authRoute.post('/signup', createUser)

// Login User
authRoute.post('/login', verifyUser)

export = authRoute
