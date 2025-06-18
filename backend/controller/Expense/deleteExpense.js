const  Expense = require("../../model/expense");

const deleteExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedExpense = await Expense.findOneAndDelete({
      userId: userId,
      _id: req.params.id,
    });

    if (!deletedExpense) {
      return res.status(404).json({
        status: 404,
        message: "Expense not found or already deleted",
      });
    }
    return res.status(200).json({
      status: 200,
      userId,
      message: "User expense deleted successfully",
      deletedExpense,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Faild to delete expense of user",
      error: err.message,
      originalError: err,
    });
  }
};

module.exports = deleteExpense;
