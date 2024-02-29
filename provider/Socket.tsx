"use client"
import { createContext, useMemo } from "react";
import { io } from "socket.io-client";
import React from 'react'

export const SocketContext = createContext(null)


const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://wikinotes-backend.onrender.com'
  : 'http://localhost:3004';


export const useSocket = () => {
    return React.useContext(SocketContext)
}
export function SocketProvider({children}: {children: React.ReactNode}) {
    const Socket=useMemo(() => {
      
      
        return io(baseURL)
    }, [])
  return (
    <SocketContext.Provider value={Socket as any}>
      {children}
    </SocketContext.Provider>
  )
}


