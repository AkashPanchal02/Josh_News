import React from 'react'
import { TbBrandFacebook, TbBrandInstagram, TbBrandX } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useTheme } from '@/context/ThemeProvider'


const Footer = () => {
    const { theme } = useTheme()
    const isDark = theme === "dark" 

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                <div className='container mx-auto flex flex-col gap-5 px-11 items-start'>
                    <Link to="/"> <img src={isDark? "/logo-dark.png": "/logo-light.png"} alt="Logo" width={'100'} /> </Link>
                    <p className='font-sans text-start'>
                        Stay informed with Josh News – delivering accurate, insightful, and real-time updates on global events, politics, business, and technology.
                    </p>
                </div>

                <div className='container mx-auto flex flex-col gap-5 py-5 sm:py-11 px-11'>
                    <h1 className='text-3xl font-sans font-bold'>Follow us on</h1>
                    <ul className='flex gap-1 py-3 text-4xl'>
                        <li> <TbBrandInstagram/></li>
                        <li> <TbBrandFacebook/></li>
                        <li> <TbBrandX/></li>
                    </ul>
                </div>

                <div className='flex flex-col gap-5 container mx-auto py-5 sm:py-11 px-11'>
                    <h1 className='text-3xl font-sans font-bold'> Categories </h1>
                    <ul className='py-3'>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/general"> <li> - General </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/business"> <li> - Business </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/entertainment"> <li> - Entertainment </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/science"> <li> - Science </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/sports"> <li> - Sports </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/political"> <li> - Political </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/social"> <li> - Social </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/health"> <li> - Health </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/technology"> <li> - Technology </li> </Link>
                        <Link className={`${isDark? "text-gray-400 hover:text-white" :"text-gray-600 hover:text-black"} `} to="/news/international"> <li> - International </li> </Link>
                    </ul>
                </div>

                <div className='flex flex-col gap-5 container mx-auto py-5 sm:py-11 px-11'>
                    <h1 className='text-3xl font-sans font-bold'> Get in Touch  </h1>
                    <p> Email: akashpanchal02088@gmail.com</p>
                </div>                    
                </div>

                <div className='border-t pt-8 flex items-center'> 
                    <div className='container mx-auto px-4 text-center'>
                        <h2> {`Made with ${isDark? "🤍" : "🖤"} by Akash Panchal © All rights reserved 2025`} </h2>
                    </div>
            </div>
        </>
    )
}

export default Footer
