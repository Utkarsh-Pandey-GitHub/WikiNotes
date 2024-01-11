import React from 'react'
import nf from '../public/notfound.gif'
import Image from 'next/image'

function NotFound() {
  return (
    <div className='w-screen h-screen flex items-center '>
      <Image src={nf} alt='' className='absolute left-1/3'/>
    </div>
  )
}

export default NotFound
