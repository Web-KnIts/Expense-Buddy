import React, { useState } from 'react'
import Input from '../Input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import type { $ZodEmojiParams } from 'zod/v4/core';

type Expense = {
  category: string;
  amount: string;
  date: string;
  icon: string;
};

type AddExpenseFormProps = {
  onAddExpense: (income: Expense) => void;
};

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAddExpense }) => {
   const [expense,setExpense] = useState({
    category:"",
    amount:"",
    date:"",
    icon:""
   });

   const handleChange = (key:string,value:string)=>{
    setExpense({...expense,[key]:value})
   }

    return (
    <div>
        <EmojiPickerPopup icon={expense.icon} onSelect={(selectedIcon : string)=>handleChange('icon',selectedIcon)}/>
        <Input value={expense.category}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("category", e.target.value)}
        label="Expense Source"
        placeholder={"Food, Electronics, Games, etc"}
        type="text" />
        <Input value={expense.amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("amount", e.target.value)}
        label="Amount ₹"
        placeholder={""}
        type="number" />
        <Input value={expense.date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("date", e.target.value)}
        label="Date"
        placeholder={""}
        type="Date" />
        <div className='flex justify-end mt-6'>
            <button type='button' className='add-btn add-btn-fill' onClick={()=>onAddExpense(expense)}>Add Expense</button>
        </div>
    </div>
  );
};

export default AddExpenseForm;