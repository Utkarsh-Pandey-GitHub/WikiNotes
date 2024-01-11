'use client'
import Image from 'next/image'
import noteboy from '../../public/notemaking.gif'
import axios from 'axios'

import LeftBar from '@/components/shared/LeftBar'
import RightBar from '@/components/shared/RightBar'


import { useEffect, useRef, useState } from 'react'

import BottomBar from '@/components/shared/BottomBar'

import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import UserCard from '@/components/cards/UserCard'
import PostCard from '@/components/cards/PostCard'
import { useCurrUser } from '@/components/UserContext'




export default function Home() {

  
  const [us, setUs] = useState([])
  const [pos, setPos] = useState([])
  const [mypos, setMyPos] = useState([])
  const [currUser, setcurrUser] = useState<any|undefined>()
  const { isSignedIn, user, isLoaded } = useUser();
  const [userid, setuserid] = useState<any|undefined>()
  const allRead = useRef(null)
  const myRead = useRef(null)

  interface obj {
    name: String
  }

  

  const read_user = () => {
    fetch(`http://localhost:3001/routes/read-user`, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
      .then(data => {
        setUs(data);
        console.log(data)
      })
      .catch(error => console.error(error))
      toggleVisibility("experimental_users")
    }

    
    
    
    const read_my_post = (e:any) => {
      
      const url = `http://localhost:3001/routes/read-post/${encodeURIComponent(userid)}`
    console.log(userid);
    
    fetch(url, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => setMyPos(data))
    .catch(error => console.error(error))
    
    const ele = document.getElementById('experimental_post')
    if (!ele?.classList.contains('hidden')) {
      
      ele?.classList.add('hidden')
      ele?.classList.remove('flex')
    }
    toggleVisibility("experimental_post_my")
  }
  
  
  
  const read_post = (e:any) => {
    fetch(`http://localhost:3001/routes/read-posts`, {
      method: 'GET'
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => setPos(data))
    .catch(error => console.error(error))
    console.log('clicked');
    
    
    const ele = document.getElementById('experimental_post_my')
    if (!ele?.classList.contains('hidden')) {
      ele?.classList.add('hidden')
      ele?.classList.remove('flex')
    }
    toggleVisibility("experimental_post")
  }

  
  function toggleVisibility(id: string) {
    const ele = document.getElementById(id)
    if (ele?.classList.contains('hidden')) {
      ele.classList.remove('hidden')
      ele.classList.add('flex')
    }
    else {
      ele?.classList.add('hidden')
      ele?.classList.remove('flex')
      
    }
  }

  const heading = "WikiNotes"
  
  
  const usercontext = useCurrUser()
  useEffect(() => {
    if (isSignedIn&&user) {
      console.log(user);
      axios.post('http://localhost:3001/routes/new-user', user).then((res) => { 
        setuserid(res.data.active)
        usercontext?.setUser(res.data.active)
      })
    }
    
    
    
  }, [user])
  
  
  return (
    <>

      <div className={`grid grid-cols-11  `}  >

        <LeftBar  />

        <div className='lg:col-span-9 col-span-11'>
          <div className='flex  justify-center '>

            <Image
              src={noteboy}
              alt='noteboy'
              className=' float-left hidden md:block'
              height={250}
              width={250}
            />

            <div className={`flex justify-center md:text-9xl text-5xl `} style={{
              fontFamily: 'Homemade Apple',
              fontWeight: '400',
              wordWrap: 'break-word',

            }}>
              {heading}
            </div>

          </div>
          <div className=' md:m-10 m-10 clear-both grid grid-cols-1 '>

            <div className='sm:flex sm:gap-4 sm:justify-evenly gap-4 grid grid-cols-1'>
              <button className='bg-green-400 md:w-1/6 p-2 rounded-3xl text-white active:bg-green-600 focus:bg-green-700 focus:font-extrabold'
                onClick={() => { toggleVisibility('form1') }}>CREATE</button>

              <button className='bg-blue-700 md:w-1/6 p-2 rounded-3xl text-white active:bg-blue-600 focus:bg-blue-700 focus:font-extrabold'
                onClick={read_post}
              >READ POSTS</button>
              <button className='bg-yellow-400 md:w-1/6 p-2 rounded-3xl text-white active:bg-yellow-600 focus:bg-yellow-700 focus:font-extrabold'
                onClick={read_my_post}
              >MY POSTS</button>

              <button className='bg-blue-700 md:w-1/6 p-2 rounded-3xl text-white active:bg-blue-600 focus:bg-blue-700 focus:font-extrabold'
                onClick={read_user}
              >Find Friends</button>
              

            </div>


            <form action="http://localhost:3001/routes/new-post" method='POST' id='form1' className='hidden  justify-center'>
              <ul className='mx-5 grid grid-cols-1 w-2/3 '>
                <li className='col-span-1 '>

                  <label htmlFor="label" className={""}>label</label><br />
                  <input type="text" id='label' name='label' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' />
                </li>
                <li className='col-span-1 '>

                  <label htmlFor="link" className={""}>link</label><br />
                  <input type="text" id='link' name='link' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full' />
                </li>
                <li className='col-span-1'>

                  <label htmlFor="description" className={""}>description</label><br />
                  <textarea name="description" id="description" rows={10}
                    className='border border-blue-700 rounded-3xl mx-2 px-2 py-1 w-full'
                  >

                  </textarea>
                </li>
                <li className='hidden'>

                  <label htmlFor="author" className={""}>author name</label><br />
                  <input type="text" defaultValue={`${userid}`} id='author' name='author' className='border border-yellow-700 rounded-3xl mx-2 px-2 py-1 w-full' />
                </li>

                <button type="submit" className={`bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-blue-500 hover:border-blue-500 rounded-3xl `}>submit</button>
              </ul>
            </form>
            <div className={`  flex  flex-wrap items-baseline`} id='experimental_post' ref={allRead}>{(pos.map((data) => {
              return <><PostCard post={data} key={data} mypost={false} main={true}/></>

            }))}
            </div>
            <div className={`   flex  flex-wrap items-baseline`} id='experimental_post_my'>{(mypos.map((data) => {
              return <><PostCard post={data} mypost={true} key={data} main={true}/></>

            }))}
            </div>
            <div className={`   grid  grid-flow-row md:grid-cols-4 sm:grid-cols-2  grid-cols-1  gap-5`} id='experimental_users' ref={myRead}>{(us.map((data) => {
              return <><UserCard user={data}/></>

            }))}
            </div>
          </div>
        </div>
        <RightBar />
        <div className='col-span-11'>

          <BottomBar />
        </div>
      </div>
    </>
  )
}
