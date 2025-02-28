import React from 'react'
import Navbar from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import { Ripple } from './magicui/ripple'

const Layout = ({children}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark" 

  return (
    <div className={`${isDark? "bg-black": "bg-white"}`}>
      <Navbar/>
        <main className='mx-auto min-h-screen container px-5 py-10'>
          <Ripple className="overflow-hidden" />
          {children}
        </main>
        <footer className='border-t backdrop-blur py-8 supports-[backdrop-filter]:bg-background/60'>
            <div className='container mx-auto px-4 text-center'>
                <h2> Made by Akash Panchal</h2>
            </div>
        </footer>
    </div>
  )
}

export default Layout