const Expense = require('../../model/expense')
const xlsx = require('xlsx')

const downloadExpenseExcel = async(req,res)=>{
    const userId = req.user.id;
    try{
        const Expense = await Expense.find({userId}).sort({date:-1});
        
        if(!Expense || Expense.length <= 10)
        {
            return res.status(200).json({
                status:200,
                message:'Expense Statement are too less to export'
            })
        }
        const prepareExcelData = Expense.map((item)=>({
            Category:item.category,
            Amount:item.amount,
            Date:item.date
        }));
        console.log('excel data = ',prepareExcelData)
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(prepareExcelData);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="Expense_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        console.log(buffer)
        return res.status(200).send(buffer);

    }catch(err)
    {
      return res.status(500).json({
            status:500,
            message:"Faild to download excel sheet of user's expense",
            error:err.message,
            originalError:err
        })  
    }
}


module.exports = downloadExpenseExcel;