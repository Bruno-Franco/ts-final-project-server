"use strict";
const express_1 = require("express");
const { getAppointments, createAppointments, deleteAppointments, updateAppointments, getHisAppointments, getOneAppointments, } = require('../controllers/appointments.controller');
const appointmentsRoutes = (0, express_1.Router)();
// GET all apointments
appointmentsRoutes.get('/', getAppointments);
// GET ONE apointment
// appointmentsRoutes.get('/:appointmentId', getOneAppointments)
// GET HIS apointments
appointmentsRoutes.get('/:userId', getHisAppointments);
// CREATE an apointment
appointmentsRoutes.post('/:userId', createAppointments);
// DELETE an apointment
appointmentsRoutes.delete('/:appointmentId', deleteAppointments);
// UPDATE an apointment
appointmentsRoutes.put('/:appointmentId', updateAppointments);
module.exports = appointmentsRoutes;
