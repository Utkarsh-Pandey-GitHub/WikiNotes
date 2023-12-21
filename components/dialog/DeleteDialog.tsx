import React, { useState } from 'react'
import delet from '../../public/delete.svg'
import Image from 'next/image';
// import axios from 'axios';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface CardProps {
  id?: any; // Optional prop
  userId?: any; // Optional prop
  dark?: boolean;
  viz?: boolean;
}
const DeleteDialog: React.FC<CardProps> = ({ id, userId, dark, viz }
  ) => {
  const [viza, setViza] = useState(1)
  interface ID {
    pid: any,
    uid: any
  }
  const ids: ID = {
    pid: id,
    uid: userId
  }
  function deletepost() {
    console.log(id);


    interface MyRequestBody {
      pid: string|any,
      uid: string|any
    }
    const requestBody: MyRequestBody = {
      pid: id,
      uid:userId
    };

    axios.post<MyRequestBody, AxiosResponse<any>>('http://localhost:3001/routes/delete-post', requestBody)
      .then((response: AxiosResponse<any>) => {
        // Handle the successful response here
        console.log('Response:', response.data);
      })
      .catch((error: AxiosError) => {
        // Handle errors here
        console.error('Error:', error.message);
      });
  }
  return (!(viz ^ viza) ?
    <div className='h-44 w-96 bg-slate-700 z-10 absolute rounded-3xl left-1/3 top-1/3 bg-opacity-50'>
      {id}
      <div className='text-white bold text-4xl float-right'  >
        <Image src={delet} height={25} width={25} alt='bin' onClick={() => { setViza(prevviza => !prevviza) }} />

      </div>
      <div className='absolute top-1/3 left-1/4  text-2xl'>
        Delete this post?
      </div>
      <button className='clear-both absolute left-1/4 top-2/3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={deletepost}>


        Delete
      </button>
      <button className='clear-both absolute right-1/4 top-2/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        onClick={() => { setViza(prevviza => !prevviza) }}
      >


        Cancel
      </button>
    </div> : ""
  )
}

export default DeleteDialog
