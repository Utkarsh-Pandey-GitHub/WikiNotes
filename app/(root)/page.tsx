'use client'
import Image from 'next/image'
import noteboy from '../../public/notemaking.gif'
import axios from 'axios'

import chatimg from '../../public/chat1.gif'

import { useEffect, useRef, useState } from 'react'


import createNote from '../../public/notegirl.png'
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
    file: '',
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
    if (newpost.label !== '') {
      axios.post(`${baseURL}/routes/new-post`, newpost)
        .then((res) => {
          setVisibility(prev => ({
            create_post: false,
            all_posts: true,
            my_posts: false,
            all_users: false
          }))
        })
        .catch((err) => console.log(err))
    }

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
      //console.log(user);
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

  function setPreview(e: any) {
    handleChange(e)
    const fr = new FileReader();
    const file = e.target.files[0]; // Get the file from the event

    fr.onload = () => {
      if (fr.result) {
        const element: any = document.getElementById('inputiframe');
        if (element) {
          element.src = fr.result;
        }
      }
    };

    fr.readAsDataURL(file); // Read the file, not a Blob
  }
  return (
    <div className=''>

      {/* <div className=' absolute right-3 top-3 gap-1 sm:flex z-50 text-white'>
        <UserButton />
        <SignOutButton />
      </div> */}
      <div className={`grid grid-cols-11  clear-both`}  >



        <div className=' col-span-11 bg-slate-100'>
          <div className='fixed'>


          </div>
          <div className='  mb-10 clear-both grid grid-cols-1 ' id='head'>
            <div className=' w-full fixed bg-slate-800 text-white'>
              <div className='flex  justify-center  '>



                <div className={`flex justify-center md:text-3xl text-3xl heading w-screen `} style={{
                  fontFamily: 'Homemade Apple',
                  fontWeight: '400',
                  wordWrap: 'break-word',

                }}>
                  {heading}
                </div>
                <br />


              </div>
              <div className='flex justify-evenly gap-4   border-b border-b-slate-300 bg-inherit' >
                <button className='flex items-center flex-col  '
                  onClick={() => {
                    setVisibility(prev => ({
                      create_post: !prev.create_post,
                      all_posts: false,
                      my_posts: false,
                      all_users: false
                    }))
                  }}>
                  <Image src={create} alt='' height={35} width={35} className='' />
                  <div className='text-sm'>

                    CREATE
                  </div>

                </button>

                <button className='flex items-center flex-col '
                  onClick={read_post}
                >
                  <Image src={readpost} alt='' height={35} width={35} className='' />
                  <div className='text-sm'>
                    READ POSTS
                  </div>
                </button>
                <button className='flex items-center flex-col'
                  onClick={read_my_post}
                >
                  <Image src={mypost} alt='' height={35} width={35} className='' />
                  <div className=' text-sm'>
                    MY POSTS
                  </div>
                </button>

                <button className='flex items-center flex-col'
                  onClick={read_user}
                ><Image src={users} alt='' height={35} width={35} className='' />
                  <div className=''>
                    Find Friends
                  </div>
                </button>
                <div className=' absolute right-3 top-3 gap-1 sm:flex z-50 text-white'>
                  <UserButton />
                  <SignOutButton />
                </div>
              </div>
            </div>




            <div className='text-gray-500 w-1/5  h-fit bg-slate-200 p-2 rounded-xl fixed top-1/2' id='tip'>
              <Image src={tip} alt='' className='float-left' />
              <div className='float-right text-red-700 cursor-default font-bold' onClick={() => {
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

            {visibility.create_post && <div id='form1' className='flex  justify-center w-full mt-44'>
              <ul className='mx-5 grid grid-cols-1 w-2/3 '>
                <div className='sm:flex  '>

                  <Image src={createNote} height={50} width={300} alt='' className='' />
                  <div className='my-10 italic text-3xl md:block hidden'>
                    "Learning gives creativity, creativity leads to thinking, thinking provides knowledge, and knowledge makes you great."
                  </div>
                </div>
                <li className='col-span-1 '>

                  <label htmlFor="label" className={"px-6 text-xl font-semibold"}>Title/Label</label><br />
                  <input type="text" id='label' name='label' className='border border-indigo-700 rounded-3xl mx-2 px-2 py-1  w-full'
                    onChange={(e: any) => (handleChange(e))}

                  />
                </li>
                <li className='col-span-1 '>

                  <label htmlFor="link" className={"px-6 text-xl font-semibold"}>link</label><br />
                  <input type="text" id='link' name='link' className='border border-indigo-700 rounded-3xl mx-2 px-2 py-1  w-full'
                    onChange={(e: any) => (handleChange(e))}
                  />
                </li>

                <li className='col-span-1'>

                  <label htmlFor="description" className={"px-6 text-xl font-semibold"}>description</label><br />
                  <textarea name="description" id="description" rows={10}
                    className='border border-indigo-700 rounded-3xl mx-2 px-2 py-1 w-full'
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
              <div className={`  flex   h-auto flex-col-reverse items-center gap-5 mt-32 lg:w-1/3 lg:mx-auto ml-5 mr-5 w-auto `} id='experimental_post ' ref={allRead}>{pos ? (pos.map((data: any, index: any) => {
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
                  <div className='text-slate-500 italic flex justify-center'>Just a minute...the notes are being loaded </div>
                </div>
              }
              </div>}



            {visibility.all_users &&
              <div className='mt-24 flex w-3/4 flex-col mx-auto' id='experimental_users'>


                <div className='text-xl font-semibold mx-auto'>
                  People in Community
                </div>
                <div className={`   flex justify-start  sm:flex-wrap sm:gap-4 sm:flex-row flex-col gap-4`} ref={myRead}>

                  {us ? (us.map((data: any, index: any) => {
                    return <><UserCard user={data} key={index} /></>

                  }))
                    :
                    <div>
                      <Image src={loader} alt='loading..' height={45} width={45} className='flex justify-center' />
                      <div className='text-slate-500 italic flex justify-center'>Loading...</div>
                    </div>
                  }
                </div>
              </div>}
          </div>
        </div>


      </div>
    </div>
  )
}
