import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react';
import AddProductToCartButtonInCard from '../Components/AddProductToCartInCardButton'
import AddProductToWishlistButtonInCard from '../Components/AddProductToWishlistButtonInCard';
import axios from 'axios';
import api from '../axios';
import { Link } from 'react-router-dom';




function ProductCard({ product }) {

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });


    async function AddProductToCart(e, product_id) {

        try{
    
            const response = await api.post(`/api/add_modify_cart_product`, {product_id : product_id});
            
            console.log(response.data);
            
            let msg = document.getElementById(`cart_msg_${product_id}`);
            msg.classList.remove("h-0");
            msg.classList.remove("opacity-0");
            
            setTimeout(() => {
                msg.classList.add("h-0");
                msg.classList.add("opacity-0");
            }, 1500);
            
    
        } catch (error) {
    
            console.log(error);
    
        }
        
    }



    async function WishlistFunction(e, product_id) {

        try{
  
            const response = await api.post(`/api/add_remove_wishlist_product`, {product_id : product_id});
  
            console.log(response.data);
  
        }
        catch(error){
  
            console.log(error);
  
        }
        
    }

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
    <motion.div initial={{translateY : "25px"}} animate={{translateY : "0", opacity : "1"}} className='w-56 h-70 max-sm:w-40 max-sm:h-50 bg-white flex flex-col items-center justify-start ml-3 rounded-sm overflow-hidden shadow-md group transition-all opacity-0 relative p-2'>

        <div className='w-full flex items-center justify-center' style={{height : "60%"}}>

        <img className='object-contain object-center group-hover:scale-90 transition' src={`${product.product_images[0].image}`} alt="" style={{width : "70%"}} />

        </div>
        
        <div className='w-full flex flex-col items-center justify-center font-product text-primary font-semibold tracking-wider mt-6 transition-all group-hover:mt-2'>

        <h3 className='text-dull max-sm:text-[12px] text-center'>
            <h2 className='h-4'>{product.product_name.slice(0,15)}...</h2>
            <span className='flex items-center justify-between w-full mt-2 max-sm:justify-center'>

            <Link to={`/store-details/${product.product_store.id}`} className='text-gray-500 text-xs transition-all max-sm:hidden hover:text-primary'>{product.product_store.store_name}</Link>
            <hr className='border border-gray-200 w-2 max-sm:hidden' />
            <h3 className='text-primary'>{product.product_price}/-</h3>

            </span>
            </h3>

        </div>
        
        <div className='w-full absolute flex items-center justify-center font-product max-sm:-mb-2 text-primary font-semibold tracking-wider -bottom-12 group-hover:bottom-0 transition-all'>

        {
                product.is_product_in_cart === "unauthenticated" ? (

                    <Link to={"/user-login"} className='w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} color={"#006964"} fill={"none"}>
                            <path d="M13 18H21M17 22L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M7 7.5V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V7.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M10 22C7.71999 21.9999 6.57085 21.9917 5.76809 21.2752C4.95603 20.5505 4.75097 19.3264 4.34085 16.8781L3.17786 9.93557C2.98869 8.8063 2.89411 8.24167 3.18537 7.87083C3.47662 7.5 4.01468 7.5 5.09079 7.5H18.9092C19.9853 7.5 20.5234 7.5 20.8146 7.87083C21.1059 8.24167 21.0113 8.8063 20.8221 9.93557L20.4763 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4.5 17.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </Link>

                ) : (

                    product.is_product_in_cart ? (

                        <Link to={"/user-cart"} className='w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center' title='View In Cart'>
                            <svg xmlns="http://www.w3.org/2000/svg" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/shopping-basket-02-solid-rounded.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C9.79086 3.25 8 5.04086 8 7.25V7.75C8 8.30228 7.55228 8.75 7 8.75C6.44772 8.75 6 8.30228 6 7.75V7.25C6 3.93629 8.68629 1.25 12 1.25C15.3137 1.25 18 3.93629 18 7.25V7.75C18 8.30228 17.5523 8.75 17 8.75C16.4477 8.75 16 8.30228 16 7.75V7.25C16 5.04086 14.2091 3.25 12 3.25Z" fill="#006964"></path>
                                <path d="M5.03918 6.75C4.54569 6.74993 4.09347 6.74987 3.73122 6.80485C3.32906 6.86588 2.90613 7.01213 2.59554 7.40758C2.29245 7.79347 2.2384 8.2371 2.25186 8.64362C2.26442 9.02282 2.34242 9.48822 2.43027 10.0123L3.43315 15.9991C3.47323 16.2384 3.49326 16.358 3.57716 16.429C3.66106 16.5 3.78234 16.5 4.02491 16.5H19.9751C20.2177 16.5 20.3389 16.5 20.4228 16.429C20.5067 16.358 20.5268 16.2384 20.5668 15.9991L21.5697 10.0124C21.6576 9.48825 21.7356 9.02281 21.7481 8.64362C21.7616 8.2371 21.7075 7.79347 21.4045 7.40758C21.0939 7.01213 20.6709 6.86588 20.2688 6.80485C19.9065 6.74987 19.4543 6.74993 18.9608 6.75H5.03918Z" fill="#006964"></path>
                                <path d="M19.9978 19.2079C20.0685 18.8852 20.1039 18.7239 20.0138 18.6119C19.9237 18.5 19.7551 18.5 19.4178 18.5H4.58218C4.24491 18.5 4.07627 18.5 3.98621 18.6119C3.89614 18.7239 3.9315 18.8852 4.0022 19.2079C4.05928 19.4683 4.11886 19.7096 4.18349 19.9321C4.40733 20.703 4.7155 21.3411 5.26868 21.8348C5.82696 22.3331 6.48525 22.5511 7.25514 22.6529C7.98918 22.75 8.90541 22.75 10.028 22.75H13.972C15.0946 22.75 16.0108 22.75 16.7449 22.6529C17.5147 22.5511 18.173 22.3331 18.7313 21.8348C19.2845 21.3411 19.5927 20.703 19.8165 19.9321C19.8811 19.7096 19.9407 19.4683 19.9978 19.2079Z" fill="#006964"></path>
                            </svg>
                        </Link>

                    ) : (

                        <AddProductToCartButtonInCard product = {product} AddToCartFunction={AddProductToCart} />

                    )


                )
            }
            
            {
                product.is_product_in_wishlist === 'unauthenticated' ? (

                    <Link to={'/user-login'} className='w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center border-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} viewBox="0 0 24 24" fill="none" class="injected-svg" data-src="https://cdn.hugeicons.com/icons/heart-add-stroke-standard.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                            <path d="M12 20.9986C7.35839 18.6768 2 15.0599 2 9.24836C2 5.90907 4.16367 3 7.68 3C9.64299 3 11 3.99863 12 5.49863C13 3.99863 14.357 3 16.32 3C19.8363 3 22 5.90907 22 9.24836C22 10.2258 21.8484 11.1411 21.5742 11.9986" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M15 17.4987H18.5M18.5 17.4987H22M18.5 17.4987V13.9987M18.5 17.4987V20.9987" stroke="#006964" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </Link>
                ) : (

                    product.is_product_in_wishlist ? (

                        <Link to={"/user-wishlist"} className='w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center border-primary' title="View In Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/favourite-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1 8.99835C1 5.358 3.3947 1.99998 7.43 1.99998C9.30819 1.99998 10.7026 2.80469 11.75 4.01044C12.7974 2.80469 14.1918 1.99998 16.07 1.99998C20.1053 1.99998 22.5 5.358 22.5 8.99835C22.5 12.16 21.0352 14.697 19.0211 16.7123C17.0165 18.718 14.4321 20.2456 12.0855 21.4194C11.8743 21.525 11.6257 21.525 11.4145 21.4194C9.06793 20.2456 6.48346 18.718 4.47892 16.7123C2.46481 14.697 1 12.16 1 8.99835Z" fill="#006964"></path>
                            </svg>
                        </Link>

                    ) : (

                        <AddProductToWishlistButtonInCard product={product} AddToWishlistFunction={WishlistFunction} />

                    )


                )
            }

            <Link to={`/product-details/${product.id}`} className='w-1/3 h-12 hover:scale-105 transition-all text-secondary text-sm flex items-center justify-center border-primary'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={windowDimensions.width <= 450 ? 19 : 24} height={windowDimensions.width <= 450 ? 19 : 24} color={"#006964"} fill={"none"}>
                    <path d="M2 8C2 8 6.47715 3 12 3C17.5228 3 22 8 22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M21.544 13.045C21.848 13.4713 22 13.6845 22 14C22 14.3155 21.848 14.5287 21.544 14.955C20.1779 16.8706 16.6892 21 12 21C7.31078 21 3.8221 16.8706 2.45604 14.955C2.15201 14.5287 2 14.3155 2 14C2 13.6845 2.15201 13.4713 2.45604 13.045C3.8221 11.1294 7.31078 7 12 7C16.6892 7 20.1779 11.1294 21.544 13.045Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M15 14C15 12.3431 13.6569 11 12 11C10.3431 11 9 12.3431 9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
            </Link>

        </div>

    </motion.div>
  )
}

export default ProductCard