const express = require('express');
const protect = require('../middleware/authMiddleware');
const addExpense = require('../controller/Expense/addExpense');
const getExpense = require('../controller/Expense/getExpense');
const downloadExpenseExcel = require('../controller/Expense/downloadExpenseExcel');
const deleteExpense = require('../controller/Expense/deleteExpense');

const expenseRouter = express.Router();


expenseRouter.post('/add',protect,addExpense);
expenseRouter.get('/get',protect,getExpense);
expenseRouter.get('/download-excel',protect,downloadExpenseExcel);
expenseRouter.delete('/:id',protect,deleteExpense);


module.exports = expenseRouter;