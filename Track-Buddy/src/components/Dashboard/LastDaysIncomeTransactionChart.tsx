import { useEffect, useState } from "react";
import type { Income } from "../../pages/types"
import CustomPieChart from "../Charts/CustomPieChart";
import { prepareBarChartData } from "../../services/helper";

interface iLastDaysIncomeTransactionChartProps{
    data:Income[];
    totalIncome:number;
}

const COLORS = ["#875CF5","#FA2C37","#FF6900","#4f39f6"];

const LastDaysIncomeTransactionChart = ({data,totalIncome}:iLastDaysIncomeTransactionChartProps) => {
 const [ChartData,setChartData] = useState<any>([]);
  
  useEffect(()=>{
        const result = prepareBarChartData<Income>(data);
        setChartData(result);
        return ()=>{}
    },[data])
  return (
    <div className="card">
        <div className="flex itmes-center justify-between">
          <h5 className="text-lg">Last 60 Days Income</h5>
        </div>
        <CustomPieChart 
        ToolTipType="2"
        data={ChartData}
        label="Total Income"
        totalAmount={`₹ ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
        />
    </div>
  )
}

export default LastDaysIncomeTransactionChart