import React from 'react'
import { getInitals } from '../../services/helper'

type iCharProps = {
    fullname:string,
    width:string,
    height:string,
    style:string
}

const CharAvatar = ({fullname,width,height,style}:iCharProps) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-ray-100`}>
        {getInitals(fullname || "")}
    </div>
  )
}

export default CharAvatar