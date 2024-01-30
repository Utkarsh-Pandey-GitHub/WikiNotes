import type { Metadata } from 'next'
import { Inter, Ubuntu } from 'next/font/google'

import './globals.css'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { MyContextProvider, useMyContext } from '@/components/Context'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })
const ubuntu = Ubuntu({weight:"300",subsets: ['latin']})

export const metadata: Metadata = {
  title: 'wikinotes',
  description: 'Make notes and share them with your friends',
  openGraph: {
    images:[{
      url:'/thumbnail.png',
      width:800,
      height:600,
    }]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

    <ClerkProvider>
      <html lang="en">
        
        <body className={`${ubuntu.className}`}>
          <SignedIn>
            {children}
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </body>
      </html>
    </ClerkProvider> 

  )
}

