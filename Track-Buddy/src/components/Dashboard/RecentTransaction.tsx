import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import type { iRecentTransaction } from '../../pages/types'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransaction = ({transactions,onSeeMore}:{transactions:iRecentTransaction | undefined ,onSeeMore:()=>void}) => {


  return (
    <div className='card'>
        <div className="flex items-center justify-between">
            <h5 className='text-lg'>
                Recent Transaction
            </h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>
            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((item)=>(
                    <TransactionInfoCard 
                    key={item?._id}
                    title={item.type === 'expense' ? item.category : item.source}
                    Icon={item.icon}
                    date={moment(item.date).format('MMMM DD, YYYY')}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteBtn
                    />
                ))} 
            </div>
    </div>
  )
}

export default RecentTransaction