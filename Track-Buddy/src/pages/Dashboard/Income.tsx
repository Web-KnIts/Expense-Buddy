import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/Layout/Dashboard'
import { IncomeOverview } from '../../components/Income/IncomeOverview';
import type { iIncome } from '../types';
import axiosInstance from '../../services/axiosInstance';
import { API_PATH } from '../../services/apiPath';
import useUserInformation from '../../hook/useUserInformation';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
type Income = {
  source: string;
  amount: string;
  date: string;
  icon: string;
};

const Income = () => {
  useUserInformation();
  const [incomeData,setIncomeData] = useState<iIncome[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState({
    show:false,
    data:""
  })
  const [openAddIncomeModal,setOpenAddIncomeModal] = useState<boolean>(false);

  const fetchIncomeDetails = async()=>{
    if(loading) return;
    setLoading(true);

    try{
      const response : {data:{income:iIncome[]}} = await axiosInstance.get(`${API_PATH.INCOME.GET_INCOME}`);
      if(response.data)
      {
        console.log('Income')
        setIncomeData(response.data.income)
      }
    }
    catch(err)
    {
      console.log('-------------------------------------------')
      console.log('Something went wrong. Please try again')
      console.log(err)
      console.log('-------------------------------------------')
    }
    finally{
      setLoading(false)
    }
  };
  
  useEffect(() => {
  const fetchData = async () => {
    await fetchIncomeDetails();
  };
  fetchData();
  return () => {};
}, []);

  
  const handleAddIncome = async(data : Income)=>{
    const {amount,date,icon,source} = data;
    if(!source.trim())
    {
      toast.error("Source is required.");
      return ;
    }

    if(!amount || isNaN(Number(amount)) || Number(amount) <= 0)
    {
       toast.error("Amount should be a valid Number.");
       return;
    }

    if(!icon)
    {
      toast.error('Icon is required.');
      return;
    }

    try{
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME,{
        source,date,icon,amount
      })
      setOpenAddIncomeModal(false);
      toast.success('Income added successfully')
      await fetchIncomeDetails();
      }
    catch(err : any)
    {
      console.log("Error at income ADD               ",err);
      console.log(err?.response?.data?.message || err.message)
    }
    
  };
  const deleteIncome = async(id:string)=>{
    try{
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({show:false,data:""})
      toast.success("Income details deleted successfully");
      await fetchIncomeDetails();
    }catch(err : any){
      console.log('Error at deletion income',err);
      console.log(err.message)
    }
  };
  const handleDownloadExcel = async()=>{
    try {
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_EXCEL,{
        responseType:"blob"
      })
      const url = window.URL.createObjectURL(new Blob([response?.data as BlobPart]))
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download",'income_details.xlsx')
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Download error excel sheet ",error)
    }
  }
  return (
    <DashboardLayout activeMenu='Income'>
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview transactions={incomeData} onAddIncome={()=> setOpenAddIncomeModal(true)}/>
          </div>
          <IncomeList transactions={incomeData} onDelete={(id:string)=>{
            setOpenDeleteAlert({show:true,data:id})}}
            onDownload={handleDownloadExcel}
            />
        </div>
        <Modal 
        isOpen={openAddIncomeModal}
        onClose={()=>setOpenAddIncomeModal(false)}
        title="Add Income">
         <AddIncomeForm onAddIncome={handleAddIncome}/>
        </Modal>
        <Modal 
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false,data:""})}
        title="Delete Income">
            <DeleteAlert content="Are you sure you want to delete this income ?" onDelete={()=>deleteIncome(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income