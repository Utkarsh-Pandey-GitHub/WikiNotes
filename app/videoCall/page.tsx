

"use client"


import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { log } from "console";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  })
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      console.log(client)
      //generate a random id 
      const id = crypto.randomUUID();
      // calling a meeting with random id
      console.log("calling meeting")
      const call = client.call('default', id);
      if (!call) throw new Error('failed to create call');
      // time as which meeting started
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      console.log("getting or creating");
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      console.log("meeting created")
      setCallDetails(call);
      if (!values.description) {
        router.push(`/videoCall/${call.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="">
      Some Component
      {/* {client as any} */}
      <br />
      <button onClick={createMeeting}>click to create a meeting</button>
    </div>
  );
}
