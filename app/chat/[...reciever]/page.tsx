/**
 * This is the page component for the chat feature.
 * It handles sending and receiving messages, displaying posts, and user interactions.
 */
"use client"

import PostCard from '@/components/cards/PostCard';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

import Form from '@/components/forms/Form';

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

  const { user } = useUser();
  const b = useRef<HTMLButtonElement>(null)
  const u = useRef<HTMLUListElement>(null)
  const i = useRef<HTMLTextAreaElement>(null)
  const allRead = useRef<HTMLDivElement>(null)
  const [mypost, setMypost] = useState([])
  const [userid, setUserid] = useState<any | undefined>()
  const [receiverid, setReceiverid] = useState<any | undefined>(params.reciever[0])
  const [chatid, setChatid] = useState<any | undefined>()
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
    console.log('hidden', hidden);
  }
  const WS_URL = 'https://wikinotes-backend-socket.onrender.com'
  useEffect(() => {
    const socket = io(WS_URL?WS_URL:'http://localhost:3003');

    socket.emit('fetch_prev_msgs', chatid,user)

    console.log(user?.username);
    const hi = "hi"
    socket.on('chat message', (senderid, data, id, username, receiverid,chatId) => {
      
      console.log("dkdork",userid);
      
      
      const new_ele = document.createElement('li')
      const new_ele_lbl = document.createElement('li')
      if (userid == senderid) {
        new_ele_lbl.textContent = `you `
        new_ele.textContent = `${data}`
        const usr_lbl_cls = ['float-right', 'clear-both', 'mx-2', 'text-bold', 'italic', "mb-0", "pb-0"]
        const usr_cls = ['bg-blue-700', 'rounded-bl-2xl', 'rounded-tr-2xl', "lg:w-1/5", "md:w-1/3", "sm:w-1/2", "w-3/4", "text-white", "p-2", "m-2", "float-right", "clear-both", "mt-0", "drag"]
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
      // u.current?.appendChild(new_ele_lbl);
      u.current?.appendChild(new_ele);
      const newlen = u.current?.children.length
      setLenchild(newlen as number)




    })
    b.current?.addEventListener('click', (e: any) => {
      e.preventDefault()
      if(userid&&receiverid&&chatid){
        console.log('chatid:::',chatid);
        
        socket.emit('chat message', userid, i.current?.value, user, receiverid,chatid)
      }

    })


    return () => {
      socket.disconnect()
    }
  }, [user,userid,chatid])
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(params.reciever);

      axios.post(`${baseURL}/routes/new-user`, user).then((res) => {
        setUserid(res.data.active)

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
          } )
          .catch((err) => { console.log(err); })
        }
      }).catch((err) => { console.log(err); })

    }
    /**
     * Fetches the user's post data from the server based on the provided user ID.
     * @param {string} userid - The user ID used to fetch the post data.
     */
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

    /**
     * Adds event listeners to the elements with class 'post_container' and updates the form state based on the dragged element's content.
     * If the dragged element's content includes 'label:', 'link:', and 'description:', it extracts the label, link, and description values and updates the form state.
     * If the dragged element's content does not include 'label:', 'link:', and 'description:', it sets the label as an empty string, the link as an empty string, and the description as the dragged element's text content.
     * @param e - The dragover event object.
     */
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


      <Form form={form} author={userid} setForm={setForm} />

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

          <div>sender name is {user?.username} and receiver is {params.reciever} and chat id is {chatid}</div>
          <ul id="messages" ref={u} className=''></ul>


          <form id="form" action="" className='fixed bottom-2 right-4 grid grid-cols-4   ' style={{
            width: "69%"
          }}>
            <textarea id="input" className='border border-black col-span-3 rounded-xl' ref={i}
              onChange={(e: any) => setInput(e.target.value)} value={input}>
            </textarea>
            <button id='btn' ref={b} className='mt-2 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 text-lg col-span-1' onClick={handleFromhidden}>Send</button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default page
