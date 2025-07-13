import React, { useEffect } from 'react';
import axios from 'axios';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import FirstSection from './Components/FirstSection';
import CategoriesSection from './Components/CategoriesSection';
import TrendingProductsSlider from './Components/TrendingProductsSlider';
import TrustSection from './Components/TrustSection';
import ShopBySellersSection from './Components/ShopBySellersSection';
import Footer from '../../Components/Footer';



function HomeScreen() {

  const { isAuthenticated, isSeller, isApprovedSeller ,loading } = useCheckAuthentication();

  return (

    <>
     <Navbar />
     <FirstSection />
     <CategoriesSection />
     <TrendingProductsSlider />
     <TrustSection />
     <ShopBySellersSection />
     <Footer />
    </>

  )

}

export default HomeScreen