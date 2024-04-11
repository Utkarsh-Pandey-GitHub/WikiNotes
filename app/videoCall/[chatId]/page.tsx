"use client"

import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk"
import { useState } from "react";
import MeetingSetup from "./_components/MeetingSetup";
import MeetingRoom from "./_components/MeetingRoom";
import '@stream-io/video-react-sdk/dist/css/styles.css';



function Page({params}: {params:{chatId: any}}) {
  const {user,isLoaded} = useUser();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const {call, isCallLoading} = useGetCallById(params.chatId);
  if (!isLoaded || !user) return <div>Loading...</div>
  
  return (
    <div className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete as any}/>  
          ):(
            <MeetingRoom  />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default Page
