import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import type { Expense, Income } from '../../pages/types'
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

interface iTransaction{
    transactions : Expense[] | Income[];
    onSeeMore : ()=> void;
    type:'expense' | 'income';
}

const Transaction = ({transactions,onSeeMore,type}:iTransaction) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg capitalize'>{type}</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
            {transactions?.slice(0,5)?.map((value)=>(
                <TransactionInfoCard key={value._id}
                title={type == 'expense'? (value as Expense).category: (value as Income).source}
                Icon={value.icon}
                date={moment(value.date).format("MMMM DD, YYYY")}
                amount={value.amount}
                type={type}
                hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default Transaction