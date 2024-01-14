"use client"

import PostCard from '@/components/cards/PostCard';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
import chatimg from '../../public/chat1.gif'
import Image from 'next/image';
import Form from '@/components/forms/Form';

const page: React.FC = () => {
  const [messages, setMessages] = useState<any>("")

  const { user } = useUser();

  const b = useRef<HTMLButtonElement>(null)
  const u = useRef<HTMLUListElement>(null)
  const i = useRef<HTMLTextAreaElement>(null)
  const allRead = useRef<HTMLDivElement>(null)
  const [mypost, setMypost] = useState([])
  const [userid, setuserid] = useState<any | undefined>()
  const [lenchild, setLenchild] = useState(0)
  const [input, setInput] = useState('')
  const [form, setForm] = useState({
    label: '',
    link: '',
    description: '',
    hidden: true
  })
  const [hidden, setHidden] = useState<boolean>(true)
  const handleFromhidden = () => {
    setHidden(!hidden)
    console.log('hidden',hidden);
  }
  useEffect(() => {
    const socket = io("http://localhost:3002");
    console.log(user?.username);
    const hi = "hi"
    socket.on('chat message', (data, id, username) => {
      const new_ele = document.createElement('li')
      const new_ele_lbl = document.createElement('li')
      if (socket.id == id) {
        new_ele_lbl.textContent = `you `
        new_ele.textContent = `${data}`
        const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
        const usr_cls = ['bg-purple-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag"]
        new_ele_lbl.classList.add(...usr_lbl_cls)
        new_ele.classList.add(...usr_cls)

      }
      else {
        new_ele_lbl.textContent = `${username} `
        new_ele.textContent = `${data}`
        const usr_lbl_cls = ['float-left', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
        const usr_cls = ['bg-slate-700', 'rounded-tl-2xl', 'rounded-br-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-left", "clear-both", "mt-0", "drag"]
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
      u.current?.appendChild(new_ele_lbl);
      u.current?.appendChild(new_ele);
      setLenchild(u.current?.children.length)




    })
    b.current?.addEventListener('click', (e: any) => {
      e.preventDefault()
      socket.emit('chat message', i.current?.value, user)

    })


    return () => {
      socket.disconnect()
    }
  }, [user])
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      axios.post('http://localhost:3001/routes/new-user', user).then((res) => {
        setuserid(res.data.active)

      })
    }
    if (userid) {

      // const web_poll_post = setInterval(() => {
      const url = `http://localhost:3001/routes/read-post/${encodeURIComponent(userid)}`
      console.log(userid);

      fetch(url, {
        method: 'GET'
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => setMypost(data))
        .catch(error => console.error(error))
      // }, 600000)
      // setIntervalId(web_poll_post)
    }

    Array.from(document.getElementsByClassName('post_container')).forEach(element => {

      element.addEventListener('dragover', (e: any) => {
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
    });
    return () => {
      clearInterval(intervalId as NodeJS.Timeout)
    }
  }, [user, userid])

  console.log(lenchild);
  useEffect(() => {

    u.current?.children[u.current?.children.length - 1]?.scrollIntoView({ behavior: "smooth" })

  }, [lenchild])
  
  return (
    <div>
      {/* <Image src={chatimg} alt='' className='absolute left-1/4'/> */}
      

      <Form form={form} author={userid}  setForm={setForm}/>
      
      <div className='md:grid grid-cols-7 m-5  '>

        <div className='md:col-span-2 hidden md:block border mb-24 border-slate-700 h-full fixed overflow-auto rounded-3xl' style={{
          width: "27%"
        }}>
          <div className={`flex  post_container flex-col-reverse`} id='experimental_post' ref={allRead}>
            {(mypost.map((data) => {
              return <><PostCard post={data} key={data} mypost={true} sendmsg={setInput} /></>

            }))}
          </div>

        </div>
        <div className='col-span-2'></div>
        <div className='col-span-5 border-slate-700 border  overflow-auto rounded-3xl '
          style={
            {
              height: "90vh",
            }
          }>

          <div>user name is {user?.username}</div>
          <ul id="messages" ref={u} className=''></ul>


          <form id="form" action="" className='fixed bottom-2 right-4 grid grid-cols-4   ' style={{
            width: "69%"
          }}>
            <textarea id="input" className='border border-black col-span-3 rounded-xl' ref={i}
              onChange={(e: any) => setInput(e.target.value)} value={input}>
            </textarea>
            <button id='btn' ref={b} className='mt-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg  px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 text-lg col-span-1' onClick={handleFromhidden}>Send</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default page
