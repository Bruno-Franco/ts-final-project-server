import router, { Router } from 'express'
const {
	getAppointments,
	createAppointments,
	deleteAppointments,
	updateAppointments,
	getHisAppointments,
	getOneAppointments,
} = require('../controllers/appointments.controller')

const appointmentsRoutes = Router()

// GET all apointments
appointmentsRoutes.get('/', getAppointments)
// GET ONE apointment
// appointmentsRoutes.get('/:appointmentId', getOneAppointments)
// GET HIS apointments
appointmentsRoutes.get('/:userId', getHisAppointments)
// CREATE an apointment
appointmentsRoutes.post('/:userId', createAppointments)
// DELETE an apointment
appointmentsRoutes.delete('/:appointmentId', deleteAppointments)
// UPDATE an apointment
appointmentsRoutes.put('/:appointmentId', updateAppointments)

export = appointmentsRoutes
