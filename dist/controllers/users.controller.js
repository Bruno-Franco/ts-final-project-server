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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// const jwt = require('jsonwebtoken')
// const { JwtPayload } = require('jsonwebtoken')
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
// GET ALL USERS
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield prisma.user.findMany();
            res.status(201).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// GET one USERS
function getOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            let data = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
                    bikes: true,
                    Apointments: true,
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
// CREATE A USER
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //////////////////////////////////////////
            // CREATE A EMPLOYEE ACCOUNT BY HIS DOMAIN
            const isDomain = '@hd.com';
            const domainSignUp = req.body.email.slice(req.body.email.indexOf('@'), req.body.email.length);
            let { firstName, email, password, isEmployee } = req.body;
            // let response = await prisma.user.findUnique({
            // 	where: { email: req.body.email },
            // })
            // console.log('>>>>>>>>>>>>>>>', response.email, req.body.email)
            // if (response.email === req.body.email) {
            // 	return res.status(409).json({ message: `Error` })
            // }
            if (isDomain === domainSignUp) {
                let createdUser = yield prisma.user.create({
                    data: { firstName, email, password, isEmployee: true },
                });
                console.log('>>>>>>>>>>', createUser);
                return res.status(201).json(createdUser);
            }
            // let createdUser = await prisma.user.create({
            // 	data: { firstName, email, password, isEmployee },
            // })
            // return res.status(201).json(createdUser)
            // return res.status(409).json({ message: `Error` })
            ////////////////////////////
            ////////////////////////////
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// DELETE A USER
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { userId } = req.params;
            let data = yield prisma.user.delete({
                where: { id: userId },
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// UPDATE A USER
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //  retrieving data from body
        const { firstName, email, isAdmin, lastName, phone, isEmployee, avatar, address, bike, } = req.body;
        // reassigning data
        const updatedUser = {
            firstName,
            email,
            isAdmin,
            lastName,
            phone,
            isEmployee,
            avatar,
            address,
            bike,
        };
        try {
            let { userId } = req.params;
            let data = yield prisma.user.update({
                where: { id: userId },
                data: updatedUser,
            });
            res.status(200).json(data);
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
// get une user by email to login
function logInUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield prisma.user.findUnique({
                where: { email: req.body.email },
                include: {
                    bikes: true,
                    Apointments: true,
                },
            });
            if (req.body.password === data.password &&
                req.body.email === data.email) {
                const { id, email, firstName, isEmployee } = data;
                const payload = { id, email, firstName, isEmployee };
                const authTOKEN = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
                    algorithm: 'HS256',
                    expiresIn: '72h',
                });
                let dataToSend = Object.assign(Object.assign({}, data), { password: 'NothingToShow' });
                res.status(200).json({ data: dataToSend, token: authTOKEN });
            }
            else {
                res.send(403).json({ message: `Someting wrong!!` });
            }
        }
        catch (err) {
            console.log(err);
            next(err);
        }
    });
}
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json(req.token);
    });
}
module.exports = {
    getUsers,
    createUser,
    deleteUser,
    updateUser,
    logInUser,
    getOneUser,
    verifyUser,
};
