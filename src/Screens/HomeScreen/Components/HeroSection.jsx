import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';


function HeroSection() {

  return (

    <section className='w-full h-[65vh] flex flex-col items-center justify-start p-4 max-[1160px]:p-2'>

        <div className='w-full h-5/10 mt-9 max-[1160px]:mt-0 rounded-sm flex items-center justify-between p-1'>

            <motion.div initial={{opacity : 0, y : 40}} animate={{opacity : 1, y : 0, transition : {duration : 0.3}}} className='bg-center bg-cover bg-[url(https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)] h-full p-2 flex flex-col items-center justify-center rounded-md max-[1160px]:w-full w-1/2 mr-1'>

                <motion.div initial={{opacity : 0, scale : 0.9}} animate={{opacity : 1, scale : 1, transition : {delay : 0.3}}} className='w-full h-full bg-[#ffffffbf] rounded-md flex flex-col items-start max-[600px]:items-center justify-center max-[600px]:justify-start px-4 py-3 relative'>
                    
                    <motion.h1 initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0, transition : {delay : 0.5}}} className='font-semibold text-2xl max-[600px]:text-xl font-product mb-2 text-primary tracking-wide'>Winter Season Is In</motion.h1>
                    <motion.p initial={{opacity : 0, x : 20}} animate={{opacity : 1, x : 0, transition : {delay : 0.5}}} className='w-6/10 font-product max-[600px]:text-sm max-[600px]:text-center max-[600px]:w-8/10'>Shop Now, from the Best & Verified Sellers Nationwide & Express Yourself With Your Loved Ones With Latest Fabric Trends</motion.p>

                    <motion.button initial={{opacity : 0, scale : 0.8}} animate={{opacity : 1, scale : 1, transition : {delay : 0.5}}} className='absolute right-8 max-[600px]:right-[50%] max-[600px]:bottom-2 font-product border-y-2 py-2 px-4 flex items-center justify-center transition-all hover:py-3 hover:text-primary hover:border-primary'>
                        <Link>
                            Shop Now
                        </Link>
                    </motion.button>

                </motion.div>

            </motion.div>

            
            <motion.div initial={{opacity : 0, y : 40}} animate={{opacity : 1, y : 0, transition : {duration : 0.5}}} className='bg-center bg-cover bg-[url(https://www.leadingauthorities.com/sites/default/files/2021-10/trending-topics-for-2022-blog.png)] h-full p-2 flex flex-col items-center justify-center rounded-md max-[1160px]:hidden w-1/2 ml-1'>

                <motion.div initial={{opacity : 0, scale : 0.9}} animate={{opacity : 1, scale : 1, transition : {delay : 0.5}}} className='w-full h-full bg-[#ffffffbf] rounded-md flex flex-col items-start justify-center px-4 relative'>
                    
                    <motion.h1 initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0, transition : {delay : 0.8}}} className='font-semibold text-2xl font-product mb-2 text-primary tracking-wide'>Trending & Best Selling</motion.h1>
                    <motion.p initial={{opacity : 0, x : 20}} animate={{opacity : 1, x : 0, transition : {delay : 0.8}}} className='w-6/10 font-product'>Shop The Trending & Best Selling Products & Match Your Vibe With The Latest Trends and Buy The Best Products From Community</motion.p>

                    <motion.button initial={{opacity : 0, scale : 0.8}} animate={{opacity : 1, scale : 1, transition : {delay : 0.8}}} className='absolute right-8 font-product border-y-2 py-2 px-4 flex items-center justify-center transition-all hover:py-3 hover:text-primary hover:border-primary'>
                        <Link>
                            Shop Now
                        </Link>
                    </motion.button>

                </motion.div>

            </motion.div>

        </div>

    </section>

  )

}


export default HeroSection;