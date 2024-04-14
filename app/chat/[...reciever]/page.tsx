/**
 * This is the page component for the chat feature.
 * It handles sending and receiving messages, displaying posts, and user interactions.
 */
"use client"

import PostCard from '@/components/cards/PostCard';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { ChangeEventHandler, useEffect, useId, useRef, useState } from 'react';
import io from 'socket.io-client'
import friends from '../../../public/friends.png'
import readpost from '@/public/readpost.png'
import { getCookie, setCookie, deleteCookie } from '../../lib/cookiemaker'
import videoConf from '../../../public/videoConference.png'
import videoConference from '../../../public/videoconferencing.gif'
import attach from '../../../public/attachment.png'
import Form from '@/components/forms/Form';
import Image from 'next/image';
import UserCard from '@/components/cards/UserCard2';
import Link from 'next/link';
import home from '../../../public/home.png'
import chat from '../../../public/chat.png'
import PreviewModal from '@/components/PreviewModal';
import { Input } from 'postcss';
import { set } from 'mongoose';
import airdrop from '../../../public/airdrop.png'
import recieve from '../../../public/recieve.png'
import chooseFiles from '../../../public/chooseFile.png'
import sendFile from '../../../public/sendMessage.png'
import multitask from '../../../public/multitasking.gif'
import RecieveFrom from '@/components/RecieveFrom';

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://wikinotes-backend.onrender.com'
  : 'http://localhost:3001';

