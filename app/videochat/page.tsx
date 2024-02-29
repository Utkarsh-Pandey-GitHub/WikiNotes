"use client"
import { useSocket, SocketContext } from '../../provider/Socket'
import { emit } from 'process'
import React, { useContext, useEffect, useState } from 'react'
import vidCall from '../../public/vidCall.png'
import Image from 'next/image'
import { set } from 'mongoose'

const dark = true
interface Props {
    params: { sender: string, reciever: string }
}

const page: React.FC<Props> = ({
    params: { sender, reciever }
}: {
    params: { sender: string, reciever: string }
}) => {
    const [room, setRoom] = useState<any>()
    const socket: any = useContext(SocketContext)
    const handleNewUserJoined = (userid: any, email: any, user_name: any) => {
        alert(`${user_name},joined room`)
    }
    function generateUniqueId() {

        const timestamp = new Date().getTime();


        const randomString = Math.random().toString(36).substring(2, 8);


        const uniqueId = `${timestamp}-${randomString}`;
        setRoom(uniqueId)


    }
    useEffect(() => {
        socket.on('user joined', handleNewUserJoined)
    }, [])


    const joinRoom = () => {

        // socket?.emit('vid', 'here is vid')
        setRoom((document.getElementById('room') as HTMLInputElement).value)
        setTimeout(() => {  

            window.location.href = `/videochat/${room}`
        }, 10)
    }

    return (
        <div className={`flex justify-center items-center ${dark ? "bg-black text-white" : " bg-white text-black"} h-screen`}>

            <div>
                <Image src={vidCall} alt='' width={500} height={500} />
            </div>
            <div className='flex items-center flex-col'>
                <form action="" className={`flex flex-col border border-slate-900 w-full `}>
                    <label htmlFor="email">Enter your email</label>
                    <input type='email' name='email' id='email' className='border border-slate-700 my-2 text-inherit rounded-2xl p-1 text-black' required/>
                    <label htmlFor="room">Enter a roomname to join</label>
                    <input type='text' name='room' id='room' className='border border-slate-700 my-2  rounded-2xl p-1 text-black' required />
                    <button onClick={joinRoom} className=' bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                        Join Room
                    </button>
                </form>
                or <br />
                <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={generateUniqueId}
                >Create Room</button>
                {room && <p>Room ID: {room}</p>}
            </div>

        </div>
    )
}

export default page
