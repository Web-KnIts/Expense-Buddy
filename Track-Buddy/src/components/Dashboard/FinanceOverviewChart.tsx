import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';


interface iFinanceOverviewProps {
    totalBalance:number;
    totalIncome:number;
    totalExpense:number;
}

const COLORS = ["#875CF5","#FA2C37","#FF6900"];


const FinanceOverviewChart = ({totalBalance,totalExpense,totalIncome}:iFinanceOverviewProps)=> {
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Expense",amount:totalExpense},
        {name:"Total Income",amount:totalIncome},
    ]
    return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Financial Overview</h5>
        </div>
        <CustomPieChart 
        ToolTipType='1'
        data={balanceData}
        label={"Total Balance"}
        colors={COLORS}
        totalAmount={`₹ ${totalBalance}`}
        showTextAnchor />
    </div>
  )
}

export default FinanceOverviewChart