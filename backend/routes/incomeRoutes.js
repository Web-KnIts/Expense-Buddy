const express = require('express');
const protect = require('../middleware/authMiddleware');
const addIncome = require('../controller/Income/addIncome');
const getIncome = require('../controller/Income/getIncome');
const deleteIncome = require('../controller/Income/deleteIncome');
const downloadIncomeExcel = require('../controller/Income/downloadIncomeExcel');

const incomeRouter = express.Router();


incomeRouter.post('/add',protect,addIncome);
incomeRouter.get('/get',protect,getIncome);
incomeRouter.get('/download-excel',protect,downloadIncomeExcel);
incomeRouter.delete('/:id',protect,deleteIncome);


module.exports = incomeRouter;