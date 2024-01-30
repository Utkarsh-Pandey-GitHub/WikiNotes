"use client"
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react'
import delet from '../../public/delete.svg'
import edit_img from '../../public/edit.svg'
import submit_img from '../../public/tick.png'
import DeleteDialog from '../dialog/DeleteDialog';
import UpdateDialog from '../dialog/UpdateDialog';
import sendMessage from '../../public/sendMessage.png';
import axios from 'axios';
import noteboy from '../../public/notemaking.gif';
import Link from 'next/link';



interface CardProps {
  post?: any; // Optional prop
  dark?: boolean;
  mypost?: boolean;
  main?: boolean
  sendmsg?: any | undefined
}
const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://wikinotes-backend.onrender.com'
  : 'http://localhost:3001';

const PostCard: React.FC<CardProps> = ({ post, dark, mypost, main, sendmsg }) => {
  const words = post?.description.split(' ');
  const [truncatedText, setTruncatedText] = useState(words.slice(0, 30).join(' '))

  const [viz, setViz] = useState(false)
  const [edit, setEdit] = useState(true)
  const [vize, setVize] = useState(false)
  const [updatedPost, setUpdatedPost] = useState(post)
  const [thumbnail, setThumbnail] = useState('')
  const [author, setAuthor] = useState<any | never>()
  const [chatToggle, setChatToggle] = useState(false)


  function handleEdit(e: any) {
    setUpdatedPost((prevupdatedPost: any) => ({
      ...prevupdatedPost,
      [e.target.name]: e.target.value
    }))
    console.log(updatedPost);

  }


  function sendRequest() {

    fetch(`${baseURL}/routes/update-post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    }).then(res => console.log(res))
    setEdit(prevedit => !prevedit)
  }

  function toggleWords() {
    const test = truncatedText.split(' ')
    if (test.length < words.length) {

      setTruncatedText(words.join(' '))
    } else {
      setTruncatedText(words.slice(0, 30).join(' '))
    }
    words.slice(0, 30).join(' ')

  }
  console.log(mypost);

  useEffect(() => {
    if (post.link) {

      try {
        const response = axios.get(`https://api.linkpreview.net/?key=${main ? '7d3be28919787b9e545b1e1b4b4957df' : '6d14c0b1203a5514b979355461fde9ba'}&q=${post.link}`).then((res) => setThumbnail(res.data.image));
      } catch (error) {
        console.error('Error fetching thumbnail:', error);
      }
    }
  }, [post.link]);

  useEffect(() => {
    if (post.author) {
      axios.post(`${baseURL}/routes/getuser`, { id: post.author })
        .then((res) => {
          setAuthor(res.data)
        })
        .catch((err) => console.log(err))
    }


  }, [post])

  return (
    
    <div className='flex  justify-center  border border-black   max-h-fit shadow-xl m-2 rounded-md' style={{ width: main ? "40%" : "100%" }}>
            {chatToggle&&<Link href={`/chat/${post.author}`}><button className="float-left absolute   bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-3xl" style={{
              left: "30vw",
            }}>
              Chat
            </button></Link>}
      {edit ?
        <div className={`m-2 ${dark && "text-white bg-slate-600"}    flex flex-col  text-center   bg-opacity-0 rounded-2xl   mb-1 w-full ${main && ""} p-1`}>
          <div className='font-bold text-lg mb-7 shadow-sm'>
            <Image src={author ? author.imageUrl : noteboy} alt="" className='w-12 h-12 rounded-full float-left mr-1 ' width={120} height={12} onClick={()=>setChatToggle(prev=>!prev)}/>
            <div className='text-left ' onClick={()=>setChatToggle(prev=>!prev)}>
              {author?.username}
            </div>
          </div>
          <div className=' font-bold text-base text-left '>
            {post?.label}
          </div>


          {(post.link) && <div className=''>
            <a href={post?.link} className='text-blue-800 break-words '>
              {(post.link && thumbnail) && <img src={thumbnail} alt='' className='w-fit rounded-2xl m-auto' width={30} height={30} />}

              <p className=''>{post?.link}</p></a>

          </div>}
          <div className='  italic h-auto break-words text-justify mt-3'>
            {truncatedText}{words.length > 30 && truncatedText.split().length !== 30 ? <span onClick={toggleWords}>...</span> : ""}
          </div>
          <div className='px-10 flex justify-evenly' >
            <span className=''>
              {mypost && <Image src={edit_img} height={25} width={25} alt='edit' onClick={() => { setEdit(prevedit => !prevedit) }} />}
            </span>
            <span className=''>
              {mypost && <Image src={sendMessage} height={25} width={25} alt='send'
                onClick={() => {
                  sendmsg(
                    `label:${post.label}
              \n\nlink:${post.link ? post.link : 'no link'}
              \n\ndescription:${post.description}`
                  )
                }} />}
            </span>
            <span className=''>

              {mypost && <Image src={delet} height={25} width={25} alt='bin' onClick={() => { setViz(prevviz => !prevviz) }} />}
            </span>
          </div>
          <div>
            <DeleteDialog id={post._id} userId={post.author} dark={dark} viz={viz} />
          </div>
          <div>
            <UpdateDialog id={post._id} post={post} userId={post.author} dark={dark} viz={vize} />
          </div>
        </div>
        :
        <div className={`${dark && "text-white bg-slate-600"}   text-center   bg-opacity-0 rounded-2xl  border border-black my-5 w-full`}>

          <div className=' font-bold '>
            <input type="text" defaultValue={post.label} name='label' id='label' className={`px-2 rounded-3xl text-center ${dark && "text-white bg-black"}`} onChange={handleEdit} /><br />
          </div>
          {post.link && <div className=' text-blue-600'>
            <input type="text" defaultValue={post.link} name='link' id='link' className={`px-2 rounded-3xl text-center  ${dark && "text-white bg-black"}`} onChange={handleEdit} /><br />
          </div>}
          <div className='border border-black italic h-auto'>
            <textarea defaultValue={post.decription} name='description' id='description' rows={10} className={`w-full m-0 px-2 rounded-3xl ${dark && " bg-black"} text-justify text-black`} onChange={handleEdit}>
              {post.description}
            </textarea>
          </div>
          <div className='grid grid-flow-row grid-cols-4 items-end'>

            <div className='float-right relative bottom-0 right-0'>

              <Image src={delet} height={25} width={25} alt='bin' onClick={() => { setViz(prevviz => !prevviz) }} />
            </div>
            <div className='float-right col-span-1 '>

              <Image src={edit_img} height={25} width={25} alt='edit' onClick={() => { setEdit(prevedit => !prevedit) }} />
            </div>
            <div className='float-right'>
              <Image src={submit_img} height={25} width={25} alt='edit' onClick={sendRequest} />

            </div>
            <div>
              <DeleteDialog id={post._id} userId={post.author} dark={dark} viz={viz} />
            </div>
            <div>
              <UpdateDialog id={post._id} post={post} userId={post.author} dark={dark} viz={vize} />
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default PostCard
