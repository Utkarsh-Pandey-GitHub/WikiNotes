import React from 'react'
import Image from 'next/image'


function PreviewModal({ img_url }: { img_url: string }) {
  console.log(img_url);

  return (
    <div className=' h-2/3 w-full flex flex-col p-1 items-center'>

      <iframe src={img_url} className='h-full w-full' />
      

    </div>
  )
}

export default PreviewModal
