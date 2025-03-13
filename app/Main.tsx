import React from 'react'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Catalogs from './Components/Catalogs'
import OurPC from './Components/OurPC'
import Footer from './Components/Footer'
import ComputerSelector from './Components/ComputerSelector'
import Services from './Components/Services'
import Reviews from './Components/Reviews'
import FAQ from './Components/FAQ'
import Contact from './Pages/Contact'
import NewsList from './Components/News'
import DiscountList from './Components/DiscountList'


const Main = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <Catalogs />
        <OurPC />
        <NewsList />
        <DiscountList />
        <ComputerSelector />
        <Services />
        <Reviews />
        <FAQ />
        <Contact />
        <Footer />
    </div>
  )
}

export default Main