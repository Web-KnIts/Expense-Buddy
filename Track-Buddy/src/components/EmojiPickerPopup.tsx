import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu'

const EmojiPickerPopup = ({icon,onSelect}:{icon:string,onSelect:(emoji:string)=>void}) => {
    const [open,setOpen] = useState<boolean>(false)
  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div className='flex items-center gap-4 cursor-pointer' onClick={()=>setOpen(true)}>
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-red-200/40 text-red-400 rounded-lg">
                {
                    icon ? (
                        <img src={icon} alt={"Icon"} className="w-12 h-12" />
                    ):(
                        <LuImage />
                    )
                }
            </div>
            <p className=''>{icon?"Change Icon":"Pick Icon"}</p>
        </div>
        {
            open && (
                <div className="relative">
                    <button className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer' onClick={()=>setOpen(false)}><LuX /></button>
                    <EmojiPicker open={open} onEmojiClick={(emojiData) => { onSelect(emojiData?.imageUrl || "")}} />
                </div>
            )
        }
    </div>
  )
}

export default EmojiPickerPopup