import { LuDownload } from 'react-icons/lu';
import type { iExpense, iIncome } from '../../pages/types'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

interface iExpenseListProps{
    transactions:iExpense[];
    onDelete:(id:string)=>void;
    onDownload:()=>void;
}

const ExpenseList = ({transactions,onDelete,onDownload}:iExpenseListProps) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Expense Category</h5>
            <button className='card-btn' onClick={onDownload}><LuDownload className='text-base'/> Download</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {
                transactions?.map((expense)=>(
                    <TransactionInfoCard id={expense._id} key={expense._id} title={expense.category} Icon={expense.icon} date={moment(expense.date).format('MMMM DD, YYYY')} amount={expense.amount} type='income' hideDeleteBtn={false} onDelete={onDelete}/>
                ))
            }
        </div>
    </div>
  )
}

export default ExpenseList