import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';
import api from '../../axios';
import { PuffLoader } from 'react-spinners';


function UserWishlistScreen() {

    useRefreshTokens();

    let navigate = useNavigate();
    const [wishlistProducts, setWishlistProducts] = useState([]);
    let [loadingProducts, setLoadingProducts] = useState(false);

    const { isAuthenticated, isSeller, isApprovedSeller, isStoreBasicInfoAdded, isStoreIDInfoAdded, isStoreRejected, loading } = useCheckAuthentication();

    async function FetchWishlistProducts() {

        setLoadingProducts(true);

        try{

            const response = await api.get("/api/get_user_wishlist");
    
            console.log(response.data.products);

            setWishlistProducts(response.data.products);

            setLoadingProducts(false);

        } catch(error){

            console.log(error);

            setLoadingProducts(false);

        }
        
    }

    async function WishlistFunction(e, product_id) {

        try{

            const response = await api.post(`/api/add_remove_wishlist_product`, {product_id : product_id});

            console.log(response.data);

            FetchWishlistProducts();

        }
        catch(error){

            console.log(error);

        }
        
    }
    
    useEffect(() => {
        
        FetchWishlistProducts();
        
    }, []);

    return loading ? (

        <div className='w-full h-screen flex items-center justify-center'>

            <PuffLoader color='#006964' />

        </div>

    ) : !isAuthenticated ? navigate('/user-login') : (
        
    <>
        <Navbar />

        {
            loadingProducts ? (

                <h1>Loading.....</h1>

            ) : (

                wishlistProducts.length < 1 ? (

                    <h1>Your Wishlist Is Empty</h1>

                ) : (

                    <section className='w-full absolute bottom-0 flex flex-col items-center justify-center p-4' style={{height : "90%"}}>

                        <h2 className='font-product font-semibold tracking-wider text-xl text-primary mb-4'>Your Wishlist</h2>

                        <div className='w-full h-full flex flex-wrap items-start justify-around content-start p-6 overflow-y-scroll custom-scrollbar'>

                            {
                                wishlistProducts.map((product) => (
                                    <div className='h-34 relative bg-white mt-3 p-3 group rounded-sm shadow-md flex items-center justify-start overflow-hidden' style={{width : "32.5%"}}>

                                        <div className='w-1/3 h-full flex items-center justify-center'>
                                            <img src={`http://127.0.0.1:8000${product.product_images[0].image}`} className='w-full h-full object-center object-contain' alt="" />
                                        </div>

                                        <hr className='border border-gray-200 h-1/2' />

                                        <div className='flex flex-col items-start justify-start font-product font-semibold tracking-wider ml-3'>

                                            <Link to={`/product-details/${product.id}`}>{product.product_name}</Link>
                                            <div className='flex items-center justify-center mt-2'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/store-03-stroke-rounded.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                                                    <path d="M3.00003 10.9871V15.4925C3.00003 18.3243 3.00003 19.7403 3.87871 20.62C4.75739 21.4998 6.1716 21.4998 9.00003 21.4998H15C17.8284 21.4998 19.2426 21.4998 20.1213 20.62C21 19.7403 21 18.3243 21 15.4925V10.9871" stroke="#006964" strokeWidth="1.5"></path>
                                                    <path d="M15 16.9768C14.3159 17.584 13.2268 17.9768 12 17.9768C10.7732 17.9768 9.68412 17.584 9.00003 16.9768" stroke="#006964" strokeWidth="1.5" strokeLinecap="round"></path>
                                                    <path d="M17.7957 2.50294L6.14986 2.53202C4.41169 2.44248 3.96603 3.78259 3.96603 4.43768C3.96603 5.02359 3.89058 5.87774 2.82527 7.4831C1.75996 9.08846 1.84001 9.56536 2.44074 10.6767C2.93931 11.5991 4.20744 11.9594 4.86865 12.02C6.96886 12.0678 7.99068 10.2517 7.99068 8.97523C9.03254 12.1825 11.9956 12.1825 13.3158 11.8157C14.6386 11.4483 15.7717 10.1331 16.0391 8.97523C16.195 10.4142 16.6682 11.2538 18.0663 11.8308C19.5145 12.4284 20.7599 11.515 21.3848 10.9294C22.0097 10.3439 22.4107 9.04401 21.2968 7.6153C20.5286 6.63001 20.2084 5.7018 20.1033 4.73977C20.0423 4.18234 19.9888 3.58336 19.5972 3.20219C19.0248 2.64515 18.2036 2.47613 17.7957 2.50294Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <Link to={`/store-details/${product.product_store.id}`} className='text-sm ml-1 text-primary'>{product.product_store.store_name}</Link>
                                            </div>
                                            <h1 className='text-primary mt-2'>{product.product_price}/-</h1>

                                        </div>

                                        <div className='absolute h-3/4 font-product font-semibold tracking-wider group-hover:opacity-100 group-hover:translate-x-0 duration-300 translate-x-10 transition opacity-0 bottom-4 right-4 flex flex-col items-center justify-center'>
                                            <button className='w-22 text-sm py-2 bg-primary rounded-xs text-white'>Buy Now</button>
                                            <button onClick={(e) => WishlistFunction(e, product.id)} className='w-22 text-sm py-2 bg-red-500 text-white rounded-xs mt-1'>Delete</button>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                    </section>

                )


            )
        }

    </>

  )

}

export default UserWishlistScreen