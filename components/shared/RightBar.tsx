import React from 'react'
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useMyContext } from '../Context';
import { dark } from '@clerk/themes';


function RightBar() {
  
  let u;

  const toggleDark=(event: any)=>{
    event.preventDefault();

  }
  return (
    <div className={`bg-opacity-10 border-l-slate-700 border-l-2 pt-52 lg:block hidden px-10 h-screen `} >
        <UserButton />
        
        <SignOutButton />
        
    </div>
  )
}

export default RightBar
