const Income = require('../../model/income')
const xlsx = require('xlsx')

const downloadIncomeExcel = async(req,res)=>{
    const userId = req.user.id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        
        if(!income || income.length <= 10)
        {
            return res.status(200).json({
                status:200,
                message:'Income Statement are too less to export'
            })
        }
        const prepareExcelData = income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(prepareExcelData);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

        res.setHeader('Content-Disposition', 'attachment; filename="income_details.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        return res.status(200).send(buffer);

    }catch(err)
    {
      return res.status(500).json({
            status:500,
            message:"Faild to download excel sheet of user's income",
            error:err.message,
            originalError:err
        })  
    }
}


module.exports = downloadIncomeExcel;