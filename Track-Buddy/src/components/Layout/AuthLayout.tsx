import React from 'react'
import {LuTrendingUpDown} from 'react-icons/lu'
import type { iIncomeExpenseHeader } from '../types'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex'>
        <div className='md:w-[60vw] w-screen h-screen px-12 pt-8 pb-12'>
            <h2 className='text-3xl font-medium text-black'>Expense Tracker</h2>
            {children}
        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-red-100 relative overflow-hidden'>
            <div className='w-40 h-40 rounded-[24px] bg-red-400 absolute -top-7 -left-8 z-[1]'/>
            <div className='w-36 h-36 rounded-[24px] bg-red-800 absolute -top-12 left-4 z-[2]'/>
            <div className='w-10 h-3/4 rounded-[12px] bg-red-500 absolute top-22 left-8 z-[0]'/>
            <div className='w-40 h-40 rounded-[24px] bg-red-400 absolute -bottom-7 -left-8 z-[1]'/>
            <div className='w-36 h-36 rounded-[24px] bg-red-800 absolute -bottom-12 left-4 z-[2]'/>

            <div className="grid grid-cols-1 z-20 p-8">
                <ShowIncomeExpenseHeader label='Track your earning and expenditure' Icon={LuTrendingUpDown} value={69000} color='bg-red-600'/>
            </div>
            
            {/* image will come here (need to make one on figma) */}
        </div>
    </div>
  )
}

const ShowIncomeExpenseHeader = ({Icon,color,label,value}:iIncomeExpenseHeader)=>{
    return <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-red-400/25 border border-gray-200/50 z-[10]'>
        <div className={`w-12 h-12 flex justify-center items-center ${color} text-white rounded-full drop-shadow`}>
            <Icon/>
        </div>
        <div>
            <h6 className='text-xs text-gray-400 mb-1'>{label}</h6>
            <span className='text-[20px]'>{value}</span>
        </div>
    </div>
}

export default AuthLayout
