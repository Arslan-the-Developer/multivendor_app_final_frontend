import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';


function TrendingProductsSlider() {
  const [products, setProducts] = useState([]);

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
    <section className="w-full flex items-center justify-center mt-2 px-2">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        autoplay={{ delay: 3000 }}
        className="w-full h-70"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
          // when window width is >= 1280px
          1280: {
            slidesPerView: 5,
          },
        }}
      >
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>
                  
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>

                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center">
              <div className="w-[240px] bg-white rounded-sm shadow-sm">
                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain"
                    src={
                      'https://games4u.pk/cdn/shop/files/tfygv.jpg?v=1726053133'
                    }
                    alt={'Product Image'}
                  />
                </div>
                <div className="w-full flex flex-col font-product items-center justify-center p-2">

                  <h3 className="font-semibold">Space Earbuds</h3>

                  <p className="text-sm text-primary my-1">- Tech Mania -</p>

                  <h3>150 Sold This Week</h3>

                </div>
              </div>
            </SwiperSlide>
            
      </Swiper>
    </section>
  );
}

export default TrendingProductsSlider;
