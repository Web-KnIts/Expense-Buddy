import { LuDownload } from 'react-icons/lu';
import type { iIncome } from '../../pages/types'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

interface iIncomeListProps{
    transactions:iIncome[];
    onDelete:(id:string)=>void;
    onDownload:()=>void;
}

const IncomeList = ({transactions,onDelete,onDownload}:iIncomeListProps) => {
  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Income Sources</h5>
            <button className='card-btn' onClick={onDownload}><LuDownload className='text-base'/> Download</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            {
                transactions?.map((income)=>(
                    <TransactionInfoCard id={income._id} key={income._id} title={income.source} Icon={income.icon} date={moment(income.date).format('MMMM DD, YYYY')} amount={income.amount} type='income' hideDeleteBtn={false} onDelete={onDelete}/>
                ))
            }
        </div>
    </div>
  )
}

export default IncomeList