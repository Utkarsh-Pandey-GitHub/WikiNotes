
import { currentUser } from '@clerk/nextjs'
import { useMyContext } from '../../../components/Context'


async function Page() {
  
  return (
    <div className={` h-screen m-10 px-10 py-16`}>
      <h1 className='text-7xl p-2'>Onboarding</h1>
      <div className='mx-4 p-2'>welcome to notemon just few more steps before </div>
      
    </div>
  )
}

export default Page
