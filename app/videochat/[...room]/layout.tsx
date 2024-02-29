
import type { Metadata } from 'next'
import { Inter, Ubuntu } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const ubuntu = Ubuntu({ weight: "300", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Video Chat',
  description: 'video chat with your friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (


    <html lang="en">
      <body className={`${ubuntu.className} bg-black`}>
        
          {children}
        
      </body>
    </html>


  )
}

