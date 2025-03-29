import React from 'react'
import { Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import { Navigation } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';


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
        breakpoints={{
            0 : {
                slidesPerView : 2
            },
            768 : {
                slidesPerView : 3
            },
            1024 : {
                slidesPerView : 4
            }
        }}
    >
        <SwiperSlide className='flex items-center justify-center h-full py-1'>
            <motion.div initial={{opacity : 0, x : 30}} animate={{opacity : 1, x : 0 ,transition : {duration : 0.5}}} className='w-full h-full flex items-start justify-start group relative'>
                <Link className='w-full h-full flex items-center justify-start py-4 px-5 rounded-xl bg-white transition-all shadow-lg'> 

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
                        <path d="M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M7.73223 16.2678C8.46447 17 9.64298 17 12 17C12.7898 17 13.4473 17 14 16.9724L16.9724 14C17 13.4473 17 12.7898 17 12C17 9.64298 17 8.46447 16.2678 7.73223C15.5355 7 14.357 7 12 7C9.64298 7 8.46447 7 7.73223 7.73223C7 8.46447 7 9.64298 7 12C7 14.357 7 15.5355 7.73223 16.2678Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className='ml-3 font-product text-xl group-hover:text-primary transition-all max-sm:text-base '>Electronics</h2>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"} className='absolute right-5 transition-all opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden'>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </motion.div>
        </SwiperSlide>

        <SwiperSlide className='flex items-center justify-center h-full py-1'>
            <motion.div initial={{opacity : 0, x : 30}} animate={{opacity : 1, x : 0, transition : {duration : 0.5}}} className='w-full h-full flex items-start justify-start group relative'>
                <Link className='w-full h-full flex items-center justify-start py-4 px-5 rounded-xl bg-white shadow-lg'> 

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
                        <path d="M14 12.6483L16.3708 10.2775C16.6636 9.98469 16.81 9.83827 16.8883 9.68032C17.0372 9.3798 17.0372 9.02696 16.8883 8.72644C16.81 8.56849 16.6636 8.42207 16.3708 8.12923C16.0779 7.83638 15.9315 7.68996 15.7736 7.61169C15.473 7.46277 15.1202 7.46277 14.8197 7.61169C14.6617 7.68996 14.5153 7.83638 14.2225 8.12923L11.8517 10.5M14 12.6483L5.77754 20.8708C5.4847 21.1636 5.33827 21.31 5.18032 21.3883C4.8798 21.5372 4.52696 21.5372 4.22644 21.3883C4.06849 21.31 3.92207 21.1636 3.62923 20.8708C3.33639 20.5779 3.18996 20.4315 3.11169 20.2736C2.96277 19.973 2.96277 19.6202 3.11169 19.3197C3.18996 19.1617 3.33639 19.0153 3.62923 18.7225L11.8517 10.5M14 12.6483L11.8517 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.5 2.5L19.3895 2.79873C19.2445 3.19044 19.172 3.38629 19.0292 3.52917C18.8863 3.67204 18.6904 3.74452 18.2987 3.88946L18 4L18.2987 4.11054C18.6904 4.25548 18.8863 4.32796 19.0292 4.47083C19.172 4.61371 19.2445 4.80956 19.3895 5.20127L19.5 5.5L19.6105 5.20127C19.7555 4.80956 19.828 4.61371 19.9708 4.47083C20.1137 4.32796 20.3096 4.25548 20.7013 4.11054L21 4L20.7013 3.88946C20.3096 3.74452 20.1137 3.67204 19.9708 3.52917C19.828 3.38629 19.7555 3.19044 19.6105 2.79873L19.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M19.5 12.5L19.3895 12.7987C19.2445 13.1904 19.172 13.3863 19.0292 13.5292C18.8863 13.672 18.6904 13.7445 18.2987 13.8895L18 14L18.2987 14.1105C18.6904 14.2555 18.8863 14.328 19.0292 14.4708C19.172 14.6137 19.2445 14.8096 19.3895 15.2013L19.5 15.5L19.6105 15.2013C19.7555 14.8096 19.828 14.6137 19.9708 14.4708C20.1137 14.328 20.3096 14.2555 20.7013 14.1105L21 14L20.7013 13.8895C20.3096 13.7445 20.1137 13.672 19.9708 13.5292C19.828 13.3863 19.7555 13.1904 19.6105 12.7987L19.5 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M10.5 2.5L10.3895 2.79873C10.2445 3.19044 10.172 3.38629 10.0292 3.52917C9.88629 3.67204 9.69044 3.74452 9.29873 3.88946L9 4L9.29873 4.11054C9.69044 4.25548 9.88629 4.32796 10.0292 4.47083C10.172 4.61371 10.2445 4.80956 10.3895 5.20127L10.5 5.5L10.6105 5.20127C10.7555 4.80956 10.828 4.61371 10.9708 4.47083C11.1137 4.32796 11.3096 4.25548 11.7013 4.11054L12 4L11.7013 3.88946C11.3096 3.74452 11.1137 3.67204 10.9708 3.52917C10.828 3.38629 10.7555 3.19044 10.6105 2.79873L10.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>

                    <h2 className='ml-3 font-product text-xl group-hover:text-primary transition-all max-sm:text-base '>Beauty & Care</h2>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"} className='absolute right-5 transition-all opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden'>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </motion.div>
        </SwiperSlide>

        <SwiperSlide className='flex items-center justify-center h-full py-1'>
            <motion.div initial={{opacity : 0, x : 30}} animate={{opacity : 1, x : 0, transition : {duration : 0.5}}} className='w-full h-full flex items-start justify-start group relative'>
                <Link className='w-full h-full flex items-center justify-start py-4 px-5 rounded-xl bg-white shadow-lg'> 

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
                        <path d="M5.5 18V21M18.5 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 2.99994H3V12.9999C3 15.357 3 16.5355 3.82376 17.2677C4.64752 17.9999 5.97335 17.9999 8.625 17.9999H15.375C18.0267 17.9999 19.3525 17.9999 20.1762 17.2677C21 16.5355 21 15.357 21 12.9999V2.99994Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 3H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 10.5L21 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 13.5L10.1554 13.5777C10.5758 13.7879 10.786 13.893 11.0126 13.9465C11.2393 14 11.4743 14 11.9443 14H12.0557C12.5257 14 12.7607 14 12.9874 13.9465C13.214 13.893 13.4242 13.7879 13.8446 13.5777L14 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 6.5L10.1554 6.57771C10.5758 6.7879 10.786 6.893 11.0126 6.9465C11.2393 7 11.4743 7 11.9443 7H12.0557C12.5257 7 12.7607 7 12.9874 6.9465C13.214 6.893 13.4242 6.7879 13.8446 6.57771L14 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                    <h2 className='ml-3 font-product text-xl group-hover:text-primary max-sm:text-base transition-all '>Home & Decor</h2>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"} className='absolute right-5 transition-all opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden'>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </motion.div>
        </SwiperSlide>

        <SwiperSlide className='flex items-center justify-center h-full py-1'>
            <motion.div initial={{opacity : 0, x : 30}} animate={{opacity : 1, x : 0, transition : {duration : 0.5}}} className='w-full h-full flex items-start justify-start group relative'>
                <Link className='w-full h-full flex items-center justify-start py-4 px-5 rounded-xl bg-white shadow-lg'> 

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
                        <path d="M6.37726 16H5.08354C3.22665 16 2.84168 15.6255 3.05142 13.7791L3.41559 10.5731C3.75345 7.59878 4.43808 6.75874 7.23391 5.66482L8.93305 5V2C9.90622 2.31731 10.9677 2.83772 12 2.83772C13.0323 2.83772 14.0938 2.31731 15.067 2V5L16.7661 5.66482C19.5619 6.75874 20.2466 7.59878 20.5844 10.5731L20.9486 13.7791C21.1583 15.6255 20.7734 16 18.9165 16H17.6227" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 5L11.0513 5.68377C11.6671 5.88904 12.3329 5.88904 12.9487 5.68377L15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M6.9642 10L6.50433 20.9584C6.4681 21.8215 6.64698 22 7.51062 22H16.4894C17.353 22 17.5319 21.8215 17.4957 20.9584L17.0358 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 13L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M12 9H13M12 11.5H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    <h2 className='ml-3 font-product text-xl group-hover:text-primary transition-all max-sm:text-base'>Clothing</h2>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"} className='absolute right-5 transition-all opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 max-sm:hidden'>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.5 10.5C9.99153 9.9943 11.2998 8 12 8M14.5 10.5C14.0085 9.9943 12.7002 8 12 8M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </motion.div>
        </SwiperSlide>

    </Swiper>

  )

}


export default CategoriesSlider