"use client"
import { currentUser } from '@clerk/nextjs'
import { useMyContext } from '../../../components/Context'


async function Page() {
  const{myValue,setMyValue}=useMyContext()
  return (
    <div className={` h-screen m-10 px-10 py-16 ${myValue?"text-white bg-black":""}`}>
      <h1 className='text-7xl p-2'>Onboarding</h1>
      <div className='mx-4 p-2'>welcome to notemon just few more steps before </div>
      <form action="/routes/create_user" method='post'>
        <ul>
          <li>
            <label htmlFor='name'>Enter your name</label>
            <input type="text" id='name' name='name'/>
          </li>
          <li>
            <label htmlFor="username">Enter your user</label>
            <input type="text" id='username' name='username'/>
          </li>
          <button type='submit'>

          </button>
        </ul>
      </form>
      
    </div>
  )
}

export default Page
