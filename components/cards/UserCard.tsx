import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface CardProps {
  user?: {
    name: string;
    email: string;
    imageUrl: string; // Add the imageUrl property
  };
  dark?: boolean;
}

const UserCard: React.FC<CardProps> = ({ user, dark }) => {

  return (
    <div className={`${dark && "text-white bg-slate-600 my-4"}   text-center col-span-1  bg-opacity-0 rounded-2xl`}>
      <div className='flex justify-center '>
        <Image src={user?.imageUrl as string} alt='image' height={100} width={100} className='rounded-full border border-black' />
      </div>
      <div className=' font-bold '>
        {user?.name}
      </div>
      {/* <div className='border border-black italic'>
        {user?.email}
      </div> */}
      <Link href={"/chat"}><button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-3xl">
        Chat
      </button></Link>

    </div>
  )
}

export default UserCard
