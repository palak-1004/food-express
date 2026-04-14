import Categories from '../component/Categories';
import CTA from '../component/CTA';
import Footer from '../component/Footer';
import Hero from '../component/Hero';
import Navbar from '../component/Navbar';
import Resto from '../component/Resto';
import '../styles/home.css';
import { useEffect, useState } from 'react';
import { getRestaurantsWithFoods } from '../services/restaurantsService';


type Food = {
    name: string
    price: number
}

type Restaurant = {
    id: string
    name: string
    location: string
    foods: Food[]
}


export default function Home() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRestaurantsWithFoods()
            setRestaurants(data)
        }

        fetchData()
    }, [])
    return (

        <div className="home-container">

            <Navbar />
            <Hero />
            <Categories />
            <Resto restaurants={restaurants} />
            <CTA />
            <Footer />
        </div>
    )
}