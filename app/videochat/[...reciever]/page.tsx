"use client"
import { useSocket, SocketContext } from '@/app/provider/Socket'
import { emit } from 'process'
import React, { useContext } from 'react'


interface Props {
    params: { reciever: string }
}

const page: React.FC<Props> = ({
    params
}: {
    params: { reciever: string }
}) => {
    const socket:any = useContext(SocketContext)
    const emitmsg = () => {
    
        socket?.emit('vid', 'here is vid')
    }

    return (
        <div>
            {params.reciever}
            <form action="" className='flex flex-col border border-slate-900'>
                <label htmlFor="email"></label>
                <input type='email' name='email' id='email' className='border border-slate-700 my-2'/>
                <label htmlFor="room"></label>
                <input type='text' name='room' id='room' className='border border-slate-700 my-2'/>
                <button onClick={emitmsg} className='bg-slate-500 bg-opacity-'>
                    send
                </button>
            </form>
        </div>
    )
}

export default page
