import Image from 'next/image';
import React from 'react'

interface CardProps {
    user?: string; // Optional prop
    dark?:boolean;
}

const UserCard:React.FC<CardProps>=({user,dark})=>{
    
  return (
    <div className={`${dark&&"text-white bg-slate-600"} border border-black  text-center col-span-1  bg-opacity-20 rounded-2xl`}>
      <div className='flex justify-center'>
        <Image src={user?.imageUrl} alt='image' height={100} width={100} className='rounded-full '/>
      </div>
      <div className='border border-black font-bold'>
        {user?.name}
      </div>
      <div className='border border-black italic'>
        {user?.email}
      </div>
    </div>
  )
}

export default UserCard
