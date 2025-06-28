import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layout/Dashboard'
import useUserInformation from '../../hook/useUserInformation'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { API_PATH } from '../../services/apiPath';
import type { iDashboardResponse } from '../types';
import RecentTransaction from '../../components/Dashboard/RecentTransaction';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import FinanceOverviewChart from '../../components/Dashboard/FinanceOverviewChart';
import ExpenseTransaction from '../../components/Dashboard/Transaction';
import LastDaysExpenseTransactionChart from '../../components/Dashboard/LastDaysExpenseTransactionChart';
import Transaction from '../../components/Dashboard/Transaction';
import LastDaysIncomeTransactionChart from '../../components/Dashboard/LastDaysIncomeTransactionChart';

const Home = () => {
  useUserInformation();
  const navigate = useNavigate();
  const [dashboardData,setDashboardData] = useState<iDashboardResponse | null>(null);
  const [loading,setLoading] = useState<boolean>(false)

  const fetchDashboardData = async()=>{
    if(loading) return;
    setLoading(true);
    try{
      const response : any = await axiosInstance.get(API_PATH.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    }
    catch(err : any)
    {
      console.error(err);
      console.log(err.response);
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchDashboardData();
    return ()=>{}
  },[])

  return (
    <DashboardLayout activeMenu='Dashboard'>
      <div className='my-5 mx-auto'>
        <FinanceOverview totalBalance={dashboardData?.totalBalance || 0} totalExpense={dashboardData?.expenseDetails.totalExpense || 0} totalIncome={dashboardData?.incomeDetails.totalIncome || 0} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <RecentTransaction transactions={dashboardData?.recentTransaction} onSeeMore={()=>navigate('/expense')} />
        <FinanceOverviewChart totalBalance={dashboardData?.totalBalance || 0} totalExpense={dashboardData?.expenseDetails.totalExpense || 0} totalIncome={dashboardData?.incomeDetails.totalIncome || 0}/>
        <Transaction 
          type="expense"
          transactions={dashboardData?.expenseDetails.last60Days.transaction || []}
          onSeeMore={()=>navigate('/expense')}
        />
        <LastDaysExpenseTransactionChart data={dashboardData?.expenseDetails.last60Days?.transaction || []} />
        <Transaction 
          type="income"
          transactions={dashboardData?.incomeDetails.last60Days.transaction || []}
          onSeeMore={()=>navigate('/income')}/>   
          <LastDaysIncomeTransactionChart data={dashboardData?.incomeDetails.last60Days.transaction || []} totalIncome={dashboardData?.incomeDetails.totalIncome || 0}/>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home