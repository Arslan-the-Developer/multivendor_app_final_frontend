import React from 'react'
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';


function CategoriesSlider() {

    const swiper = useSwiper();

    
  return (

    <Swiper className='w-full relative flex items-center justify-center h-full p-10'
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        onSlideChange={() => console.log("Slide Changed")}
        onSwiper={(swiper) => console.log(swiper)}
        autoplay={{delay : 2500}}
    >
        <SwiperSlide className='flex items-center justify-center h-full'>
            <Link className='w-full h-full flex items-center justify-start py-4 px-5 rounded-xl bg-white shadow-md'> 

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={45} height={45} color={"#1c1c1c"} fill={"none"}>
                <path d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7.73223 16.2678C8.46447 17 9.64298 17 12 17C12.7898 17 13.4473 17 14 16.9724L16.9724 14C17 13.4473 17 12.7898 17 12C17 9.64298 17 8.46447 16.2678 7.73223C15.5355 7 14.357 7 12 7C9.64298 7 8.46447 7 7.73223 7.73223C7 8.46447 7 9.64298 7 12C7 14.357 7 15.5355 7.73223 16.2678Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h2 className='ml-3 font-product text-xl'>Electronics</h2>

            </Link>
        </SwiperSlide>
        <SwiperSlide className='flex items-center justify-center h-full'>
            <div className='w-full h-full flex items-center justify-center border border-primary'>

                Slide 2

            </div>
        </SwiperSlide>
        <SwiperSlide className='flex items-center justify-center h-full'>
            <div className='w-full h-full flex items-center justify-center border border-primary'>

                Slide 3

            </div>
        </SwiperSlide>
        <SwiperSlide className='flex items-center justify-center h-full'>
            <div className='w-full h-full flex items-center justify-center border border-primary'>

                Slide 4

            </div>
        </SwiperSlide>

    </Swiper>

  )

}


export default CategoriesSlider