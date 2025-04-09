import React from 'react'
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


function FirstSection() {

  const swiper = useSwiper();


  return (


    <section className='flex items-center justify-center h-[25vh] p-2'>

      <Swiper className='w-full h-full flex items-center justify-center' slidesPerView={1} onSlideChange={() => console.log("Slide Changed")} onSwiper={(swiper) => console.log(swiper)} autoplay={{delay : 2500}} spaceBetween={20}>

        <SwiperSlide className='w-full h-full flex items-center justify-center'>

          <div className='flex flex-col items-center justify-center p-2 w-full h-full rounded-sm bg-[url(https://images.unsplash.com/photo-1516452151280-5aad8c38ec22?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover'>

            <div className='w-full h-full bg-[#ffffffd9] rounded-sm flex flex-col items-center justify-start'>

              <h3 className='font-product mt-4 font-extrabold tracking-wider'>Winter Season Is In</h3>

              <p className='text-xs w-8/10 font-monty text-center mt-2'>What Suits You This Winter Season? Shop The Latest Fashion Trends For Winter Apparel From Trusted Sellers Across The Nation</p>

              <Link to={'/user-search/winter clothes'} className='px-4 py-1 text-xs mt-4 border-x-1'>Shop Now</Link>

            </div>

          </div>


        </SwiperSlide>
        
        <SwiperSlide className='w-full h-full flex items-center justify-center'>

          <div className='flex flex-col items-center justify-center p-2 w-full h-full rounded-sm bg-[url(https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-center bg-cover'>

            <div className='w-full h-full bg-[#ffffffd9] rounded-sm flex flex-col items-center justify-start'>

              <h3 className='font-product mt-4 font-extrabold tracking-wider'>There's Nothing Like Home</h3>

              <p className='text-xs w-8/10 font-monty text-center mt-2'>Want To Decorate Your Home So That It Will Be A Place Of Peace? Shop The Home Decors To Make Your Home More Beautiful</p>

              <Link to={'/user-search/winter clothes'} className='px-4 py-1 text-xs mt-4 border-x-1'>Shop Now</Link>

            </div>

          </div>


        </SwiperSlide>

      </Swiper>

    </section>

  )

}

export default FirstSection
