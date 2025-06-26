import React, { useRef, useState } from 'react'
import type { iProfileAvatar } from '../types';
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

const ProfileAvatar :React.FC<iProfileAvatar> = ({image,setImage}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl,setPreviewUrl] = useState<string | null>(null);

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

    const handleRemoveImage = ()=>{
        setImage(null);
        setPreviewUrl(null)
        if (inputRef.current) {
        inputRef.current.value = ""; 
  }
    }

    const onChooseFile = ()=>{
        inputRef.current?.click();
    }
  return (
    <div className='flex justify-center mb-10'>
        <input 
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
        />
        {
            !image ? (
                <div className="w-20 h-20 flex items-center justify-center bg-red-100 rounded-full relative">
                    <LuUser className='text-4xl text-red-500'/>
                    <button type='button'
                    className='w-9 h-9 bg-red-600 flex justify-center items-center text-white rounded-full absolute -right-2 -bottom-2 cursor-pointer'
                    onClick={onChooseFile}>
                        <LuUpload size={22}/>
                    </button>
                </div>
            ):
            (
                <div className="relative" >
                    <img src={previewUrl as string} alt="User Profile" className='w-20 h-20 rounded-full object-cover border border-red-300' />
                    <button type='button' className='w-9 h-9 bg-red-600 flex justify-center items-center text-white rounded-full absolute -right-2 -bottom-2 cursor-pointer' onClick={handleRemoveImage}><LuTrash /></button>
                </div>
            )
        }
    </div>
  )
}

export default ProfileAvatar