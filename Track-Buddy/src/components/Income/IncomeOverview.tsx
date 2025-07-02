import React, { useEffect, useState } from 'react'
import type { iIncome } from '../../pages/types'
import {LuPlus} from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeData } from '../../services/helper';

interface iIncomeOverviewProps{
    transactions:iIncome[];
    onAddIncome : ()=>void
}

export const IncomeOverview = ({transactions,onAddIncome}:iIncomeOverviewProps) => {
  const [chartData,setChartData] = useState<any>([]);
    
  useEffect(()=>{
    const result = prepareIncomeData(transactions);
    setChartData(result);
    console.log(chartData)
    return ()=>{}
  },[transactions])

  return (
    <div className='card'>
        <div className="flex items-center justify-between">
          <div>
            <h5 className='text-lg'>Income Overview</h5>
            <p className='text-xs text-gray-400 mt-0.5'>Track existing over time and analyze your income</p>
          </div>
          <button className='add-btn' onClick={onAddIncome}>
            <LuPlus className='text-lg' />
            Add Income
          </button>
        </div>
        <div className="mt-10">
          <CustomBarChart data={chartData} />
        </div>
    </div>
  )
}
