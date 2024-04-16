import router from '@/backend/routes';
import { CallControls, CallParticipantsList, PaginatedGridLayout, ParticipantView, SfuModels, SpeakerLayout, StreamVideoParticipant, useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function MeetingRoom() {
    const router = useRouter();
    const [layout, setLayout] = useState<'grid' | 'speaker-left' | 'speaker-right'>('grid');

    const { useParticipants } = useCallStateHooks();
    const [participantInSpotlight, ...otherParticipants] = useParticipants();
    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition={"right"} />
            default:
                return <SpeakerLayout participantsBarPosition={"left"} />
        }
    }
    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 '>
            <div className='relative flex size-full items-center justify-center'>
                <div className='flex size-full max-w-[1000px] items-center '>
                    {/* <CallLayout /> */}
                </div>
                <SpeakerLayout/>

                <div className='fixed bottom-0  w-full items-center  gap-5 mx-auto'>
                    <CallControls onLeave={() => {
                        router.push('/')
                    }}
                    />
                </div>

            </div>
        </section>
    )
}

export default MeetingRoom


export const SpeakerView = () => {
  const call = useCall();
  const { useParticipants } = useCallStateHooks();
  const [participantInSpotlight, ...otherParticipants] = useParticipants();

  return (
    // enables the default styling for the video SDK
    <div className="speaker-view">
      {call && otherParticipants.length > 0 && (
        <div className="participants-bar">
          {otherParticipants.map((participant) => (
            <div className="participant-tile" key={participant.sessionId}>
              <ParticipantView participant={participant} />
            </div>
          ))}
        </div>
      )}

      <div className="spotlight">
        {call && participantInSpotlight && (
          <ParticipantView
            participant={participantInSpotlight}
            trackType={
              hasScreenShare(participantInSpotlight)
                ? 'screenShareTrack'
                : 'videoTrack'
            }
          />
        )}
      </div>
    </div>
  );
};

// utility to determine whether the participant in spotlight is sharing their screen
const hasScreenShare = (p: StreamVideoParticipant) =>
  p.publishedTracks.includes(SfuModels.TrackType.SCREEN_SHARE);