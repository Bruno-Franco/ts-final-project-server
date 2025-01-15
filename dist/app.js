"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();
// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const app = express();
// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);
// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);
// USERS ROUTES
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
app.use('/auth', auth_routes_1.default);
const users_routes_1 = __importDefault(require("./routes/users.routes"));
app.use('/users', users_routes_1.default);
// BIKES ROUTES
const bikes_routes_1 = __importDefault(require("./routes/bikes.routes"));
app.use('/my-page/bikes', bikes_routes_1.default);
// APOINTMENTS ROUTES
const appointments_routes_1 = __importDefault(require("./routes/appointments.routes"));
app.use('/my-page/appointments', appointments_routes_1.default);
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
const { errorHandler, notFoundHandler, } = require('./error-handling/error.handling');
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;
