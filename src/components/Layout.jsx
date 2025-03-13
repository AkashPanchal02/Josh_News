import React from 'react'
import Navbar from './Navbar'
import { useTheme } from '@/context/ThemeProvider'
import { Ripple } from './magicui/ripple'
import Footer from './Footer'


const Layout = ({children}) => {
  const { theme } = useTheme()
  const isDark = theme === "dark" 

  return (
    <div className={`${isDark? "bg-black": "bg-white"}`}>
      <Navbar/>
        <main className='mx-auto min-h-screen container my-10'>
          <Ripple className="overflow-hidden invisible md:visible" />
          {children}
        </main>
        <footer className='px-5 border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60'>
          <Footer />
        </footer>
    </div>
  )
}

export default Layout