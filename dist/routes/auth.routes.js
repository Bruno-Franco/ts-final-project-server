"use strict";
const express_1 = require("express");
const { createUser, verifyUser } = require('../controllers/users.controller');
const authRoute = (0, express_1.Router)();
// Sign Up Create User
authRoute.post('/signup', createUser);
// Login User
authRoute.post('/login', verifyUser);
module.exports = authRoute;
