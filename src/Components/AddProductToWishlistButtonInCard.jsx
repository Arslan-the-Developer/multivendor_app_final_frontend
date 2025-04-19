import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



function AddProductToWishlistButtonInCard({product, AddToWishlistFunction}) {

    const [windowDimensions, setWindowDimensions] = useState({
            width: window.innerWidth,
            height: window.innerHeight,
    });


    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        
        const handleResize = () => {
            setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        console.log(windowDimensions);

    }, []);


  return (

      <button
          onClick={(e) => {
              if (!clicked) {
                  AddToWishlistFunction(e, product.id);
                  setClicked(true);
              }
          }}
          className="w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center"
      >
          {clicked ? (
              <Link to={"/user-wishlist"} className="w-full h-full flex items-center justify-center" title="View In Cart">
                <svg xmlns="http://www.w3.org/2000/svg" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/favourite-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 8.99835C1 5.358 3.3947 1.99998 7.43 1.99998C9.30819 1.99998 10.7026 2.80469 11.75 4.01044C12.7974 2.80469 14.1918 1.99998 16.07 1.99998C20.1053 1.99998 22.5 5.358 22.5 8.99835C22.5 12.16 21.0352 14.697 19.0211 16.7123C17.0165 18.718 14.4321 20.2456 12.0855 21.4194C11.8743 21.525 11.6257 21.525 11.4145 21.4194C9.06793 20.2456 6.48346 18.718 4.47892 16.7123C2.46481 14.697 1 12.16 1 8.99835Z" fill="#006964"></path>
                </svg>
              </Link>
    
          ) : (
    
            <svg xmlns="http://www.w3.org/2000/svg" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/heart-add-stroke-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                <path d="M12 20.9986C7.35839 18.6768 2 15.0599 2 9.24836C2 5.90907 4.16367 3 7.68 3C9.64299 3 11 3.99863 12 5.49863C13 3.99863 14.357 3 16.32 3C19.8363 3 22 5.90907 22 9.24836C22 10.2258 21.8484 11.1411 21.5742 11.9986" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M15 17.4987H18.5M18.5 17.4987H22M18.5 17.4987V13.9987M18.5 17.4987V20.9987" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
    
          )}
    
      </button>

  )

}

export default AddProductToWishlistButtonInCard