import Image from 'next/image';
import React, { useState } from 'react'
import delet from '../../public/delete.svg'
import edit_img from '../../public/edit.svg'
import submit_img from '../../public/tick.png'
import DeleteDialog from '../dialog/DeleteDialog';
import UpdateDialog from '../dialog/UpdateDialog';
import axios from 'axios';
interface CardProps {
  post?: string; // Optional prop
  dark?: boolean;
}

const PostCard: React.FC<CardProps> = ({ post, dark }) => {
  const words = post?.description.split(' ');
  const truncatedText = words.slice(0, 30).join(' ');

  const [viz, setViz] = useState(0)
  const [edit, setEdit] = useState(1)
  const [vize, setVize] = useState(0)
  const [updatedPost,setUpdatedPost]=useState(post)
  function handleEdit(e){
    setUpdatedPost((prevupdatedPost)=>({
      ...prevupdatedPost,
      [e.target.name]:e.target.value}))
    console.log(updatedPost);
    
  }
  function sendRequest(){
    // axios.post('http://localhost:3001/routes/update-user',updatedPost).then((res) => console.log(res))
    fetch('http://localhost:3001/routes/update-post',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(updatedPost)
    }).then(res=>console.log(res))
    setEdit(prevedit=>!prevedit)
  }
  return (edit ?
    <div className={`${dark && "text-white bg-slate-600"}   text-center   bg-opacity-0 rounded-2xl h-1/2 border border-black my-5`}>

      <div className=' font-bold '>
        {post?.label}
      </div>
      <div className='border border-black italic h-fit'>
        {truncatedText}{words.length > 30 ? "..." : ""}
      </div>
      <div className='float-right relative bottom-0 right-0'>

        <Image src={delet} height={25} width={25} alt='bin' onClick={() => { setViz(prevviz => !prevviz) }} />
      </div>
      <div className='float-right'>

        <Image src={edit_img} height={25} width={25} alt='edit' onClick={() => { setEdit(prevedit => !prevedit) }} />
      </div>
      <div>
        <DeleteDialog id={post._id} userId={post.author} dark={dark} viz={viz} />
      </div>
      <div>
        <UpdateDialog id={post._id} post={post} userId={post.author} dark={dark} viz={vize} />
      </div>
    </div> :
    <div className={`${dark && "text-white bg-slate-600"}   text-center   bg-opacity-0 rounded-2xl h-1/2 border border-black my-5`}>

      <div className=' font-bold '>
        <input type="text" defaultValue={post.label} name='label' id='label' className={`px-2 rounded-3xl text-center ${dark && "text-white bg-black"}`} onChange={handleEdit}/><br />
      </div>
      <div className='border border-black italic h-fit'>
        <textarea defaultValue={post.decription} name='description' id='description' rows={10} className={`w-3/4 m-0 px-2 rounded-3xl ${dark && "text-white bg-black"}`} defaultValue={post.description} onChange={handleEdit}></textarea>
      </div>
      <div className='float-right relative bottom-0 right-0'>

        <Image src={delet} height={25} width={25} alt='bin' onClick={() => { setViz(prevviz => !prevviz) }}/>
      </div>
      <div className='float-right'>

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
  )
}

export default PostCard
