"use strict";
const express_1 = require("express");
const { getBikes, createBike, deleteBike, updateBike, getOneBike, getHisBikes, } = require('../controllers/bikes.controller');
const bikesRoutes = (0, express_1.Router)();
// GET all bikes
bikesRoutes.get('/', getBikes);
// GET ONE bike
bikesRoutes.get('/bikes/:userId', getOneBike);
// GET HIS bikes
bikesRoutes.get('/:userId', getHisBikes);
// CREATE a bike
bikesRoutes.post('/:userId', createBike);
// DELETE a bike
bikesRoutes.delete('/:userId', deleteBike);
// UPDATE a bike
bikesRoutes.put('/:bikeId', updateBike);
module.exports = bikesRoutes;
