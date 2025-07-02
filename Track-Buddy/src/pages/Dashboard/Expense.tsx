import { useEffect, useState } from "react";
import useUserInformation from "../../hook/useUserInformation";
import type { iExpense } from "../types";
import { API_PATH } from "../../services/apiPath";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/Layout/Dashboard";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

type Expense = {
  category: string;
  amount: string;
  date: string;
  icon: string;
};
const Expense = () => {
  useUserInformation();
  const [expenseData, setExpenseData] = useState<iExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: ""
  })
  const [openAddExpenseModal,setOpenAddExpenseModal] = useState<boolean>(false);
   const fetchExpenseDetails = async()=>{
    if(loading) return;
    setLoading(true);

    try{
      const response : {data:{expense:iExpense[]}} = await axiosInstance.get(`${API_PATH.EXPENSE.GET_EXPENSE}`);
      if(response.data)
      {
        console.log('Expense')
        console.log(response)
        setExpenseData(response.data.expense)
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
    await fetchExpenseDetails();
  };
  fetchData();
  return () => {};
}, []);

  const handleAddExpense = async(data : Expense)=>{
    const {amount,date,icon,category} = data;
    if(!category.trim())
    {
      toast.error("Category is required.");
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
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE,{
        category,date,icon,amount
      })
      setOpenAddExpenseModal(false);
      toast.success('Expense added successfully')
      await fetchExpenseDetails();
      }
    catch(err : any)
    {
      console.log("Error at expense ADD               ",err);
      console.log(err?.response?.data?.message || err.message)
    }
    
  };
  const deleteExpense = async(id:string)=>{
    try{
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({show:false,data:""})
      toast.success("Expense details deleted successfully");
      await fetchExpenseDetails();
    }catch(err : any){
      console.log('Error at deletion income',err);
      console.log(err.message)
    }
  };
  const handleDownloadExcel = async()=>{
    try {
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXCEL,{
        responseType:"blob"
      })
      const url = window.URL.createObjectURL(new Blob([response?.data as BlobPart]))
      const link=document.createElement("a");
      link.href=url;
      link.setAttribute("download",'expense_details.xlsx')
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.log("Download error excel sheet ",error)
    }
  }
  return (
 <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview transactions={expenseData} openAddExpense={()=> setOpenAddExpenseModal(true)}/>
          </div>
          <ExpenseList transactions={expenseData} onDelete={(id:string)=>{
            setOpenDeleteAlert({show:true,data:id})}}
            onDownload={handleDownloadExcel}
            />
        </div>
        <Modal 
        isOpen={openAddExpenseModal}
        onClose={()=>setOpenAddExpenseModal(false)}
        title="Add Income">
         <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>
        <Modal 
        isOpen={openDeleteAlert.show}
        onClose={()=>setOpenDeleteAlert({show:false,data:""})}
        title="Delete Expense">
            <DeleteAlert content="Are you sure you want to delete this expense ?" onDelete={()=>deleteExpense(openDeleteAlert.data)} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense