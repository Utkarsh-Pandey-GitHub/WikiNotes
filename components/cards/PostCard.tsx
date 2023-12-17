import Image from 'next/image';
import React, { useState } from 'react'
import  delet from '../../public/delete.svg'
import edit from '../../public/edit.svg'
import DeleteDialog from '../dialog/DeleteDialog';
interface CardProps {
    post?: string; // Optional prop
    dark?:boolean;
}

const PostCard:React.FC<CardProps>=({post,dark})=>{
  const words = post?.description.split(' ');
  const truncatedText = words.slice(0, 30).join(' ');
  // const handleOnClick = ()=>{
  //   console.log("delete");
    
  //   const classes=document.getElementById("main")?.classList
  //   if (document.getElementById("main")?.classList?.contains("opacity-40")) {
  //     document.getElementById("main")?.classList.remove("opacity-40")
  //   }
  //   else{
  //     document.getElementById("main")?.classList?.add("opacity-40")
  //   }
  // }
  const [viz, setViz] = useState(0)
    function toggleviz(){

    }
  return (
    <div className={`${dark&&"text-white bg-slate-600"}   text-center   bg-opacity-0 rounded-2xl h-1/2 border border-black my-5`}>
      {/* <div className='flex justify-center '>
        <Image src={user?.imageUrl} alt='image' height={100} width={100} className='rounded-full border border-black'/>
      </div> */}
      <div className=' font-bold '>
        {post?.label}
      </div>
      <div className='border border-black italic h-fit'>
        {truncatedText}{words.length>30?"...":""}
      </div>
      <div className='float-right relative bottom-0 right-0'>

      <Image src={delet} height={25} width={25} alt='bin' onClick={()=>{setViz(prevviz=>!prevviz)}}/>
      </div>
      <div className='float-right'>

      <Image src={edit} height={25} width={25} alt='edit'/>
      </div>
      <div>
        <DeleteDialog id={post._id} userId={post.author} dark={dark} viz={viz}/>
      </div>
    </div>
  )
}

export default PostCard
