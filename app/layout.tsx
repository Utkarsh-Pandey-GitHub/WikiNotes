import type { Metadata } from 'next'
import { Inter, Ubuntu } from 'next/font/google'

import './globals.css'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { MyContextProvider, useMyContext } from '@/components/Context'

const inter = Inter({ subsets: ['latin'] })
const ubuntu = Ubuntu({weight:"300",subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  openGraph: {
    images:['https://drive.google.com/file/d/1nQHPJllASAen6pJHv0axr9pyBEzZ6G7m/view?usp=sharing']
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

