import React, { useEffect, useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import LoadingSpinner from '@/components/LoadingSpinner'

const DisplayNews = () => {

    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [result, setResult] = useState({articles: []})
    const [loading, setLoading] = useState(true)
    const imagePlaceholder = "https://static.startuptalky.com/2024/09/Top-News-Aggregator-Websites-StartupTalky.jpg"
    
    useEffect(() => {
        document.title = " International || Josh News" 
    }, [])


    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setResult({articles: []})
            try {
                const response = await fetch(`https://gnews.io/api/v4/search?q=international&lang=en&max=10&apikey=${import.meta.env.VITE_GNEWSAPI_KEY}`)
                
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`)
                }
                const jsonData = await response.json()
                setResult(jsonData)
            } catch (error) {
                console.log("Error fetching Data", error)
            } finally {
                setLoading(false);
            }
        }
        fetchNews()
    }, [])

    return (
        <div className='container mx-auto px-5'>
            <h1 className='font-bold text-center text-4xl sm:text-6xl py-9 capitalize'> International Headlines </h1>
            {loading && <LoadingSpinner/>}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {result.articles?.filter(({image}) => image)?.map(({ title, source, description, url, image, publishedAt }) => (
                    <Card className="relative flex flex-col" key={url}>
                        <CardHeader>
                            <img 
                                className="w-full h-52 object-cover rounded-t-lg" 
                                src={image || imagePlaceholder} 
                                alt="News Image" 
                                onError={(e) => {
                                    e.target.src = imagePlaceholder 
                                    e.target.onError = null;
                                }}
                            />
                            <Badge className="absolute top-[6px] border-none" variant="primary">{source.name}</Badge>

                            <CardTitle className="py-2 text-xl" >
                                {title.split(" ").slice(0, 13).join(" ") + (title.split(" ").length > 12 ? "." : "" )} 
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className={`line-clamp-2 ${isDark? "text-gray-300": "text-gray-700"}`}>
                                {description}
                            </p>
                            <div className={`text-sm ${isDark? "text-gray-300": "text-gray-700"} clock flex items-center gap-2 mt-6`}>
                                <Clock size={'15'} /> <span> {formatDate(publishedAt)} </span>
                            </div>
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

export default DisplayNews
