const Income = require("../../model/income");

const deleteIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const deletedIncome = await Income.findOneAndDelete({
      userId: userId,
      _id: req.params.id,
    });

    if (!deletedIncome) {
      return res.status(404).json({
        status: 404,
        message: "Income not found or already deleted",
      });
    }
    return res.status(200).json({
      status: 200,
      userId,
      message: "User income deleted successfully",
      deletedIncome,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Faild to delete income of user",
      error: err.message,
      originalError: err,
    });
  }
};

module.exports = deleteIncome;
