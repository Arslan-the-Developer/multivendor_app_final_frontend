import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import axios from 'axios';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';


function TrendingProductsSlider() {

    const swiper = useSwiper();
    const [products, setProducts] = useState([]);


    async function GetTrendingProducts() {

        try{

            const response = await axios({
                method : "get",
                url : `${import.meta.env.VITE_API_URL}/api/get_all_products/`,
                withCredentials : true,
            });

            setProducts(response.data.results);
            console.log(response.data.results);

        } catch(error){

            console.log(error);
            
        }
        
    }

    useEffect(() => {

        GetTrendingProducts();

    })

  return (

    <section className='w-full flex items-center justify-center mt-2 px-2'>

        <Swiper className='w-full relative flex items-center justify-center h-70' slidesPerView={2} spaceBetween={15} breakpoints={{480 : {slidesPerView : 1}, 640 : {slidesPerView : 2}, 960 : {slidesPerView : 3}, 1024 : {slidesPerView : 4}, 1180 : {slidesPerView : 5}}}>

            <SwiperSlide className='w-full h-full bg-white rounded-sm shadow-sm'>

                <div className='w-full h-full flex flex-col items-center justify-start'>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img className='w-full h-full object-center object-contain' src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" alt="" />

                    </div>
                    
                    <div className='w-full h-4/10 flex flex-col font-product items-center justify-center' style={{minWidth : "240px"}}>

                        <h3 className='font-semibold'>Space Earbuds</h3>

                        <p className='text-sm text-primary my-1'>- Tech Mania -</p>

                        <h3>150 Sold This Week</h3>

                    </div>

                </div>

            </SwiperSlide>

        </Swiper>

    </section>

  )

}


export default TrendingProductsSlider