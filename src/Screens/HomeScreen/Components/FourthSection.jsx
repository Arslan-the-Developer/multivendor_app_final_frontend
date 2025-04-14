import React from 'react'
import Squares from '../../../Components/ReactBitComponents/Squares/Squares'


function FourthSection() {

  return (

    <section className='w-full h-90 flex items-center justify-center -mt-12 relative'>

        <Squares 
        speed={0.5} 
        squareSize={40}
        direction='up'
        borderColor='#006964'
        hoverFillColor='#0079692b'
        />

        <div className='absolute bg-transparent flex flex-col items-center justify-center'>

            <h2 className='font-product font-semibold text-2xl text-primary tracking-wider mt-5 max-md:mt-12 max-sm:text-base'>Nationwide Trusted & Verified Sellers</h2>

            <p className='capitalize w-180 max-sm:text-xs max-md:w-3/4 max-md:leading-5.5 font-semibold text-center font-product mt-3 leading-7 break-words'>Our Platform Supports Local Sellers & Help them to grow their business online Unlike our competitors we charge minimum platform fees & 24/7 support so sellers can easily run their online business & for you we verify them through multiple steps so you can shop without hesitation & conbribute into the world of online shopping & increase the trend of Ecommerce in Pakistan</p>

        </div>

    </section>

  )

}

export default FourthSection