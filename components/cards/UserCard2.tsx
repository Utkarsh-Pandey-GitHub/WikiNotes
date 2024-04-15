import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

import { getCookie, setCookie, deleteCookie } from '../../app/lib/cookiemaker'
interface CardProps {
    user?: {
        _id?: string; // Add the _id property
        name: string;
        email: string;
        imageUrl: string;
        articles?: any[]; // Add the articles property
    };
    dark?: boolean;
}

const UserCard: React.FC<CardProps> = ({ user, dark }) => {
    const strUser = JSON.stringify(user)
    console.log(user);

    return (
        <div className={`${dark && "text-white bg-slate-600 my-4"} text-white   col-span-1  bg-opacity-0 rounded-2xl border border-slate-900 clear-both rounded-l-full grid grid-cols-4 my-2 mx-1`}>
            <div className='flex justify-center flex-col  col-span-1  '>
                <Image src={user?.imageUrl as string} alt='image' height={70} width={70} className='rounded-full border border-slate-300 shadow-slate-700 shadow-lg  border-b-2' />
            </div>
            <div className='col-span-2 flex flex-col justify-start my-auto mx-0'>
                <div className=' font-bold mx-5 '>
                    {user?.name}
                </div>
                <div className='mx-5 text-slate-400 text-sm'>
                    wrote {
                        user?.articles?.length // Add a conditional check and default value of 0
                    } notes
                </div>
            </div>
            {/* <div className='border border-black italic'>
        {user?.email}
      </div> */}
            <div className='col-span-1 flex items-center '>

                <Link href={`/chat/${user?._id}`}><button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded-3xl "
                    onClick={async () => {
                        await setCookie(user?._id as string, user)
                    }}
                >
                    Chat
                </button></Link>
            </div>

        </div>
    )
}

export default UserCard
