const Expense = require('../../model/expense')


const getExpense = async(req,res)=>{
    try{
        const userId = req.user.id;
        const ExpenseOfUser = await Expense.find({userId}).sort({date:-1});
        console.log('Expense of User : ',ExpenseOfUser);
        return res.status(200).json({
            status:200,
            userId,
            message:'User Expense fetched successfully',
            Expense:ExpenseOfUser
        })
    }catch(err)
    {     
        return res.status(500).json({
            status:500,
            message:'Faild to fetch Expense of user',
            error:err.message,
            originalError:err
        })
    }
}


module.exports = getExpense;