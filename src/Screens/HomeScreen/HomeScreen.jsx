import React, { useEffect } from 'react';
import axios from 'axios';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import ProductsSlider from './Components/ProductsSlider';
import FirstSection from './Components/FirstSection';



function HomeScreen() {

  const { isAuthenticated, isSeller, isApprovedSeller ,loading } = useCheckAuthentication();

  return (

    <>
     <Navbar />
     <FirstSection />
    </>

  )

}

export default HomeScreen