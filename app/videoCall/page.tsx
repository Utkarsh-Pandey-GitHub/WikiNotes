

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
  const joinMeeting = async (fd: FormData) => {
    let id = fd.get('meet');
    if (!id) return;
    router.push(`/videoCall/${id}`)
  }
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
     
      //generate a random id 
      let id = crypto.randomUUID();
      
      // calling a meeting with random id
      console.log("calling meeting")
      const call = client.call('default', id as string);
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
    <div className="bg-slate-900">

      <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="flex flex-col text-white relative px-4 py-10 bg-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="text-center pb-6">
              <h1 className="text-3xl">Video Conferencing!</h1>
              <p className="text-gray-300">
                Enter the meeting id or instantly create a meeting.
              </p>
            </div>
            <form className="flex flex-col" action={joinMeeting}>
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="meeting id"
                name="meet"
              />
              
              <div className="flex justify-between m-10">

                <input
                  className="shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  defaultValue="Send ➤"
                />
                <input
                  className="shadow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                />
              </div>
            </form>
              <button className="mx-auto relative px-6 py-3 font-bold text-white rounded-lg group" onClick={createMeeting}>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                <span className="relative">Create Meeting and Join Instantly</span>
              </button>
          </div>
        </div>
      </div>

    </div>
  );
}
