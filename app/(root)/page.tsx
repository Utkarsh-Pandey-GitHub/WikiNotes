'use client'
import Image from 'next/image'
import noteboy from '../../public/notemaking.gif'
import axios from 'axios'

import chatimg from '../../public/chat1.gif'

import { useEffect, useRef, useState } from 'react'

import BottomBar from '@/components/shared/BottomBar'
import createNote from '../../public/createNote.gif'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import UserCard from '@/components/cards/UserCard'
import PostCard from '@/components/cards/PostCard'
import { useCurrUser } from '@/components/UserContext'
import loader from '../../public/loader.svg'
import create from '../../public/create.png'
import readpost from '../../public/readpost.png'
import mypost from '../../public/mypost.png'
import users from '../../public/users.png'
import tip from '../../public/tip.svg'


const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://wikinotes-backend.onrender.com'
  : 'http://localhost:3001';

export default function Home() {
  const [us, setUs] = useState<any | undefined>()
  const [pos, setPos] = useState<any | undefined>()
  const [mypos, setMyPos] = useState<any | undefined>()
  const { isSignedIn, user, isLoaded } = useUser();
  const [userid, setuserid] = useState<any | undefined>()
  const allRead = useRef(null)
  const myRead = useRef(null)
  const [newpost, setNewpost] = useState<any | undefined>({
    label: '',
    link: '',
    description: '',
    author: ''
  })
  const [visibility, setVisibility] = useState({
    create_post: false,
    all_posts: true,
    my_posts: false,
    all_users: false
  })

  interface obj {
    name: String
  }



  const read_user = () => {
    fetch(`${baseURL}/routes/read-user`, {
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
    setVisibility(prev => ({
      create_post: false,
      all_posts: false,
      my_posts: false,
      all_users: !prev.all_users
    }))
  }




  const read_my_post = (e: any) => {

    const url = `${baseURL}/routes/read-post/${encodeURIComponent(userid)}`
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
    setVisibility(prev => ({
      create_post: false,
      all_posts: false,
      my_posts: !prev.my_posts,
      all_users: false
    }))
  }



  const read_post = (e: any) => {
    fetch(`${baseURL}/routes/read-posts`, {
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
    setVisibility(prev => ({
      create_post: false,
      all_posts: !prev.all_posts,
      my_posts: false,
      all_users: false
    }))
  }

  function createPost() {
    axios.post(`${baseURL}/routes/new-post`, newpost)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }
  function handleChange(e: any) {
    setNewpost((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const heading = "WikiNotes"


  const usercontext = useCurrUser()
  useEffect(() => {
    if (isSignedIn && user) {
      console.log(user);
      axios.post(`${baseURL}/routes/new-user`, user).then((res) => {
        setuserid(res.data.active)
        setNewpost((prev: any) => ({
          ...prev,
          author: res.data.active
        }))
        usercontext?.setUser(res.data.active)
      })
    }
    read_post('')



  }, [user])


  return (
    <div className=''>

      <div className=' absolute right-3 top-3 gap-1 sm:flex hidden'>
        <UserButton />
        <SignOutButton />
      </div>
      <div className={`grid grid-cols-11  clear-both`}  >



        <div className=' col-span-11'>
          <div className='flex  justify-center  '>



            <div className={`flex justify-center md:text-9xl text-5xl heading `} style={{
              fontFamily: 'Homemade Apple',
              fontWeight: '400',
              wordWrap: 'break-word',

            }}>
              {heading}
            </div>
            <br />

            <div className='col-snap-11'>

            </div>

          </div>
          <div className='  m-10 clear-both grid grid-cols-1 ' id='head'>
            <div className=' w-full'>
              <div className='sm:flex sm:gap-4 sm:justify-evenly gap-4 grid grid-cols-1  ' >
                <button className='flex items-center flex-col '
                  onClick={() => {
                    setVisibility(prev => ({
                      create_post: !prev.create_post,
                      all_posts: false,
                      my_posts: false,
                      all_users: false
                    }))
                  }}>
                  <Image src={create} alt='' height={50} width={50} className='' />
                  <div className='shadow-sm shadow-fuchsia-300'>

                    CREATE
                  </div>

                </button>

                <button className='flex items-center flex-col '
                  onClick={read_post}
                >
                  <Image src={readpost} alt='' height={50} width={50} className='' />
                  <div className='shadow-fuchsia-300 shadow-sm'>
                    READ POSTS
                  </div>
                </button>
                <button className='flex items-center flex-col'
                  onClick={read_my_post}
                >
                  <Image src={mypost} alt='' height={50} width={50} className='' />
                  <div className='shadow-fuchsia-300 shadow-sm'>
                    MEIN POSTS
                  </div>
                </button>

                <button className='flex items-center flex-col'
                  onClick={read_user}
                ><Image src={users} alt='' height={50} width={50} className='' />
                  <div className='shadow-fuchsia-300 shadow-sm'>
                    Find Friends
                  </div>
                </button>


              </div>
            </div>




            <div className='text-gray-500 w-1/5  h-fit bg-slate-200 p-2 rounded-xl fixed top-1/2' id='tip'>
              <Image src={tip} alt='' className='float-left' />
              <div className='float-right text-red-700 cursor-default' onClick={()=>{
                const ele = document.getElementById('tip')
                ele?.classList.add('hidden')
              }}>
                X
              </div>
              <div className='my-auto text-gray-700 text-xl'>
                Tips
              </div>
              <div className='clear-both'>

                1. Click on author image to chat with the author of the post
                <br />
                <br />
                2. Click on mein posts to read the your posts
                <br />
                <br />
                3. Find other users by clicking on find friends
                <br />

              </div>

            </div>

            {visibility.create_post && <div id='form1' className='flex  justify-center w-full '>
              <ul className='mx-5 grid grid-cols-1 w-2/3 '>
                <div className='sm:flex  '>

                  <Image src={createNote} height={50} width={300} alt='' className='' />
                  <div className='my-10 italic text-3xl md:block hidden'>
                    "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great."
                  </div>
                </div>
                <li className='col-span-1 '>

                  <label htmlFor="label" className={""}>label</label><br />
                  <input type="text" id='label' name='label' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full'
                    onChange={(e: any) => (handleChange(e))}
                  />
                </li>
                <li className='col-span-1 '>

                  <label htmlFor="link" className={""}>link</label><br />
                  <input type="text" id='link' name='link' className='border border-red-700 rounded-3xl mx-2 px-2 py-1  w-full'
                    onChange={(e: any) => (handleChange(e))}
                  />
                </li>
                <li className='col-span-1'>

                  <label htmlFor="description" className={""}>description</label><br />
                  <textarea name="description" id="description" rows={10}
                    className='border border-blue-700 rounded-3xl mx-2 px-2 py-1 w-full'
                    onChange={(e: any) => (handleChange(e))}
                  >
                  </textarea>
                </li>
                <li className='hidden'>

                  <label htmlFor="author" className={""}>author name</label><br />
                  <input type="text" defaultValue={`${userid}`} id='author' name='author' className='border border-yellow-700 rounded-3xl mx-2 px-2 py-1 w-full' />
                </li>

                <button type="submit" className={`bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 my-2 border-b-4 border-blue-500 hover:border-blue-500 rounded-3xl `} onClick={createPost}>submit</button>
              </ul>
            </div>}




            {visibility.all_posts &&
              <div className={`  flex   h-auto flex-col-reverse items-center gap-5 mt-24 lg:w-1/3 lg:mx-auto w-full`} id='experimental_post ' ref={allRead}>{pos ? (pos.map((data: any, index: any) => {
                return <><PostCard post={data} key={index} mypost={false} main={true} /></>

              })) :
                <div>
                  <Image src={loader} alt='loading..' height={45} width={45} className='flex justify-center' />
                  <div className='text-slate-500 italic flex justify-center'>Just a minute...the notes are being loaded 🙂</div>
                </div>
              }
              </div>
            }


            {visibility.my_posts &&
              <div className={`flex   h-auto flex-col-reverse items-center gap-5 mt-24 lg:w-1/3 lg:mx-auto w-full`} id='experimental_post_my'>{mypos ? (mypos.map((data: any, index: any) => {
                return <><PostCard post={data} mypost={true} key={index} main={true} /></>

              }))
                :
                <div>
                  <Image src={loader} alt='loading..' height={45} width={45} className='flex justify-center' />
                  <div className='text-slate-500 italic flex justify-center'>Just a minute...the notes are being loaded 🙂</div>
                </div>
              }
              </div>}



            {visibility.all_users &&
              <div className=' grid grid-rows-2 ' id='experimental_users'>

                <div>

                  <Image src={chatimg} alt='' className='m-0 float-left' />
                  <div className='italic  lg:block text-3xl mt-80'>
                    WikiNotes is a platform where you can share your knowledge with others and learn from others. The live-Chat feature allows you to interact with other users and share your thoughts.
                  </div>
                </div>
                <div className={`   grid  grid-flow-row md:grid-cols-4 sm:grid-cols-2  grid-cols-1  gap-5`} ref={myRead}>

                  <div className='text-5xl absolute '>
                    Users
                  </div>

                  {us ? (us.map((data: any, index: any) => {
                    return <><UserCard user={data} key={index} /></>

                  }))
                    :
                    <div>
                      <Image src={loader} alt='loading..' height={45} width={45} className='flex justify-center' />
                      <div className='text-slate-500 italic flex justify-center'>Just a minute...the notes are being loaded. 🙂</div>
                    </div>
                  }
                </div>
              </div>}
          </div>
        </div>
        <div></div>
        <div className='col-span-11'>

          <BottomBar />
        </div>
      </div>
    </div>
  )
}
