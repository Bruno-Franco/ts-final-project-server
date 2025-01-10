import router, { Router } from 'express'
const {
	getBikes,
	createBike,
	deleteBike,
	updateBike,
	getOneBike,
} = require('../controllers/bikes.controller')

const bikesRoutes = Router()

// GET all bikes
bikesRoutes.get('/', getBikes)
// GET ONE bike
bikesRoutes.get('/bike/:userId', getOneBike)
// GET HIS bikes
bikesRoutes.get('/:userId', getBikes)
// CREATE a bike
bikesRoutes.post('/:userId', createBike)
// DELETE a bike
bikesRoutes.delete('/:bikeId', deleteBike)
// UPDATE a bike
bikesRoutes.put('/:bikeId', updateBike)

export = bikesRoutes
