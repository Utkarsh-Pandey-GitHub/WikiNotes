'use client'
import Image from 'next/image'
import noteboy from '../../public/notemaking.gif'


import LeftBar from '@/components/shared/LeftBar'
import RightBar from '@/components/shared/RightBar'


import { useEffect, useState } from 'react'
import { useMyContext } from '@/components/Context'
import BottomBar from '@/components/shared/BottomBar'
import { error } from 'console'
import { stringify } from 'querystring'
export default function Home() {

  const { myValue, setMyValue } = useMyContext()
  const [us, setUs] = useState("hello")  
  const create_user = ()=>{
    fetch('http://localhost:3001/routes/new-user',{
      method:'POST'
    }).then((res)=>{console.log(res);}
    )
  }

  const  read_user = ()=>{
    fetch('http://localhost:3001/routes/read-user',{
      method:'GET'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }      
      return response.json();
    }).then(data=>setUs(JSON.stringify(data)))
    .catch(error=>console.error(error))
  }
  

  const heading = "WikiNotes"




  return (
    <div className={`grid grid-cols-11 ${ myValue&&"bg-black"}`}>

      <LeftBar mode={myValue}/>

      <div className='lg:col-span-9 col-span-11'>
        <div className='flex  justify-center '>

          <Image
            src={noteboy}
            alt='noteboy'
            className=' float-left hidden md:block'
            height={250}
            width={250}
          />

          <div className={`flex justify-center md:text-9xl text-5xl ${myValue&&"text-white"}`} style={{
            fontFamily: 'Homemade Apple',
            fontWeight: '400',
            wordWrap: 'break-word',

          }}>
            {heading}
          </div>

        </div>
        <div className=' md:m-10 m-10 clear-both'>

          <div className='sm:flex sm:gap-4 sm:justify-evenly gap-4 grid grid-cols-1'>
            <button className='bg-green-400 md:w-1/6 p-2 rounded-3xl text-white active:bg-green-600 focus:bg-green-700 focus:font-extrabold' 
            onClick={create_user}>CREATE</button>
            <button className='bg-blue-700 md:w-1/6 p-2 rounded-3xl text-white active:bg-blue-600 focus:bg-blue-700 focus:font-extrabold'
            onClick={read_user}
            >READ</button>
            <button className='bg-yellow-400 md:w-1/6 p-2 rounded-3xl text-white active:bg-yellow-600 focus:bg-yellow-700 focus:font-extrabold'>UPDATE</button>
            <button className='bg-red-600 md:w-1/6 p-2 rounded-3xl text-white active:bg-red-600 focus:bg-red-700 focus:font-extrabold'>DELETE</button>
            
            
          </div>
          <p className='col-span-1' id='experimental'>{us}</p>
        </div>
      </div>
      <RightBar />
      <div className='col-span-11'>

      <BottomBar/>
      </div>
    </div>
  )
}
