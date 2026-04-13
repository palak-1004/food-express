import Categories from '../component/Categories';
import CTA from '../component/CTA';
import Footer from '../component/Footer';
import Hero from '../component/Hero';
import Navbar from '../component/Navbar';
import Resto from '../component/Resto';
import '../styles/home.css';

export default function Home() {
    return (
        <div className="home-container">
            <Navbar />
            <Hero />
            <Categories />
            <Resto />
            <CTA />
            <Footer />
        </div>
    )
}