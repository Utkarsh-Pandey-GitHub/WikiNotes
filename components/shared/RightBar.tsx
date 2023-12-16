import React from 'react'
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useMyContext } from '../Context';
import { dark } from '@clerk/themes';


function RightBar() {
  const { myValue, setMyValue } = useMyContext()
  let u;

  const toggleDark=(event: { preventDefault: () => void; })=>{
    event.preventDefault();

    setMyValue((prev: any)=>!prev)
  }
  return (
    <div className={`bg-opacity-10 border-l-slate-300 border-l-2 pt-52 lg:block hidden px-10 h-screen ${myValue&&"text-white"}`} >
        <UserButton appearance={myValue?dark:u}/>
        
        <SignOutButton />
        <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={()=>{setMyValue((prevmyValue: any)=>!prevmyValue)}}
                checked={myValue}
                
              />

              <div className=" w-3/4 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600
              
              "></div>
              <span className={`ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 ${myValue&&"text-white"}`}>Dark Mode</span>
            </label>
    </div>
  )
}

export default RightBar
