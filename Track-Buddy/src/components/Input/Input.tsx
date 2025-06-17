import react, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import type { iInput } from '../types'

const Input=({value,onChange,placeholder,label,type}:iInput)=>{
    const [showPassword,setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = ()=>{
        setShowPassword(prev =>!prev);
    }
    
    return (
        <div>
            <label className='text-[13px] text-slate-800'>{label}</label>
            <div className='input-box'>
                <input type={type === 'password'?showPassword?"text":"password":type} 
                placeholder={placeholder}
                value={value}
                className='w-full bg-transparent outline-none'
                onChange={(e)=>onChange(e)}
                />
                {
                    type === 'password' ?( 
                        showPassword ? (<FaEye size={22} className='text-red-600 cursor-pointer' onClick={()=>toggleShowPassword()}/>) : 
                        (<FaEyeSlash size={22} className='text-slate-400 cursor-pointer' onClick={()=>toggleShowPassword()}/>)
                    ):null
                }
            </div>
        </div>
    )
}

export default Input