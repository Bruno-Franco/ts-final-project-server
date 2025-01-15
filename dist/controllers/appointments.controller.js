"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// GET ALL APOINTMENTS
function getAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield prisma.apointments.findMany({
                include: { user: true },
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// GET HIS APOINTMENTS
function getHisAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        console.log(userId);
        try {
            let data = yield prisma.apointments.findMany({
                where: { userId },
                include: {
                    user: true,
                    bike: true,
                },
            });
            console.log('>>>>>>>>>>>>>>>>', data);
            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// GET ONE APOINTMENT
function getOneAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { appointmentId } = req.params;
        console.log(appointmentId);
        try {
            let data = yield prisma.apointments.findUnique({
                where: { id: appointmentId },
                include: { user: true },
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// CREATE AN APOINTMENT
function createAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const { userId } = req.params;
            let preferredDate = new Date(req.body.preferredDate);
            let { bikeId } = req.body;
            let createdAppointment = yield prisma.apointments.create({
                data: { preferredDate, bikeId, userId },
            });
            res.status(201).json(createdAppointment);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// DELETE A BIKE
function deleteAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { appointmentId } = req.params;
            let data = yield prisma.apointments.delete({
                where: { id: appointmentId },
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// UPDATE AN APOINTMENT
function updateAppointments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //  retrieving data from body
        const { bikeId } = req.body;
        const preferredDate = new Date(req.body.preferredDate);
        const dateUpdated = {
            bikeId,
            preferredDate,
        };
        try {
            let { appointmentId } = req.params;
            let data = yield prisma.apointments.update({
                where: { id: appointmentId },
                data: dateUpdated,
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
module.exports = {
    getAppointments,
    createAppointments,
    deleteAppointments,
    updateAppointments,
    getHisAppointments,
    getOneAppointments,
};
