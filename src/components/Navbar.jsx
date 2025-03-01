import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeProvider'
import { Moon, Sun, Menu, X} from 'lucide-react'
import { Button } from './ui/button'

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const isDark = theme === "dark"
    const categories = ["general", "political", "social", "health", "international"]
    const location = useLocation()

    return (
        <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60 sm:px-16 bg-black px-5 h-[80px] flex items-center justify-between'>
            <div className="img">
                <Link to="/"> <img src="/logo1.png" alt="Logo" width={'120'} /> </Link>
            </div>

            <div className={`md:hidden cursor-pointer`} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className={`w-7 h-7 ${isDark? "text-white" : "text-black"}`} /> : <Menu className={`w-7 h-7 ${isDark? "text-white" : "text-black"}`} />}
            </div>

            <div className='flex justify-between gap-12'>
                <div className={`md:flex md:gap-12 absolute md:static top-20 right-0 w-full md:w-auto ${isDark? "bg-black": "bg-white"} md:bg-transparent p-5 md:p-0 ${menuOpen ? "block" : "hidden"}`}>
                    <ul className="flex flex-col md:flex-row justify-end gap-2 cursor-pointer">
                        {categories.map((category) => (
                            <Button 
                                key={category} 
                                variant={`${isDark? "dark" : "light"}`}
                                className={`${isDark? "hover:bg-white hover:text-black": "hover:bg-black hover:text-white"} ${location.pathname.includes(category)? `${isDark? "bg-white text-black": "bg-black text-white"}`: ""}`}
                            >
                                <Link 
                                    className="capitalize text-base" 
                                    to={`/news/${category}`} 
                                    onClick={() => setMenuOpen(false)}
                                > 
                                    {category} 
                                </Link>
                            </Button>
                        ))}
                    </ul>
                </div>

                <div 
                    className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180": "rotate-0"}`}
                    onClick={() => setTheme(isDark? "light" : "dark")}
                >
                    {
                        isDark ? (
                            <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all'/>
                        ) : (
                            <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all'/>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
