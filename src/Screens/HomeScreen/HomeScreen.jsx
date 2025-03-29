import React, { useEffect } from 'react';
import axios from 'axios';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import HeroSection from './Components/HeroSection';
import ProductsSlider from './Components/ProductsSlider';



function HomeScreen() {

  const { isAuthenticated, isSeller, isApprovedSeller ,loading } = useCheckAuthentication();

  return (

    <>
     <Navbar />
     <HeroSection />
     <ProductsSlider />
    </>

  )

}

export default HomeScreen