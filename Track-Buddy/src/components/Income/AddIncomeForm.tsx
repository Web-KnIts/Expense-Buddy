import React, { useState } from 'react'
import Input from '../Input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import type { $ZodEmojiParams } from 'zod/v4/core';

type Income = {
  source: string;
  amount: string;
  date: string;
  icon: string;
};

type AddIncomeFormProps = {
  onAddIncome: (income: Income) => void;
};

const AddIncomeForm: React.FC<AddIncomeFormProps> = ({ onAddIncome }) => {
   const [income,setIncome] = useState({
    source:"",
    amount:"",
    date:"",
    icon:""
   });

   const handleChange = (key:string,value:string)=>{
    setIncome({...income,[key]:value})
   }

    return (
    <div>
        <EmojiPickerPopup icon={income.icon} onSelect={(selectedIcon : string)=>handleChange('icon',selectedIcon)}/>
        <Input value={income.source}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("source", e.target.value)}
        label="Income Source"
        placeholder={"Freelance , Salary , etc"}
        type="text" />
        <Input value={income.amount}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("amount", e.target.value)}
        label="Amount ₹"
        placeholder={""}
        type="number" />
        <Input value={income.date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("date", e.target.value)}
        label="Date"
        placeholder={""}
        type="Date" />
        <div className='flex justify-end mt-6'>
            <button type='button' className='add-btn add-btn-fill' onClick={()=>onAddIncome(income)}>Add Income</button>
        </div>
    </div>
  );
};

export default AddIncomeForm;