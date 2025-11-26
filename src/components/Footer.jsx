
import React from 'react'
import { TbBrandFacebook, TbBrandInstagram, TbBrandX } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeProvider'


const Footer = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark" 
    const categories = ["general", "political", "social", "health", "international", "business","entertainment", "science", "sports","technology"]

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div className='container mx-auto flex flex-col gap-5 items-start px-1 py-5 sm:py-11'>
                    <Link to="/"> <img src={isDark? "/logo-dark.png": "/logo-light.png"} alt="Logo" width={'100'} /> </Link>
                    <p className='font-sans text-start max-w-5xl'>
                        Stay informed with Josh News – delivering accurate, insightful, and real-time updates on global events, politics, business, and technology.
                    </p>
                </div>

                <div className='container mx-auto flex flex-col'>
                    <h1 className='text-3xl font-sans font-bold'>Need Help</h1>
                    <ul className='py-10'>
                        {["faq", "contact", "prvacy", "terms"].map((help) => (
                            <Link key={help} className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/"> <li> - {help.charAt(0).toUpperCase() + help.slice(1)} </li> </Link>   
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col gap-5 container mx-auto py-5 sm:py-11 px-1 '>
                    <h1 className='text-3xl font-sans font-bold'> Categories </h1>
                    <ul className='py-3'>
                        {categories.map((category) => (
                            <Link key={category} className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to={`/news/${category}`}> <li> - {category.charAt(0).toUpperCase() + category.slice(1)} </li> </Link>   
                        ))}
                    </ul>
                </div>

                <div className='flex flex-col gap-5 container mx-auto py-5 sm:py-11 px-1'>
                    <h1 className='text-3xl font-sans font-bold'> Get in Touch  </h1>
                    <div>
                        <div>
                            <p> Email: akashpanchal02088@gmail.com</p>
                        </div>
                        <div>
                        <ul className='flex gap-1 py-3 text-4xl'>
                            <li> <TbBrandInstagram/></li>
                            <li> <TbBrandFacebook/></li>
                            <li> <TbBrandX/></li>
                        </ul>  
                        </div>
                    </div>
                </div>   

            </div>

            <div className='border-t pt-8 flex items-center'> 
                <div className='container mx-auto px-4 text-center'>
                    <h2> {`Made with ${isDark? "🤍" : "🖤"} by Akash Panchal © All rights reserved 2025.`} </h2>
                </div>
            </div>
        </>
    )
}

export default Footer
