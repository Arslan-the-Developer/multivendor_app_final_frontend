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

        <Swiper className='w-full relative flex items-center justify-center h-70' slidesPerView={2} spaceBetween={15} breakpoints={{1024 : {slidesPerView : 5, spaceBetween : 5}, 960 : {slidesPerView : 4}, 640 : {slidesPerView : 3}}}>

            <SwiperSlide className='flex items-center justify-center'>

                <div className='w-full h-full flex flex-col items-center justify-center bg-white rounded-sm overflow-hidden p-2 font-product' style={{minWidth : "240px", maxWidth : "240px"}}>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" className='w-full h-full object-center object-contain' alt="" />

                    </div>

                    <div className='w-full h-4/10 flex flex-col items-center justify-start py-2 font-semibold tracking-wide'>

                        <h2 className='mt-2'>Space Earbuds</h2>

                        <Link className='text-sm text-primary my-1'>- Tech Mania -</Link>

                        <p className='text-sm mt-1'>150 Sold This Week</p>

                    </div>

                </div>

            </SwiperSlide>
            
            <SwiperSlide className='flex items-center justify-center'>

                <div className='w-full h-full flex flex-col items-center justify-center bg-white rounded-sm overflow-hidden p-2 font-product' style={{minWidth : "240px", maxWidth : "240px"}}>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" className='w-full h-full object-center object-contain' alt="" />

                    </div>

                    <div className='w-full h-4/10 flex flex-col items-center justify-start py-2 font-semibold tracking-wide'>

                        <h2 className='mt-2'>Space Earbuds</h2>

                        <Link className='text-sm text-primary my-1'>- Tech Mania -</Link>

                        <p className='text-sm mt-1'>150 Sold This Week</p>

                    </div>

                </div>

            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center'>

                <div className='w-full h-full flex flex-col items-center justify-center bg-white rounded-sm overflow-hidden p-2 font-product' style={{minWidth : "240px", maxWidth : "240px"}}>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" className='w-full h-full object-center object-contain' alt="" />

                    </div>

                    <div className='w-full h-4/10 flex flex-col items-center justify-start py-2 font-semibold tracking-wide'>

                        <h2 className='mt-2'>Space Earbuds</h2>

                        <Link className='text-sm text-primary my-1'>- Tech Mania -</Link>

                        <p className='text-sm mt-1'>150 Sold This Week</p>

                    </div>

                </div>

            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center'>

                <div className='w-full h-full flex flex-col items-center justify-center bg-white rounded-sm overflow-hidden p-2 font-product' style={{minWidth : "240px", maxWidth : "240px"}}>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" className='w-full h-full object-center object-contain' alt="" />

                    </div>

                    <div className='w-full h-4/10 flex flex-col items-center justify-start py-2 font-semibold tracking-wide'>

                        <h2 className='mt-2'>Space Earbuds</h2>

                        <Link className='text-sm text-primary my-1'>- Tech Mania -</Link>

                        <p className='text-sm mt-1'>150 Sold This Week</p>

                    </div>

                </div>

            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center'>

                <div className='w-full h-full flex flex-col items-center justify-center bg-white rounded-sm overflow-hidden p-2 font-product' style={{minWidth : "240px", maxWidth : "240px"}}>

                    <div className='w-full h-6/10 flex items-center justify-center'>

                        <img src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" className='w-full h-full object-center object-contain' alt="" />

                    </div>

                    <div className='w-full h-4/10 flex flex-col items-center justify-start py-2 font-semibold tracking-wide'>

                        <h2 className='mt-2'>Space Earbuds</h2>

                        <Link className='text-sm text-primary my-1'>- Tech Mania -</Link>

                        <p className='text-sm mt-1'>150 Sold This Week</p>

                    </div>

                </div>

            </SwiperSlide>



        </Swiper>

    </section>

  )

}


export default TrendingProductsSlider