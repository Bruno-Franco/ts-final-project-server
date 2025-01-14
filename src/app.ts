// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

// USERS ROUTES
import authRoutes from './routes/auth.routes'
app.use('/auth', authRoutes)
import userRoutes from './routes/users.routes'
app.use('/users', userRoutes)
// BIKES ROUTES
import bikesRoutes from './routes/bikes.routes'
app.use('/my-page/bikes', bikesRoutes)
// APOINTMENTS ROUTES
import appointmentsRoutes from './routes/appointments.routes'
app.use('/my-page/appointments', appointmentsRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const {
	errorHandler,
	notFoundHandler,
} = require('./error-handling/error.handling')
app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app
