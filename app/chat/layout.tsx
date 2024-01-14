import type { Metadata } from 'next'
import { Inter, Ubuntu } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const ubuntu = Ubuntu({weight:"300",subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (

    
      <html lang="en">
        <body className={`${ubuntu.className}`}>
          
            {children}
        </body>
      </html>
    

  )
}

