import React from 'react'
import type { IconType } from 'react-icons/lib'

type iInforCardProps = {
    Icon:IconType,
    label:string,
    color:string
    value:string;
}

const InfoCard = ({Icon,label,color,value}:iInforCardProps) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
        {<Icon />}
      </div>
      <div>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[22px]'>₹ {value}</span>
      </div>
    </div>
  )
}

export default InfoCard