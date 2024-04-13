"use client"
import { DeviceSettings, VideoPreview, useCall } from "@stream-io/video-react-sdk"

import {  useEffect, useState } from "react";

//VideoPreview is a component that shows the video preview of the user but nothing unless allowed.
function MeetingSetup({setIsSetupComplete}: {setIsSetupComplete: (value:boolean) => void}){
    const [toggleMicCam, setToggleMicCam] = useState({
        mic: false,
        cam: false
    
    });
    const call = useCall();
    useEffect(() => {
        if(call){
          if(toggleMicCam.cam){
            call.camera.enable();
            
          }
          else{
            call.camera.disable();
            
          }
          if(toggleMicCam.mic){
            call.microphone.enable();
          }
          else{
            call.microphone.disable();
          }
        }
        
    },[toggleMicCam,call])
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white ">
      <h1 className="text-2xl font-bold">Setup</h1>
      {call&&<VideoPreview />}
      <div className="flex gap-3">
        <button onClick={() => setToggleMicCam((prev) => ({...prev, mic: !prev.mic}))} className={`p-2 rounded-md font-bold ${!toggleMicCam.mic ? 'bg-green-500' : 'bg-red-500'}`}>{toggleMicCam.mic ? 'Mute' : 'Unmute'}</button>
        <button onClick={() => setToggleMicCam((prev) => ({...prev, cam: !prev.cam}))} className={`p-2 rounded-md font-bold  ${!toggleMicCam.cam ? 'bg-green-500' : 'bg-red-500'}`}>{toggleMicCam.cam ? 'Stop Video' : 'Start Video'}</button>
        <br />
        <button className="rounded-md font-bold bg-green-500 px-4 py-2.5" onClick={()=>{
          call?.join();
          setIsSetupComplete(true);
        }}>
          Join Meeting
        </button>
          <DeviceSettings/>
        </div>
    </div>
  )
}

export default MeetingSetup
