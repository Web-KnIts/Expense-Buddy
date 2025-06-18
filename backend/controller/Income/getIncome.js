const Income = require('../../model/income')


const getIncome = async(req,res)=>{
    try{
        const userId = req.user.id;
        const incomeOfUser = await Income.find({userId}).sort({date:-1});
        console.log('Income of User : ',incomeOfUser);
        return res.status(200).json({
            status:200,
            userId,
            message:'User income fetched successfully',
            income:incomeOfUser
        })
    }catch(err)
    {     
        return res.status(500).json({
            status:500,
            message:'Faild to fetch income of user',
            error:err.message,
            originalError:err
        })
    }
}


module.exports = getIncome;