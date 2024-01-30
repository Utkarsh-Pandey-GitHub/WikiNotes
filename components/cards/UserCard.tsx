import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface CardProps {
  user?: {
    _id?: string; // Add the _id property
    name: string;
    email: string;
    imageUrl: string;
  };
  dark?: boolean;
}

const UserCard: React.FC<CardProps> = ({ user, dark }) => {
  const strUser = JSON.stringify(user)
  return (
    <div className={`${dark && "text-white bg-slate-600 my-4"}   text-center col-span-1  bg-opacity-0 rounded-2xl`}>
      <div className='flex justify-center '>
        <Image src={user?.imageUrl as string} alt='image' height={100} width={100} className='rounded-full border border-black shadow-slate-700 shadow-lg mb-2'  />
      </div>
      <div className=' font-bold '>
        {user?.name}
      </div>
      {/* <div className='border border-black italic'>
        {user?.email}
      </div> */}
      <Link href={`/chat/${user?._id}`}><button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-3xl">
        Chat
      </button></Link>

    </div>
  )
}

export default UserCard
