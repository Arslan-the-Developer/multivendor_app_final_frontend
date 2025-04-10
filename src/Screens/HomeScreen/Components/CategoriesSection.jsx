import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'



function CategoriesSection() {

  return (

    <section className='w-full grid grid-cols-4 max-[950px]:grid-cols-2 gap-4 p-2 max-[950px]:gap-2'>

        <Link to={'/electronics/sub-categories'}>
            <motion.div initial={{ opacity : 0, y : 30 }} animate={{ opacity : 1, y : 0 }} className='h-20 w-full bg-white rounded-sm shadow-sm flex items-center justify-center relative overflow-hidden p-5 font-product group transition-all'>

                <h3 className='font-semibold tracking-wider text-primary max-sm:text-sm'>Electronics</h3>

                <span className='absolute right-2 bottom-2 scale-300 group-hover:scale-250 max-sm:scale-200 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:bottom-1 group-hover:right-1  duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/chip-stroke-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                        <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M16 7H8C7.44772 7 7 7.44772 7 8V16C7 16.5523 7.44771 17 8 17H13.808C14.0732 17 14.3276 16.8946 14.5151 16.7071L16.7071 14.5151C16.8946 14.3276 17 14.0732 17 13.808V8C17 7.44772 16.5523 7 16 7Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <span className='absolute left-2 top-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:left-1 group-hover:top-1  duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/chip-stroke-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                        <path d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M16 7H8C7.44772 7 7 7.44772 7 8V16C7 16.5523 7.44771 17 8 17H13.808C14.0732 17 14.3276 16.8946 14.5151 16.7071L16.7071 14.5151C16.8946 14.3276 17 14.0732 17 13.808V8C17 7.44772 16.5523 7 16 7Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M8 2V4M16 2V4M12 2V4M8 20V22M12 20V22M16 20V22M22 16H20M4 8H2M4 16H2M4 12H2M22 8H20M22 12H20" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>


            </motion.div>
        </Link>

        <Link to={`/Home & Kitchen/sub-categories`}>

            <motion.div initial={{ opacity : 0, y : 30 }} animate={{ opacity : 1, y : 0}} transition={{delay : 0.1}} className='h-20 w-full bg-white rounded-sm shadow-sm flex items-center justify-center relative overflow-hidden p-5 font-product group transition-all'>

                <h3 className='font-semibold tracking-wider text-primary max-sm:text-sm'>Home & Kitchen</h3>

                <span className='absolute right-2 bottom-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:bottom-1 group-hover:right-1  duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/cabinet-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                        <path d="M5.5 18.5V21.5M18.5 18.5V21.5" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M3 18.5V2.5H21V18.5H3Z" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M3 10.5L21 10.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10 14.5H14" stroke="#006964" strokeWidth="1.5"></path>
                        <path d="M10 6.5H14" stroke="#006964" strokeWidth="1.5"></path>
                    </svg>
                </span>
                
                <span className='absolute left-2 top-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:top-1 group-hover:left-1  duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/cabinet-03-stroke-sharp.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                        <path d="M5.5 18.5V21.5M18.5 18.5V21.5" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M3 18.5V2.5H21V18.5H3Z" stroke="#006964" strokeWidth="1.5" strokeLinejoin="round"></path>
                        <path d="M3 10.5L21 10.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10 14.5H14" stroke="#006964" strokeWidth="1.5"></path>
                        <path d="M10 6.5H14" stroke="#006964" strokeWidth="1.5"></path>
                    </svg>
                </span>

            </motion.div>

        </Link>

        <Link to={`/Fashion & Clothing/sub-categories`}>

        <motion.div initial={{ opacity : 0, y : 30 }} animate={{ opacity : 1, y : 0}} transition={{delay : 0.2}} className='h-20 w-full bg-white rounded-sm shadow-sm flex items-center justify-center relative overflow-hidden p-5 font-product group transition-all'>

            <h3 className='font-semibold tracking-wider text-primary max-sm:text-sm'>Apparel</h3>

            <span className='absolute right-2 bottom-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:bottom-1 group-hover:right-1  duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/kurta-twotone-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                    <path d="M6.37726 16H5.08354C3.22665 16 2.84168 15.6255 3.05142 13.7791L3.41559 10.5731C3.75345 7.59878 4.43808 6.75874 7.23391 5.66482L8.93305 5V2C9.90622 2.31731 10.9677 2.83772 12 2.83772C13.0323 2.83772 14.0938 2.31731 15.067 2V5L16.7661 5.66482C19.5619 6.75874 20.2466 7.59878 20.5844 10.5731L20.9486 13.7791C21.1583 15.6255 20.7734 16 18.9165 16H17.6227" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9 5L11.0513 5.68377C11.6671 5.88904 12.3329 5.88904 12.9487 5.68377L15 5" stroke="#006964" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M6.9642 10L6.50433 20.9584C6.4681 21.8215 6.64698 22 7.51062 22H16.4894C17.353 22 17.5319 21.8215 17.4957 20.9584L17.0358 10" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path opacity="0.4" d="M12 13L12 6M12 9H13M12 11.5H13" stroke="#006964" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
            </span>
            
            <span className='absolute left-2 top-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:top-1 group-hover:left-1  duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/kurta-twotone-rounded.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                    <path d="M6.37726 16H5.08354C3.22665 16 2.84168 15.6255 3.05142 13.7791L3.41559 10.5731C3.75345 7.59878 4.43808 6.75874 7.23391 5.66482L8.93305 5V2C9.90622 2.31731 10.9677 2.83772 12 2.83772C13.0323 2.83772 14.0938 2.31731 15.067 2V5L16.7661 5.66482C19.5619 6.75874 20.2466 7.59878 20.5844 10.5731L20.9486 13.7791C21.1583 15.6255 20.7734 16 18.9165 16H17.6227" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M9 5L11.0513 5.68377C11.6671 5.88904 12.3329 5.88904 12.9487 5.68377L15 5" stroke="#006964" stroke-width="1.5" stroke-linecap="round"></path>
                    <path d="M6.9642 10L6.50433 20.9584C6.4681 21.8215 6.64698 22 7.51062 22H16.4894C17.353 22 17.5319 21.8215 17.4957 20.9584L17.0358 10" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path opacity="0.4" d="M12 13L12 6M12 9H13M12 11.5H13" stroke="#006964" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
            </span>

        </motion.div>

        </Link>

        <Link to={'/Sports & Outdoors/sub-categories'}>

        <motion.div initial={{ opacity : 0, y : 30 }} animate={{ opacity : 1, y : 0}} transition={{delay : 0.3}} className='h-20 w-full bg-white rounded-sm shadow-sm flex items-center justify-center relative overflow-hidden p-5 font-product group transition-all'>

            <h3 className='font-semibold tracking-wider text-primary max-sm:text-sm'>Sports</h3>

            <span className='absolute right-2 bottom-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:bottom-1 group-hover:right-1  duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11.7077 9.34893C11.882 9.21702 12.118 9.21702 12.2923 9.34893L14.545 11.054C14.7193 11.1859 14.7922 11.4197 14.7256 11.6332L13.8652 14.3921C13.7986 14.6055 13.6077 14.75 13.3923 14.75H10.6077C10.3923 14.75 10.2014 14.6055 10.1348 14.3921L9.27437 11.6332C9.20781 11.4197 9.28073 11.1859 9.45499 11.054L11.7077 9.34893Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 9V5M15 11L19 9.5M14 15L16 18M10 14.5L8 17M9 11.5L5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 2.5L12.0165 4.62241L15 2.5M2 12.7998L5.19655 10.4388L3.55548 6.72045M19.4703 18.8531L15.6158 18.1555L14.2655 22M20.0298 6.19586L18.8035 9.38978L22 11.7507M8.00992 21.4059L8.05142 17.1665L4.00331 17.21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </span>
            
            <span className='absolute left-2 top-2 scale-300 max-sm:scale-200 group-hover:scale-250 max-sm:group-hover:scale-150 opacity-15 transition-all group-hover:opacity-40 group-hover:top-1 group-hover:left-1  duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11.7077 9.34893C11.882 9.21702 12.118 9.21702 12.2923 9.34893L14.545 11.054C14.7193 11.1859 14.7922 11.4197 14.7256 11.6332L13.8652 14.3921C13.7986 14.6055 13.6077 14.75 13.3923 14.75H10.6077C10.3923 14.75 10.2014 14.6055 10.1348 14.3921L9.27437 11.6332C9.20781 11.4197 9.28073 11.1859 9.45499 11.054L11.7077 9.34893Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 9V5M15 11L19 9.5M14 15L16 18M10 14.5L8 17M9 11.5L5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 2.5L12.0165 4.62241L15 2.5M2 12.7998L5.19655 10.4388L3.55548 6.72045M19.4703 18.8531L15.6158 18.1555L14.2655 22M20.0298 6.19586L18.8035 9.38978L22 11.7507M8.00992 21.4059L8.05142 17.1665L4.00331 17.21" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </span>

        </motion.div>

        </Link>

    </section>

  )

}


export default CategoriesSection