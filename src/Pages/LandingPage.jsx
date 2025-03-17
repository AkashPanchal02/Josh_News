
import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'
import { formatDate } from '@/utils/formatDate'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShinyButton } from "@/components/magicui/shiny-button"
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { BackgroundBeamsWithCollisionDemo } from '@/components/BackgroundBeams'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import faqs from '../data/faqs.json'


const LandingPage = () => {
    const { theme } = useTheme()
    const navigate = useNavigate(); // Initialize navigation
    const isDark = theme === 'dark'
    const [result, setResult] = useState({articles: [] })
    const [loading, setLoading] = useState(true)
    const imagePlaceholder = "https://static.startuptalky.com/2024/09/Top-News-Aggregator-Websites-StartupTalky.jpg"
    const categories = ["general", "business", "entertainment", "science", "sports",  "political", "social", "health", "technology", "international"]
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        document.title = `Josh News - Fastest News Platform all over the world` 
    }, []) 

        
    const fetchNews = async (query="recent") => {
        setLoading(true)
        setResult({articles: []})
        try {                
            const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&lang=in&country=in&max=10&apikey=${import.meta.env.VITE_GNEWSAPI_KEY}`)
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

    useEffect(() => { fetchNews() }, [])

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        const formattedQuery = searchQuery.toLowerCase()
        navigate(`/news/${formattedQuery}`)
    }

    return (
        <div className=''>
            <section className={`container ${isDark? "bg-black": ""} text-center`}>
                <div className='background-beams'>
                    <BackgroundBeamsWithCollisionDemo />
                </div>


                <div className="search-bar px-5">
                    <div className="relative search max-w-3xl text-center mx-auto">
                        <ShinyButton 
                            className={`absolute bg-black text-white rounded-full top-[6px] right-2`}
                            onClick={handleSearch}
                        > 
                            Search 
                        </ShinyButton>
                        <input
                            type="text"
                            placeholder="Josh News Search..."
                            className="bg-gray-200 w-full px-5 py-3 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSearch()
                            }}
                        />
                    </div>
                </div>
            </section>

            <div className="explore-new-categories my-12 px-5">
                <div className="heading text-center h-full sm:pt-32">
                    <h1 className={`pb-5 sm:pb-9 ${isDark? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-800": "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-800"} bg-clip-text text-transparent text-5xl leading-none py-3 sm:text-[85px] md:text-center  font-extrabold text-left max-w-auto font-sans` }>
                        Explore News Categories
                    </h1> 
                </div>
                <div className="para">
                    <p className={`text-xl mx-auto max-w-4xl md:text-center text-left ${isDark ? "text-blue-100" : "text-black"}`}>
                        Stay ahead with the latest in business, technology, entertainment, and sports. Discover the stories that matter most to you.
                    </p>
                </div>
                <div className="py-16 category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
                    {categories.map((category) => (
                        <Link
                            className=""
                            key={category}
                            to={`/news/${category}`}
                        >
                            <ShimmerButton 
                                shimmerColor="#715BFF"
                                background={`${isDark? "#000": "#fff"}`}
                                className={`overflow-hidden w-full border rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group capitalize`}
                            >
                                <span className={`whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight dark:from-white dark:to-slate-900/10 lg:text-lg ${isDark? "text-white": "text-black"}
                                `}>
                                    {category}
                                </span>
                            </ShimmerButton>
                        </Link>
                        
                    ))}
                    
                </div>
            </div>

            <div className="recent-headlines my-12 px-5">
                <div className='container mx-auto sm:pt-32'>
                    <h1 className={`pb-12 bg-gradient-to-r ${isDark? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-800": "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-800"} bg-clip-text text-transparent text-5xl sm:text-[85px] md:text-center text-left capitalize font-sans font-extrabold`}> Latest News Updates
                    </h1>

                    {loading && <LoadingSpinner/>}
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {result.articles?.filter(({image}) => image)?.map(({ title, source, description, url, image, publishedAt }) => (
                            <Card className="relative flex flex-col" key={url}>
                                <CardHeader>
                                    <img
                                        loading="lazy" 
                                        className="w-full h-52 object-cover rounded-t-lg" 
                                        src={image || imagePlaceholder} 
                                        alt="Latest image" 
                                        onError={(e) => {
                                            e.target.src = imagePlaceholder 
                                            e.target.onError = null;
                                        }}
                                    />
                                    <Badge className="absolute top-[6px] border-none" variant="primary">{source.name}</Badge>

                                    <CardTitle className="py-2 text-xl" >
                                        {title.split(" ").slice(0, 15).join(" ") + (title.split(" ").length > 15 ? "..." : "" )} 
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className={`line-clamp-2 ${isDark? "text-gray-300": "text-gray-700"}`}>
                                        {description}
                                    </p>
                                    <div className={`text-sm ${isDark? "text-gray-300": "text-gray-700"} clock flex items-center gap-2 mt-6`}>
                                        <Clock size={'15'} /> <span> { formatDate(publishedAt) } </span>
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
            </div>


            <div className="recent-headlines my-12 px-5">
                <div className='container mx-auto sm:pt-32 text-center'>
                    <h1 className={`pb-12 bg-gradient-to-r ${isDark? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-800": "bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-800"} bg-clip-text text-transparent text-5xl sm:text-[85px] md:text-center text-left capitalize font-sans font-extrabold`}> 
                        Frequently Asked Questions
                    </h1>
                    
                    <div className="flex justify-center text-xl">
                        <div className='max-w-7xl w-full'>
                            <Accordion type="single" collapsible>
                                {faqs.map(({id, question, answer}) => (
                                    <AccordionItem key={id} value={`item-${id+1}`}>
                                        <AccordionTrigger className="text-lg hover:no-underline"> {`${id}. ${question}`} </AccordionTrigger>
                                        <AccordionContent className="text-start text-lg"> {answer} </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
