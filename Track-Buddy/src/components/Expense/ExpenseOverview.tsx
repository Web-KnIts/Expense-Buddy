import { LuPlus } from 'react-icons/lu';
import type { iExpense } from '../../pages/types';
import { useEffect, useState } from 'react';
import { prepareLineChartData } from '../../services/helper';
import CustomLineChart from '../Charts/CustomLineChart';
interface iExpenseOverviewProps{
    transactions:iExpense[];
    openAddExpense : ()=>void
}
const ExpenseOverview = ( {openAddExpense,transactions}:iExpenseOverviewProps) => {
    const [chartData,setChartData] = useState<any>();

    useEffect(()=>{
        const result = prepareLineChartData(transactions);
        console.log(result)
        setChartData(result)
        return ()=>{}
    },[transactions])

  return (
   <div className='card'>
        <div className="flex items-center justify-between">
          <div>
            <h5 className='text-lg'>Expense Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>Track your spendings trend over time and analyze your expense</p>
          </div>
          <button className='add-btn' onClick={openAddExpense}>
            <LuPlus className='text-lg' />
            Add Expense
          </button>
        </div>
        <div className="mt-10">
            <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default ExpenseOverview