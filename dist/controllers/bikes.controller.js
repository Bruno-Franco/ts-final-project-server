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
// GET ALL bikes
function getBikes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield prisma.bike.findMany();
            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// GET HIS bikes
function getHisBikes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            let data = yield prisma.bike.findMany({
                where: { userId },
                include: {
                    user: true,
                    apointments: true,
                },
            });
            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// GET ONE bike
function getOneBike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { plate } = req.body;
        console.log(plate);
        try {
            let data = yield prisma.bike.findUnique({
                where: { plate },
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
// CREATE A BIKE
function createBike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const userId = req.params.userId;
            let { plate, vin, model, family } = req.body;
            let createdBike = yield prisma.bike.create({
                data: { plate, vin, model, family, userId },
            });
            res.status(201).json(createdBike);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// DELETE A BIKE
function deleteBike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { id } = req.body;
            console.log('body id', id);
            if (!id) {
                return res.status(400).json({ error: 'Bike ID is required' });
            }
            if (typeof id !== 'string') {
                return res.status(400).json({ error: 'Invalid Bike ID format' });
            }
            console.log('Deleting bike with ID:', id);
            let data = yield prisma.bike.delete({
                where: { id: id },
            });
            res.status(200).json({ message: 'Bike deleted successfully', data });
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// UPDATE A Bike
function updateBike(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //  retrieving data from body
        const { id, plate, vin, model, family } = req.body;
        // reassigning data
        const updatedBike = {
            plate,
            vin,
            model,
            family,
        };
        try {
            let { userId } = req.params;
            let data = yield prisma.bike.update({
                where: { id: id },
                data: updatedBike,
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
    getBikes,
    createBike,
    deleteBike,
    updateBike,
    getHisBikes,
    getOneBike,
};
