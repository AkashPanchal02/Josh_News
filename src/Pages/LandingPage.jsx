import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeProvider'
import { formatDate } from '@/utils/formatDate'
import LoadingSpinner from '@/components/LoadingSpinner'
import { Clock, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { SparklesText } from '@/components/magicui/sparkles-text'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const LandingPage = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [result, setResult] = useState({articles: [] })
    const [loading, setLoading] = useState(true)
    const imagePlaceholder = "https://static.startuptalky.com/2024/09/Top-News-Aggregator-Websites-StartupTalky.jpg"
    const categories = ["general", "business", "entertainment", "science", "sports",  "political", "social", "health", "technology", "international"]

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setResult({articles: []})
            try {                
                const response = await fetch(`https://gnews.io/api/v4/search?q=recent&lang=in&country=in&max=10&apikey=${import.meta.env.VITE_GNEWSAPI_KEY}`)
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
    <div>
        <section className={`conatiner ${isDark? "bg-black": "bg-white"}  py-40 text-center`}>
            <div className="heading ">
                <SparklesText text="Stay informed with FlashFeed" /> 
            </div>
            <div className="para">
                <p className={`text-xl md:text-xl max-w-xl py-5 mx-auto ${isDark ? "text-blue-100" : "text-black"}  mb-8`}> Your trusted source for breaking news, in-depth analysis, and the stories that matter most.</p>
            </div>
            <div className="">
                <div className="relative search max-w-2xl text-center mx-auto">
                    <Search className="absolute right-4 top-3 h-5 w-5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search for news..."
                        className="w-full px-5 py-3 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </section>


        <div className="explore-new-categories">
            <div className="heading text text-center mb-12">
            <SparklesText className="sm:pt-32 pt-16" text="Explore News Categories" />   
                <p className='py-5 text-xl mx-auto max-w-4xl'>Dive into the topics that matter most to you. From business and technology to entertainment and sports.</p>
            </div>
            <div className="category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                    <Link
                        className={` ${isDark? "text-white bg-black shadow-gray-800": "text-black bg-white"} border rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group capitalize`}
                        key={category}
                        to={`/news/${category}`}
                    >
                        <div className={`${isDark? "text-white bg-black": "text-black bg-white"}`}>
                            {category}
                        </div>
                    </Link>
                    
                ))}
                
            </div>
        </div>

        <div className="recent-headlines">
            <div className='container mx-auto'>
                <SparklesText text="Recent Headlines" className='font-bold text-center text-4xl sm:text-6xl py-9 capitalize mt-24 mb-8'/>

                {loading && <LoadingSpinner/>}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {result.articles?.filter(({image}) => image)?.map(({ title, source, description, url, image, publishedAt }) => (
                        <Card className="relative flex flex-col" key={url}>
                            <CardHeader>
                                <img 
                                    className="w-full h-52 object-cover rounded-t-lg" 
                                    src={image || imagePlaceholder} 
                                    alt="" 
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
        </div>
    </div>
  )
}

export default LandingPage
