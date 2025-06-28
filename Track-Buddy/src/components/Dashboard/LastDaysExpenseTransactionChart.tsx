import { useEffect, useState } from 'react'
import type { Expense } from '../../pages/types'
import { prepareBarChartData } from '../../services/helper';
import CustomBarChart from '../Charts/CustomBarChart';


const LastDaysExpenseTransactionChart = ({data}:{data:Expense[]}) => {

    const [ChartData,setChartData] = useState<any>([]);
    useEffect(()=>{
        const result = prepareBarChartData<Expense>(data);
        setChartData(result);
        return ()=>{}
    },[data])
  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expense</h5>
        </div>
        <CustomBarChart data={ChartData}/>
    </div>
  )
}

export default LastDaysExpenseTransactionChart