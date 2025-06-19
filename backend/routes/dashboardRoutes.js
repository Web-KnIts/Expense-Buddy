const express = require('express');
const { getDashboardData } = require('../controller/Dashboard/dashboardData');
const protect = require('../middleware/authMiddleware');
const dashboardRouter = express.Router();

dashboardRouter.get('/details',protect,getDashboardData)

module.exports = dashboardRouter;