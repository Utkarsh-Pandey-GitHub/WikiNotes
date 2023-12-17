import React from 'react'
interface CardProps {
    id?: any; // Optional prop
    dark?:boolean;
}
const UpdateDialog:React.FC<CardProps>=({id,dark})=>{
  return (
    <div className='h-44 w-1/2 bg-blue-600'>
      
    </div>
  )
}

export default UpdateDialog
