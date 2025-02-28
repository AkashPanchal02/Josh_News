import React, { useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'

const Home = () => {

    const [result, setResult] = useState({articles: []})
    const imagePlaceholder = "https://static.startuptalky.com/2024/09/Top-News-Aggregator-Websites-StartupTalky.jpg"
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    
    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=top&apiKey=${import.meta.env.VITE_NEWSAPI_KEY}`)
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`)
                }
                const jsonData = await response.json()
                setResult(jsonData)
            } catch (error) {
                console.log("Error fetching Data", error)
            }
        }
        fetchNews()
    }, [])

    return (
        <div className='container mx-auto'>
            <h1 className='font-bold text-center text-4xl sm:text-6xl py-16'> Recent Headlines </h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {result.articles?.filter(({urlToImage}) => urlToImage)?.map(({ source, description, url, urlToImage }) => (
                    <Card className="flex flex-col" key={url}>
                        <CardHeader>
                            <img 
                                className="w-full h-52 object-cover rounded-t-lg" 
                                src={urlToImage || imagePlaceholder} 
                                alt="" 
                                onError={(e) => {e.target.src = imagePlaceholder}}
                            />
                            <CardTitle className="py-2 text-2xl" > Source - {source.name} </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className={isDark? "text-gray-300": "text-black"}> {description} </p>
                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Link to={url} target='_blank' className='w-full'> 
                                <Button className="w-full uppercase" > Read Full Article  </Button> 
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Home
