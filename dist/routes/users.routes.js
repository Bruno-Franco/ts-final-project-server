"use strict";
const express_1 = require("express");
const { getUsers, deleteUser, updateUser, getOneUser, verifyUser, } = require('../controllers/users.controller');
const userRoute = (0, express_1.Router)();
// GET all users
userRoute.get('/', getUsers);
// GET all users
userRoute.get('/verify', verifyUser);
// GET one users
userRoute.get('/users/:userId', getOneUser);
// DELETE a user
userRoute.delete('/:userId', deleteUser);
// UPDATE a user
userRoute.put('/update-user/:userId', updateUser);
module.exports = userRoute;
