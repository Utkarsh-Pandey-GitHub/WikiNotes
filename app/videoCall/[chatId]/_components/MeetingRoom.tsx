import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

function MeetingRoom() {
    const [layout,setLayout] = useState<'grid'|'speaker-left'|'speaker-right'>('grid');
    const [showParticipants,setShowParticipants] = useState<boolean>(false); 
    const CallLayout =()=>{
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={"right"}/>
            default:
                return <SpeakerLayout participantsBarPosition={"left"}/>
        }
    }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 '>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center '>
            <CallLayout/>
        </div>
        <div className={`h-calc(100vh-86px) ${showParticipants?"block":"hidden"} ml-2`}>
            <CallParticipantsList onClose={()=>{
                setShowParticipants(false);
            }} />
        </div>
        <div className='fixed bottom-0 flex w-full items-center justify gap-5'>
            <CallControls/>
        </div>
        <button onClick={()=>{setShowParticipants(prev=>!prev)}} className='text-black'>click</button>
      </div>
    </section>
  )
}

export default MeetingRoom
