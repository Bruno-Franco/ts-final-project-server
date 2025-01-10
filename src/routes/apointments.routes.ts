import router, { Router } from 'express'
const {
	getApointments,
	createApointments,
	deleteApointments,
	updateApointments,
	getHisApointments,
	getOneApointments,
} = require('../controllers/apointments.controller')

const apointmentsRoutes = Router()

// GET all apointments
apointmentsRoutes.get('/', getApointments)
// GET ONE apointment
apointmentsRoutes.get('/:apointmentId', getOneApointments)
// GET HIS apointments
apointmentsRoutes.get('/:userId', getHisApointments)
// CREATE an apointment
apointmentsRoutes.post('/:userId', createApointments)
// DELETE an apointment
apointmentsRoutes.delete('/:apointmentId', deleteApointments)
// UPDATE an apointment
apointmentsRoutes.put('/:apointmentId', updateApointments)

export = apointmentsRoutes
