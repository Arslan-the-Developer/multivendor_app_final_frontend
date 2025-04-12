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
    <section className="w-full h-70 flex items-center relative justify-center mt-1 px-2 max-sm:px-18">

      <button id='back_button' className='absolute left-8 max-sm:flex hidden'>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12L16 12M8 12C8 11.2998 9.9943 9.99153 10.5 9.5M8 12C8 12.7002 9.9943 14.0085 10.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </button>
      
      <button id='next_button' className='absolute right-8 max-sm:flex hidden'>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} color={"#006964"} fill={"none"}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 12L8 12M16 12C16 12.7002 14.0057 14.0085 13.5 14.5M16 12C16 11.2998 14.0057 9.99153 13.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </button>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{nextEl : "#next_button", prevEl : "#back_button"}}
        spaceBetween={10}
        slidesPerView={1}
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
