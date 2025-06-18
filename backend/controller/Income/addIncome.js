const Income = require("../../model/income");

const validateData = (validationData) => {
  let validation = true;
  validationData.forEach((val) => {
      if (!val) {
          validation = false;
        }
  });
  return validation;
};

const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;
    if (!validateData([source, amount])) {
      return res.status(400).json({
        message: "All fields are Required",
        status: 400,
      });
    }

    const createNewIncome = new Income({
      userId,
      icon,
      source,
      amount,
    });
    await createNewIncome.save();
    return res.status(201).json({
      status: 200,
      message:'Income created successfully',
      id: createNewIncome._id,
      userId,
      income: createNewIncome,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Error while creating User income",
      error: err.message,
      originalError: err,
    });
  }
};

module.exports = addIncome;
