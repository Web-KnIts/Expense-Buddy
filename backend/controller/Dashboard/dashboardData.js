const Income = require("../../model/income");
const Expense = require("../../model/expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          totalStatement: { $sum: 1 },
          average: { $avg: "$amount" }
        }
      }
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
          totalStatement: { $sum: 1 },
          average: { $avg: "$amount" }
        }
      }
    ]);

    const last60DaysDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: last60DaysDate },
    }).sort({ date: -1 });

    const last60DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: last60DaysDate },
    }).sort({ date: -1 });

    var totalSumOfIncome = Number(0);
    last60DaysIncomeTransactions.forEach(
      (transaction) =>{
         totalSumOfIncome+=Number(transaction.amount);
      },
    );
    var totalSumOfExpense=Number(0);
    last60DaysExpenseTransactions.forEach(
      (transaction) =>{
         totalSumOfExpense+=Number(transaction.amount);
      },
    );

    const last5Transaction = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          type: "income",
          ...transaction.toObject(),
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (transaction) => ({
          type: "expense",
          ...transaction.toObject(),
        })
      ),
    ].sort((a, b) => b.date - a.date);

    return res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      incomeDetails: {
        totalIncome: totalIncome[0]?.total || 0,
        averageIncome: totalIncome[0]?.average || 0,
        totalStatement: totalIncome[0]?.totalStatement || 0,
        last60Days: {
          transaction: last60DaysIncomeTransactions,
          total: totalSumOfIncome,
        },
      },
      expenseDetails: {
        totalExpense: totalExpense[0]?.total || 0,
        averageExpense: totalExpense[0]?.average || 0,
        totalStatement: totalExpense[0]?.totalStatement || 0,
        last60Days: {
          transaction: last60DaysExpenseTransactions,
          total: totalSumOfExpense,
        },
      },
      recentTransaction: last5Transaction,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Failed to fetch dashboard data of user",
      error: err.message,
      originalError: err,
    });
  }
};
