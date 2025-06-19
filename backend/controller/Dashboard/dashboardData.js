const Income = require('../../model/income')
const Expense = require('../../model/expense')
const {isValidObjectId,Types} = require('mongoose')

exports.getDashboardData = async(req,res)=>{
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount"},totalStatement:{$sum:1},average:{$avg:"$amount"}}}
        ]);

        console.log('total income : ',{totalIncome,userId:isValidObjectId(userId)});


        const totalExpense = await Expense.aggregate([
            {$match:{userId:userObjectId}},
            {$group:{_id:null,total:{$sum:"$amount",totalStatement:{$sum:1},average:{$avg:"$amount"}}}}
        ])
        console.log('total expense : ',{totalExpense,userId:isValidObjectId(userId)});

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date:{$gte:new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date:-1});

        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date:{$gte:new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date:-1});

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction)=>sum + transaction.amount,0
        )  
        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum,transaction)=>sum + transaction.amount,
            0
        )

        const last5Transaction = [
            ...((await Income.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) =>(
                    {
                        type:"income",
                        ...transaction.toObject()
                    }
                )
            )),
            ...((await Expense.find({userId}).sort({date:-1}).limit(5)).map(
                (transaction) =>(
                    {
                        type:"expense",
                        ...transaction.toObject()
                    }
                )
            ))
        ].sort((a,b)=>b.date-a.date);

        return res.status(200).json({
            totalBalance:(totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            incomeDetails:{
                totalIncome:totalIncome[0]?.total || 0,
                avergeIncome:totalIncome[0]?.average || 0,
                totalStatement:totalIncome[0]?.totalStatement || 0,
                last60Days:{
                    transaction:last60DaysIncomeTransactions,
                    total:incomeLast60Days
                }
            },
               expenseDetails:{
                totalExpense:totalExpense[0]?.total || 0,
                avergeIncome:totalExpense[0]?.average || 0,
                totalStatement:totalExpense[0]?.totalStatement || 0,
                last60Days:{
                    transaction:last60DaysExpenseTransactions,
                    total:expenseLast60Days
                }
            },
            recentTransaction:last5Transaction
        })

    }
    catch(err)
    {
    return res.status(500).json({
      status: 500,
      message: "Faild to fetch dashboard data of user",
      error: err.message,
      originalError: err,
    });
    }
}