interface Props {
  params: { reciever: string }
}
const page: React.FC<Props> = ({
  params
}: {
  params: { reciever: string }
}) => {
  const [messages, setMessages] = useState<any>([])
  const [receiver, setReciver] = useState<any | undefined>()
  const { user } = useUser();
  const sendInpBtnAd = useRef<HTMLButtonElement>(null)
  const [us, setUs] = useState<any | undefined>()
  const b = useRef<HTMLButtonElement>(null)
  const u = useRef<HTMLUListElement>(null)
  const i = useRef<HTMLTextAreaElement>(null)
  const [users, setUsers] = useState<any>([])
  const post_area = useRef<HTMLDivElement>(null)
  const allRead = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const rec_blob = useRef<HTMLDivElement>(null)
  const send_blob = useRef<HTMLInputElement>(null)
  const [checkedUsers, setCheckedUsers] = useState<any[]>([])
  const [visibilities, setVisibilities] = useState({
    post: false,
    user: false,
    videoCall: false,
    attachPreview: false,
    homeGuide: true,
    receiveFrom: false,
    
  })
  const [allOptions, setAllOptions] = useState<boolean>(true)
  const [mypost, setMypost] = useState([])
  const [userid, setUserid] = useState<any | undefined>()
  const [receiverid, setReceiverid] = useState<any | undefined>(params.reciever[0])
  const [chatid, setChatid] = useState<any | undefined>()
  const [lenchild, setLenchild] = useState(0)
  const [input, setInput] = useState('')
  const [inputFileUrl, setInputFileUrl] = useState<any>([])
  const [smallView, setSmallView] = useState(false)
  const [form, setForm] = useState({
    label: '',
    link: '',
    description: '',
    hidden: true,
    author: ''
  })
  const rel = new Event('rel')
  const [hidden, setHidden] = useState<boolean>(true)
  const handleFromhidden = () => {
    setHidden(!hidden)
    console.log('hidden', hidden);
  }
  const WS_URL = 'https://wikinotes-backend-socket.onrender.com'
  const wsbaseURL = process.env.NODE_ENV === 'production'
    ? WS_URL
    : 'http://localhost:3003';
  const reload = () => {
    if (userid) {
      const url = `${baseURL}/routes/read-post/${encodeURIComponent(userid)}`;
      console.log(userid);


      fetch(url, {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setMypost(data))
        .catch(error => console.error(error));
    }

  }

  window.addEventListener('rel', () => {
    reload()
  })
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

  }
  const read_my_post = () => {
    if (userid) {
      const url = `${baseURL}/routes/read-post/${encodeURIComponent(userid)}`;
      console.log(userid);


      fetch(url, {
        method: 'GET'
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response);

        return response.json();
      })
        .then(data => setMypost(data))
        .then(() => { console.log(users); })
        .catch(error => console.error(error));
    }
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // useEffect hook to add event listener and handle cleanup
  useEffect(() => {
    // Function to update screenWidth state when window is resized
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateScreenWidth);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);
  useEffect(() => {
    const socket = io(wsbaseURL);////////////////////addd the real url here


    socket.emit('fetch_prev_msgs', chatid, user)

    console.log(user?.username);
    socket.on('blob message airdrop', (userid_rec, file, file_type, user, receiverid, chatid) => {
      if (userid != userid_rec) {
        if (checkedUsers.includes(String(userid_rec))||checkedUsers.length==0) {
          console.log(typeof file);

          const new_ele = document.createElement('iframe')
          const classes = ["w-full", "h-80", "m-", "rounded-lg", "shadow-lg"]
          const FReader = new FileReader()
          new_ele.classList.add(...classes)
          const fileBlob = new Blob([file], { type: file_type })
          FReader.onload = function (e: any) {
            new_ele.src = e.target.result
          }
          FReader.readAsDataURL(fileBlob)// use this function the file has to be converted as a blob first
          rec_blob?.current?.appendChild(new_ele)
        }
      }
      else {
        alert('file sent successfully')
      }
    })
    socket.on('blob message send', (userid_rec, file, file_type, user, receiverid, chatid) => {
      // file.forEach((file: any) => {
      console.log("kuch to blob aya", file.constructor.name);

      if (userid != userid_rec) {

        console.log(typeof file);

        const new_ele = document.createElement('iframe')
        const classes = ["w-full", "h-80", "m-0", "rounded-lg", "shadow-lg"]
        const FReader = new FileReader()
        new_ele.classList.add(...classes)
        const fileBlob = new Blob([file], { type: file_type })
        FReader.onload = function (e: any) {
          new_ele.src = e.target.result
        }
        FReader.readAsDataURL(fileBlob)
        rec_blob?.current?.appendChild(new_ele)
      }
      if (userid == receiverid && chatid == chatid) {

        const new_ele = document.createElement('iframe')
        const classes = ['rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "float-left", "clear-both", "mt-2", "drag", "shadow-lg", "w-1/2", "h-80",]
        const FReader = new FileReader()
        new_ele.classList.add(...classes)
        const fileBlob = new Blob([file], { type: file_type })
        FReader.onload = function (e: any) {
          new_ele.src = e.target.result
        }
        FReader.readAsDataURL(fileBlob)
        u?.current?.appendChild(new_ele)
      }
      if (userid == userid_rec && chatid == chatid) {

        const new_ele = document.createElement('iframe')
        const classes = ['rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "float-right", "clear-both", "mt-2", "drag", "shadow-lg", "w-1/2", "h-80",]
        const FReader = new FileReader()
        new_ele.classList.add(...classes)
        const fileBlob = new Blob([file], { type: file_type })
        FReader.onload = function (e: any) {
          new_ele.src = e.target.result
        }
        FReader.readAsDataURL(fileBlob)
        u?.current?.appendChild(new_ele)
      }
      const newlen = u.current?.children.length
      setLenchild(newlen as number)
      // })
    })

    socket.on('chat message', (senderid, data, id, username, receiverid, chatId) => {

      console.log("dkdork", userid);


      const new_ele = document.createElement('li')
      const new_ele_lbl = document.createElement('li')
      if (userid == senderid) {
        new_ele_lbl.textContent = `you `
        new_ele.textContent = `${data}`
        const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
        const usr_cls = ['bg-blue-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag", "shadow-lg", "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "h-fit"]
        new_ele_lbl.classList.add(...usr_lbl_cls)
        new_ele.classList.add(...usr_cls)

      }
      else {
        new_ele_lbl.textContent = `${username} `
        new_ele.textContent = `${data}`
        const usr_lbl_cls = ['float-left', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
        const usr_cls = ['bg-slate-700', 'rounded-tl-2xl', 'rounded-br-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-left", "clear-both", "mt-0", "drag", "shadow-lg"]
        new_ele_lbl.classList.add(...usr_lbl_cls)
        new_ele.classList.add(...usr_cls)

      }
      new_ele.draggable = true;
      new_ele.addEventListener('dragstart', (e: any) => {
        new_ele.classList.add('dragged')
        console.log('dragstart');
      })
      new_ele.addEventListener('dragend', (e: any) => {
        new_ele.classList.remove('dragged')
        console.log('dragend');
      })
      // u.current?.appendChild(new_ele_lbl);
      u.current?.appendChild(new_ele);
      const newlen = u.current?.children.length
      setLenchild(newlen as number)




    })
    b.current?.addEventListener('click', (e: any) => {
      e.preventDefault()
      if (userid && receiverid && chatid) {
        console.log('chatid:::', chatid);

        socket.emit('chat message', userid, i.current?.value, user, receiverid, chatid)
      }

    })




    return () => {
      socket.disconnect();
      while (u?.current?.firstChild) {
        u.current.removeChild(u.current.firstChild);
      }

    }
  }, [user, userid, chatid,checkedUsers])
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(params.reciever);

      axios.post(`${baseURL}/routes/new-user`, user).then((res) => {
        setUserid(res.data.active)
        setForm({ ...form, author: res.data.active })

      }).then(() => {
        if (userid && receiverid) {

          fetch(`${baseURL}/routes/chat/chk`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender: userid,
              receiver: receiverid
            })
          }).then((res) => {

            return res.json()
          })
            .then((data) => {
              console.log(data);
              setChatid(data.id)
            })
            .catch((err) => { console.log(err); })
        }
      }).catch((err) => { console.log(err); })

    }

    if (userid) {
      const url = `${baseURL}/routes/read-post/${encodeURIComponent(userid)}`;
      console.log(userid);


      fetch(url, {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setMypost(data))
        .catch(error => console.error(error));
    }



    post_area.current?.addEventListener('dragover', (e: any) => {
      const draggedEle = document.querySelector('.dragged')
      if (draggedEle) {
        if (draggedEle?.textContent
          && draggedEle?.textContent?.includes('label:')
          && draggedEle?.textContent?.includes('link:')
          && draggedEle?.textContent?.includes('description:')) {

          const labelArr = draggedEle?.textContent?.split('label:')
          const linkArr = labelArr[1]?.split('link:')
          const descArr = linkArr[1]?.split('description:')
          const label = linkArr[0]
          const link = descArr[0]
          const description = descArr[1]
          setForm({
            ...form,
            label: label,
            link: link,
            description: description,
            hidden: false
          })
        }
        else {
          setForm({
            ...form,
            label: '',
            link: '',
            description: draggedEle?.textContent as string,
            hidden: false
          })
        }


      }
      console.log(hidden);

      console.log('dragover');


    })
    const getC = async () => {
      const rec: string | any = await getCookie(receiverid)
      console.log("rec", rec);

      setReciver(JSON.parse(rec.value))
    }
    getC()

    return () => {
      clearInterval(intervalId as NodeJS.Timeout)
      // deleteCookie(receiverid)
    }
  }, [user, userid])

  console.log(lenchild);
  useEffect(() => {

    u.current?.children[u.current?.children.length - 1]?.scrollIntoView({ behavior: "smooth" })

  }, [lenchild])
  let dark = true
  let hw = 45
  function handlevisibilitychange(e: any) {
    setVisibilities(prev => ({ post: false, user: false, videoCall: false, attachPreview: false, homeGuide: false, receiveFrom: false, }))
    setVisibilities(prev => ({ ...prev, [e.target.id]: true }))
  }
  function allFalse() {
    setVisibilities({ post: false, user: false, videoCall: false, attachPreview: false, homeGuide: false, receiveFrom: false})
  }
  function readTheFileAndMakeURL(e: any) {
    const fileInputElement = document.getElementById('attachFile') as HTMLInputElement;
    if (fileInputElement?.files) {
      setInputFileUrl([])
      const filesArray = Array.from(fileInputElement.files);

      filesArray.forEach((file: any) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setInputFileUrl((prev: any) => [...prev, reader.result])
        }
        reader.readAsDataURL(file)
      })
    }
    console.log(inputFileUrl);

  }
  function sendTheBlobFiles() {
    const fileInputElement = document.getElementById('attachFile') as HTMLInputElement;

    if (fileInputElement?.files) {
      console.log('reached stbf');

      const filesArray = Array.from(fileInputElement.files);
      const socket = io(wsbaseURL);
      filesArray.forEach((file: any) => {
        socket.emit('blob message send', userid, file, file.type, user, receiverid, chatid)
        //
      })
    }
  }
  function airdropTheBlobFiles() {
    const fileInputElement = document.getElementById('attachFile') as HTMLInputElement;
    if (fileInputElement?.files) {
      console.log('reached stbf airdrop');

      const filesArray = Array.from(fileInputElement.files);
      const socket = io(wsbaseURL);
      filesArray.forEach((file: any) => {
        socket.emit('blob message airdrop', userid, file, file.type, user, receiverid, chatid)
        //
      })
    }
  }

  return (
    <div className=' my-2 '>

      <Form form={form} author={userid} setForm={setForm} reload={rel} />
      <div className='border border-slate-50 rounded-3xl mx-5 p-1'>

        <div className='grid grid-cols-7  h-10  m-1'>
          <div className={`md:col-span-2 md:block hidden ${dark ? 'text-white bg-black' : 'text-black bg-white'}`}>
            {visibilities.post && <div className=' text-2xl font-bold text-center'>YOUR POSTS</div>}
            {visibilities.user && <div className='text-2xl font-bold text-center'>USERS</div>}
            {visibilities.videoCall && <div className='text-2xl font-bold text-center'>VIDEO CALL</div>}
            {visibilities.attachPreview && <div className='text-2xl font-bold text-center'>SHARE FILE</div>}
          </div>
          <div className={`md:col-span-5 col-span-7 ${dark ? 'text-white bg-black' : 'text-black bg-white'} flex`}>
            <div className='rounded-full'>

              <img src={receiver?.imageUrl} alt="" height={hw} width={hw} className='rounded-full' />
            </div>
            {receiver?.username && <div className=' text-2xl font-bold text-center mx-3'>{receiver.username}</div>}
          </div>
        </div>

        <div className='md:grid grid-cols-7 mx-5  border border-slate-900 rounded-3xl'>

          {screenWidth<745&&allOptions&&<div className={`md:col-span-2 absolute   md:block border  h-full  overflow-y-auto overflow-x-hidden rounded-3xl shadow-lg  z-50 sm:z-0 bg-black w-1/2 `}
            ref={post_area}
            style={{

              height: "87vh",
            }}>
            {visibilities.homeGuide &&
              <div className='text-white lg:px-24 md:px-18 sm:px-12 px-5'>
                <Image alt='' src={multitask} width={250} height={250} />
                Welcome to wikinotes chats!  You can chat here with any wikinotes user and send files .
                <br />
                <br />
                1. To send  files first choose files then click on Send (pdf, jpg/png [size less than 1MB])
                <br />
                <br />
                2. To airdrop files first choose files the clisk on airdrop to send it to everyone who is online and wants to recieve from you.
                <br />
                <br />
                3. Click recieve to recieve airdrops from anyone or onyl specific person.
                <br />
                <br />
                4. Drag and  drop any text msg here to create your own note
                <br />
                <br />
                5. Inject your notes as message

              </div>}
            <div className={`flex  post_container flex-col-reverse `} id='experimental_post' ref={allRead}>
              {(mypost.length && visibilities.post) && (mypost.map((data) => {
                return <><PostCard post={data} key={data} mypost={true} sendmsg={setInput} /></>

              }))}
              {mypost?.length==0?<div className='text-white text-center'>No posts yet</div>:""}
            </div>
            <div className={`  post_container flex-col-reverse   `} id='' ref={userRef}>
              {(us && visibilities.user) && (us.map((data: any, index: any) => {
                return <><UserCard user={data} key={index} /></>

              }))
              }
            </div>
            <div className=''>
              {(visibilities.videoCall) && <div className={`bg-inherit text-inherit flex flex-col items-center `}>

                <div className='  '>

                  <Image src={videoConference} alt='loader' height={200} width={350} className=''></Image>
                </div>
                <Link href={`/videoCall`}>
                  <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 my-10 ">Start Video Chat</button>
                </Link>

              </div>}
            </div>
            {(visibilities.attachPreview) && (<div className='border h-full w-full bg-inherit text-inherit '>
              <div className={`${dark ? "bg-black text-white" : " text-black bg-white"} p-3 text-justify`}>
                you can send this to anyone online to a room id of your choice and they can join the room to view and download the image or pdf file
              </div>
              {(inputFileUrl.map((file: any, index: any) => {
                return <PreviewModal img_url={file} key={index} />
              }))}
              <div className='flex justify-around flex-wrap'>

                <div className='flex flex-col justify-center items-center' onClick={() => { setVisibilities({ ...visibilities, receiveFrom: !visibilities.receiveFrom }) }}>
                  <Image src={recieve} alt="image" width={50} height={50} />
                  <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  " >recieve</div>
                </div>


                <div className='flex flex-col justify-center items-center'
                  onClick={airdropTheBlobFiles}
                >
                  <Image src={airdrop} alt="image" width={50} height={50} />
                  <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">Airdrop</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <label htmlFor="attachFile"  >
                    <Image src={chooseFiles} alt="image" width={50} height={50} />
                    <label htmlFor="attachFile"  >
                      <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">choose file</div>
                    </label>
                  </label>
                </div>
                <div className='flex flex-col justify-center items-center' ref={sendInpBtnAd as any}>
                  <button type='button' onClick={sendTheBlobFiles}>

                    <Image src={sendFile} alt="image" width={50} height={50} />
                    <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  " >send</div>
                  </button>
                </div>
              </div>
              <div className='mb-3 '>
                {visibilities.receiveFrom && visibilities.attachPreview &&
                  <RecieveFrom checkedUsers={checkedUsers} setCheckedUsers={setCheckedUsers} />
                }
              </div>
              <div className={`${dark ? "bg-black text-white" : " text-black bg-white"} m-5`}>
                <div className="bg-slate-400 bg-opacity-20" ref={rec_blob}>

                  the files you recieve will be visible here
                </div>
              </div>
            </div>)}

          </div>}
          {screenWidth>745&&<div className={`md:col-span-2 static  md:block border  h-full  overflow-y-auto overflow-x-hidden rounded-3xl shadow-lg  z-50 sm:z-0 bg-black`}
            ref={post_area}
            style={{

              height: "87vh",
            }}>
            {visibilities.homeGuide &&
              <div className='text-white lg:px-24 md:px-18 sm:px-12 px-5'>
                <Image alt='' src={multitask} width={250} height={250} />
                Welcome to wikinotes chats!  You can chat here with any wikinotes user and send files .
                <br />
                <br />
                1. To send  files first choose files then click on Send (pdf, jpg/png [size less than 1MB])
                <br />
                <br />
                2. To airdrop files first choose files the clisk on airdrop to send it to everyone who is online and wants to recieve from you.
                <br />
                <br />
                3. Click recieve to recieve airdrops from anyone or onyl specific person.
                <br />
                <br />
                4. Drag and  drop any text msg here to create your own note
                <br />
                <br />
                5. Inject your notes as message

              </div>}
            <div className={`flex  post_container flex-col-reverse `} id='experimental_post' ref={allRead}>
              {(mypost.length && visibilities.post) && (mypost.map((data) => {
                return <><PostCard post={data} key={data} mypost={true} sendmsg={setInput} /></>

              }))}
               {mypost?.length==0?<div className='text-white text-center'>No posts yet</div>:null}
            </div>
            <div className={`  post_container flex-col-reverse   `} id='' ref={userRef}>
              {(us && visibilities.user) && (us.map((data: any, index: any) => {
                return <><UserCard user={data} key={index} /></>

              }))
              }
            </div>
            <div className=''>
              {(visibilities.videoCall) && <div className={`bg-inherit text-inherit flex flex-col items-center `}>

                <div className='  '>

                  <Image src={videoConference} alt='loader' height={200} width={350} className=''></Image>
                </div>
                <Link href={`/videoCall`}>
                  <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 my-10 ">Start Video Chat</button>
                </Link>

              </div>}
            </div>
            {(visibilities.attachPreview) && (<div className='border h-full w-full bg-inherit text-inherit '>
              <div className={`${dark ? "bg-black text-white" : " text-black bg-white"} p-3 text-justify`}>
                you can send this to anyone online to a room id of your choice and they can join the room to view and download the image or pdf file
              </div>
              {(inputFileUrl.map((file: any, index: any) => {
                return <PreviewModal img_url={file} key={index} />
              }))}
              <div className='flex justify-around flex-wrap'>

                <div className='flex flex-col justify-center items-center' onClick={() => { setVisibilities({ ...visibilities, receiveFrom: !visibilities.receiveFrom }) }}>
                  <Image src={recieve} alt="image" width={50} height={50} />
                  <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  " >recieve</div>
                </div>


                <div className='flex flex-col justify-center items-center'
                  onClick={airdropTheBlobFiles}
                >
                  <Image src={airdrop} alt="image" width={50} height={50} />
                  <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">Airdrop</div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <label htmlFor="attachFile"  >
                    <Image src={chooseFiles} alt="image" width={50} height={50} />
                    <label htmlFor="attachFile"  >
                      <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">choose file</div>
                    </label>
                  </label>
                </div>
                <div className='flex flex-col justify-center items-center' ref={sendInpBtnAd as any}>
                  <button type='button' onClick={sendTheBlobFiles}>

                    <Image src={sendFile} alt="image" width={50} height={50} />
                    <div className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  " >send</div>
                  </button>
                </div>
              </div>
              <div className='mb-3 '>
                {visibilities.receiveFrom && visibilities.attachPreview &&
                  <RecieveFrom checkedUsers={checkedUsers} setCheckedUsers={setCheckedUsers} />
                }
              </div>
              <div className={`${dark ? "bg-black text-white" : " text-black bg-white"} m-5`}>
                <div className="bg-slate-400 bg-opacity-20" ref={rec_blob}>

                  the files you recieve will be visible here
                </div>
              </div>
            </div>)}

          </div>}
          {/* <div className='col-span-2 bg-slate-50 bg-opacity-10 '></div> */}
          <div className={`col-span-5 bg-slate-50 bg-opacity-10  overflow-auto rounded-3xl overflow-x-hidden shadow-2xl `}
            style={
              {
                height: "87vh",
              }
            }>


            <ul id="messages" ref={u} className=''></ul>


          </div>
        </div>
        <div className='grid grid-cols-7  border-slate-50 h-10  mx-5 my-1'>
          <div className='md:col-span-2 col-span-7 flex flex-row justify-evenly'>
            <Image src={readpost} alt='loader' id='post' height={50} width={50} onClick={(e) => {
              handlevisibilitychange(e)
              read_my_post()
            }} />
            <Image src={friends} alt='loader' id='user' height={50} width={50} onClick={(e) => {
              handlevisibilitychange(e)
              read_user()
            }} />
            <Image src={videoConf} alt='loader' id='videoCall' height={50} width={50} onClick={(e) => {
              handlevisibilitychange(e)
            }} />
            <label htmlFor=""  >
              <Image src={attach} alt='loader' height={50} width={50}
                id="attachPreview"
                onClick={(e) => {
                  handlevisibilitychange(e)
                }}
              />
            </label>
            <div className='md:hidden'>

            <Image src={chat} alt='loader' id='chat' height={50} width={50} onClick={(e) => {
              allFalse();
              setAllOptions(prev=>!prev)
            }} />
            </div>
            <input type="file" id="attachFile" name='attachFile' className='hidden'
              multiple
              ref={send_blob}
              onChange={(e: any) => {
                readTheFileAndMakeURL(e)
              }} />
            <Link href={`/`} className='hidden sm:block'>
              <Image src={home} alt='loader' height={50} width={50} />
            </Link>
          </div>
          <form id="form" action="" className=' bottom-2 right-4 grid grid-cols-4  md:col-span-5 col-span-7 msg_box ' >
            <textarea id="input" className='border border-black col-span-3  rounded-xl h-9' ref={i}
              onChange={(e: any) => setInput(e.target.value)} value={input}>
            </textarea>
            <button id='btn' ref={b} className={`focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 text-lg col-span-1 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed h-9`} disabled={chatid ? false : true} onClick={handleFromhidden}>Send</button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default page
