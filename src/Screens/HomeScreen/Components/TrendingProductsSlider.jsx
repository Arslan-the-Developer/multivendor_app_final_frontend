import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';


function TrendingProductsSlider() {
  const [products, setProducts] = useState([]);

  const sampleproducts = [
    // Replace with your actual product data
    { id: 1, name: 'Product 1', price: 99.99, vendor: 'Vendor 1', image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Product 2', price: 149.99, vendor: 'Vendor 2', image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Product 3', price: 199.99, vendor: 'Vendor 3', image: 'https://via.placeholder.com/300' },
    { id: 4, name: 'Product 4', price: 79.99, vendor: 'Vendor 4', image: 'https://via.placeholder.com/300' },
    { id: 5, name: 'Product 5', price: 299.99, vendor: 'Vendor 5', image: 'https://via.placeholder.com/300' },
  ];

  useEffect(() => {
    async function GetTrendingProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get_all_products/`,
          { withCredentials: true }
        );
        setProducts(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    GetTrendingProducts();
  }, []);

  return (
    <section className="w-full h-70 flex items-center justify-center mt-2 px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        autoplay={{ delay: 5000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="relative h-full mt-2"
      >
        {sampleproducts.map((product) => (
          <SwiperSlide key={product.id} className='h-full w-full'>

            <div className="h-full group bg-white rounded-sm shadow-sm overflow-hidden">

              <div className='w-full h-6/10 flex items-center justify-center overflow-hidden'>

                <img className='w-full h-full object-center object-contain' src="https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133" alt="" />

              </div>
              
              <div className='w-full h-6/10 flex flex-col items-center justify-start font-product'>

                <h2 className='font-semibold mt-3'>Space Earbuds</h2>

                <h5 className='my-1 text-sm text-primary'>- Tech Mania -</h5>

                <p>150 Sold This Week</p>

              </div>
              
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingProductsSlider;
