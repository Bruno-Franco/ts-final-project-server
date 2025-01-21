"use strict";
const express_1 = require("express");
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
const { createUser, verifyUser, logInUser, } = require('../controllers/users.controller');
const authRoute = (0, express_1.Router)();
// Sign Up Create User
authRoute.post('/signup', createUser);
// Login User
authRoute.post('/login', logInUser);
// Verify User
authRoute.get('/verify', jwt_middleware_1.isAuthenticated, verifyUser);
module.exports = authRoute;
