import React, { useState } from 'react'

interface CardProps {
  id?: any; // Optional prop
  userId?: any; // Optional prop
  post?: any; // Optional prop
  dark?: boolean;
  viz?: boolean;
}
const UpdateDialog: React.FC<CardProps> = ({ id,post, userId, dark, viz }) => {
  const [viza, setViza] = useState(true)
  const [posti, setPosti] = useState(post)
  // function handleChange(e){
  //   // setPost(...post,e.target.name:e.target.value)
  // }
  return (!(viz === undefined || viz !== viza) &&
    <div className='h-96 w-96 bg-blue-600 text-black z-50 relative top-20 flex justify-center flex-col'>
      <div>

        <label htmlFor="label" className='w-1/2 h-1'>label</label><br />
        <input type="text" defaultValue={post.label} name='label' id='label' className='px-2 rounded-3xl' /><br />
      </div>
      <div>

        <label htmlFor="description" className='w-1/2 h-1'>description</label><br />
        <textarea defaultValue={post.decription} name='description' id='description' rows={10} className='w-3/4 m-0 px-2 rounded-3xl' value={post.description}></textarea>
      </div>
      <div className='bg-yellow-500 text-white my-3 rounded-3xl w-2/3 ' onClick={() => { setViza(prevviza => !prevviza) }}>
        Cancel
      </div>
    </div>
  )
}

export default UpdateDialog
