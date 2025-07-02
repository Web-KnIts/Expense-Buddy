const Expense = require("../../model/expense");

const validateData = (validationData) => {
  let validation = true;
  validationData.forEach((val) => {
      if (!val) {
          validation = false;
        }
  });
  return validation;
};

const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount,date } = req.body;
    if (!validateData([category, amount])) {
      return res.status(400).json({
        message: "All fields are Required",
        status: 400,
      });
    }
    let createNewExpense;
    if(date)
    {
      createNewExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date
    });
    }
    else
    {
      createNewExpense = new Expense({
        userId,
        icon,
        category,
        amount,
      });
    }
    await createNewExpense.save();
    return res.status(201).json({
      status: 200,
      message:'Expense created successfully',
      id: createNewExpense._id,
      userId,
      expense: createNewExpense,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Error while creating User Expense",
      error: err.message,
      originalError: err,
    });
  }
};

module.exports = addExpense;
