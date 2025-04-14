import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';


function ShopBySellersSection() {

  const allCategories = [
    {id : 1, name : "Electronics", image : "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Electronics"},
    {id : 2, name : "Fashion & Clothing", image : "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Fashion & Clothing"},
    {id : 3, name : "Beauty & Personal Care", image : "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Beauty & Personal Care"},
    {id : 4, name : "Home & Kitchen", image : "https://images.unsplash.com/photo-1738484708927-c1f45df0b56e?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Home & Kitchen"},
    {id : 5, name : "Health & Wellness", image : "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Health & Wellness"},
    {id : 6, name : "Toys & Games", image : "https://images.unsplash.com/photo-1532330393533-443990a51d10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Toys & Games"},
    {id : 7, name : "Automotive", image : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Automotive"},
    {id : 8, name : "Office Supplies", image : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Office Supplies"},
    {id : 9, name : "Sports & Outdoors", image : "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Sports & Outdoors"},
    {id : 10, name : "Books & Stationery", image : "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Books & Stationery"},
    {id : 11, name : "Jewelery & Accessories", image : "https://images.unsplash.com/photo-1611598935678-c88dca238fce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Jewelery & Accessories"},
    {id : 12, name : "Grocery & Food", image : "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Grocery & Food"},
    {id : 13, name : "Baby Products", image : "https://images.unsplash.com/photo-1664849079284-a1e098364d8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Baby Products"},
    {id : 14, name : "Furniture & Decor", image : "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Furniture & Decor"},
    {id : 15, name : "Pet Supplies", image : "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", link : "/shop-by-seller/Pet Supplies"},

  ]


  return (

    <section className='w-full h-60 flex flex-col items-center justify-center -mt-5 max-sm:-mt-3 px-2'>

      <h1 className='font-product text-xl font-semibold text-green-800 tracking-wider max-sm:text-base'>Shop Categories By Sellers</h1>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="relative h-full w-full mt-4 max-sm:mt-4"
      >
        {allCategories.map((category) => (
          <SwiperSlide key={category.id} className='h-full group'>

            <Link to={`${category.link}`} className='flex flex-col items-center justify-start h-full'>

              <motion.div initial={{opacity : 0, y : 15}} animate={{y : 0, opacity : 1}} transition={{duration : 0.5}} className="h-8/10 w-full rounded-md overflow-hidden group bg-white shadow-sm transition-all">

                <div className='w-full h-full flex items-center justify-center'>

                  <img className='w-full h-full object-center object-cover group-hover:scale-105 transition-all' src={category.image} alt="" />

                </div>
                
              </motion.div>
              
              <h2 className='font-semibold h-2/10 font-product mt-2 tracking-wide transition-all group-hover:text-primary'>{category.name}</h2>
            </Link>

          </SwiperSlide>
        ))}
      </Swiper>


    </section>

  )

}


export default ShopBySellersSection