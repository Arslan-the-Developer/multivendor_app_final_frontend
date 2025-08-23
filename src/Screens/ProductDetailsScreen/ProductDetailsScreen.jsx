import api from '../../axios';
import { delay, motion } from 'motion/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';
import { BarLoader, PuffLoader } from 'react-spinners'
import Navbar from '../../Components/Navbar';



function ProductDetailsScreen() {

    useRefreshTokens();

    const { productID } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [Loading, setLoading] = useState(true);
    const [productBuyQuantity, setProductBuyQuantity] = useState(1);
    const [showBuyForm, setShowBuyForm] = useState(false);
    const [showChangeAddressForm, setShowChangeAddressForm] = useState(false);
    const [isOrderBeingCreated, setOrderBeingCreated] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedVariant, setSelectedVariant] = useState({});


    const navigate = useNavigate();

    async function GetProductDetails(product_id) {

        setLoading(true);

        try
        {
            const response = await api.post("/api/get_product_details", {product_id : product_id});

            setProductDetails(response.data);

            setSelectedImage(response.data.product_images[0].image);

            setSelectedVariant(response.data.variant_categories[0].variants[0]);

            setLoading(false);

        } catch (error) {

            console.log(error);

            setLoading(false);

        }
        
    }

    async function CreateOrder(e) {

        e.preventDefault();

        setOrderBeingCreated(true);

        try{

            const response = await api.post("/api/create_user_product_order", {product_id : productDetails.id,order_product_quantity : productBuyQuantity,order_delivery_address : selectedAddress})

            console.log(response.data);

            setOrderBeingCreated(false);

            navigate(`/order/${response.data['order_id']}/payment`);

        } catch(error) {

            console.log(error);

            setOrderBeingCreated(false);

        }
        
    }

    async function GetUserDeliveryAddresses() {

        try{

            const response = await api.get("/api/get_user_delivery_addresses");

            console.log(response.data);

            if(response.data['exists']){

                setAddresses(response.data['addresses']);

                response.data['addresses'].forEach(element => {

                    if(element.is_default){

                        setSelectedAddress(element.address);

                    }
                    
                });

            }

        } catch (error) {

            console.log(error);

        }
        
    }

    useEffect(() => {

        GetProductDetails(productID);

        GetUserDeliveryAddresses();
    
    }, []);

  return Loading ? (

    <div className='w-full h-screen flex flex-col items-center justify-center relative'>

        <PuffLoader color='#006964' size={75} />

        <p className='font-product mt-5 text-xl text-primary'>Patience Is Appreciated..</p>

    </div>

) : (

    <>

    <Navbar />

    <section className='w-full flex flex-col items-center justify-center relative'>

        {
            showBuyForm && showChangeAddressForm ? (

                <motion.div initial={{opacity : 0}} animate={{opacity : 1, transition : 2}} className='w-110 h-120 bg-white shadow-lg rounded-sm flex flex-col items-center justify-start p-3 absolute overflow-y-scroll custom-scrollbar' style={{zIndex : "3"}}>
                    <div className='h-1/10 w-full flex items-center justify-center relative'>
                        <button title='Close' className='absolute right-0 cursor-pointer' onClick={() => setShowChangeAddressForm(false)}>
                            <svg className='transition-all hover:rotate-180 hover:scale-105' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </button>
                        <Link to={`/user-profile/manage-shipping-addresses`} title='Add New' className='absolute right-8 cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='transition-all hover:rotate-180 hover:scale-105' viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </Link>
                        <h2 className='font-product text-xl text-primary font-semibold'>Change Address</h2>
                    </div>
                    <div className='h-9/10 w-full overflow-y-scroll custom-scrollbar mt-2'>
                        {
                            addresses.map((address) => (
                                <h2 onClick={() => setSelectedAddress(address.address)} className={`w-full cursor-pointer transition-all border-2 tracking-wide font-semibold h-18 p-2 mt-2 flex items-center justify-center font-product text-sm ${address.address === selectedAddress ? 'bg-less-primary border-primary' : 'bg-gray-100 border-gray-100 hover:border-primary'} rounded-sm`}>{address.address}</h2>
                            ))
                        }
                    </div>
                </motion.div>

            ) : ""
        }

        {
            showBuyForm ? (

                <motion.div initial={{opacity : 0}} animate={{opacity : 1, transition : 2}} className='w-full absolute flex items-center justify-center' style={{backgroundColor : "#0000003b", zIndex : 30, height : "111vh"}}>

                    <form onSubmit={(e) => CreateOrder(e)} initial={{opacity : 0, scale : 0}} animate={{opacity : 1, scale : 1, delay : 1}} className='w-110 bg-white shadow-lg rounded-sm flex flex-col items-center justify-start p-2'>

                        <div className='w-full h-1/3 flex items-center justify-start'>


                                <img className='w-30 h-30 object-contain object-center' src={`${productDetails.product_images[0].image}`} alt={productDetails.product_name}/>


                        <div className='flex flex-col items-start justify-start ml-5'>

                            <h1 className='font-product font-semibold'>{productDetails.product_name}</h1>

                            <h2 className='mt-2 font-product text-sm font-semibold text-primary tracking-wider'>{productDetails.product_store.store_name}</h2>

                            <div className='flex items-center mt-2'>

                                <h2 className='font-product'>Rating : {productDetails.average_rating}</h2>

                                <hr className='border border-gray-200 w-2 mx-5' />

                                <h2 className='font-product'>Sold : {productDetails.sold_count}</h2>

                            </div>

                        </div>
                            
                        </div>

                        <div className='w-full h-3/4 flex flex-col items-center justify-start'>

                            <div className='w-full flex flex-col items-center justify-center font-product'>
                                {
                                productDetails.variant_categories.map((variant_category, index) => (

                                    <div key={index} className='w-full'>

                                    <div className='flex items-center w-full justify-around mt-1'>

                                        {variant_category.variants.map((variant, i) => (
                                            <button key={i} className={`px-4 py-1 rounded-sm ${variant == selectedVariant ? "bg-primary text-white text-sm" : "bg-gray-200 text-dull"} ${i == 0 ? "ml-0" : "ml-2"}`} onClick={() => {setSelectedVariant(variant)}} >{variant.variant_name}</button>
                                        ))}

                                    </div>

                                    </div>
                                ))
                                }
                            </div>

                            <hr className='border border-gray-200 my-2 w-1/2' />

                            <div className='w-full flex items-center justify-center mt-1'>

                                <span className='w-full h-30 flex flex-col items-center justify-start font-product p-3 relative'>

                                    <h2>- Shipping Address -</h2>

                                    {
                                        addresses.length < 1 ? "" : (
                                            
                                            <button onClick={() => setShowChangeAddressForm(!showChangeAddressForm)} type='button' className='text-xs mt-2 text-primary font-semibold absolute top-2 right-4 cursor-pointer hover:underline'>Change</button>
                                            
                                        )
                                    }


                                    {
                                        addresses.length < 1 ? (

                                            <div className='w-full h-20 mt-4 bg-gray-100 border-2 border-gray-300 flex items-center justify-center group'>

                                                <Link to={'/user-profile/manage-shipping-addresses'}>
                                                    <svg className='transition group-hover:scale-105 cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#6e6e6e"} fill={"none"}>
                                                        <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>


                                            </div>

                                        ) : (

                                            <p className='w-full h-24 text-sm mt-2 p-2 bg-gray-100 border-2 border-less-primary rounded-sm tracking-wide font-product'>
                                                {selectedAddress}
                                            </p>

                                        )
                                    }



                                </span>

                            </div>

                            <div className='flex items-center justify-center flex-col mt-3'>
                                
                                <label className='font-product' htmlFor="">- Quantity -</label>

                                <div className='flex items-center justify-center mt-2'>

                                    <button onClick={() => { setProductBuyQuantity(prev => prev > 1 ? prev - 1 : prev); }} type='button' className='w-8 h-8 bg-gray-200 flex items-center justify-center border-2 border-gray-200 cursor-pointer transition hover:border-gray-400'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} height={15} color={"#000000"} fill={"none"}>
                                            <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    <span className='w-14 mx-1 h-8 bg-gray-200 text-primary flex items-center justify-center'>{productBuyQuantity}</span>

                                    <button onClick={() => { productBuyQuantity === selectedVariant.variant_quantity ? setProductBuyQuantity(productBuyQuantity) : setProductBuyQuantity(productBuyQuantity + 1)}} type='button' className='w-8 h-8 bg-gray-200 flex items-center justify-center border-2 border-gray-200 cursor-pointer transition hover:border-gray-400'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={15} height={15} color={"#000000"} fill={"none"}>
                                            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                </div>
                                
                            </div>

                            <h2 className='mt-4 font-product text-xl text-primary font-semibold'>{productBuyQuantity * productDetails.product_base_price+selectedVariant.extra_price} /-</h2>

                            <div className='w-full flex items-center justify-between mt-4'>

                                <button disabled={!showBuyForm} onClick={() => setShowBuyForm(false)} className='w-1/2 h-12 bg-gray-200 font-product rounded-sm cursor-pointer' type='button'>Cancel</button>

                                <hr className='mx-1' />

                                <button disabled={(addresses.length < 1) || (isOrderBeingCreated) ? true : false} className='w-1/2 h-12 bg-primary text-white font-product rounded-sm cursor-pointer flex items-center justify-center' type='submit'>{isOrderBeingCreated ? <BarLoader color='#ffffff' /> : "Order"}</button>

                            </div>

                        </div>

                    </form>


                </motion.div>
            ) : ""
        }

        <div className='w-full mt-10 py-4 px-20 flex flex-col items-start justify-start max-lg:px-5'>

            <p className='font-product tracking-wide text-primary'>Electronics {'>'} Headphones {'>'} Product Name</p>

            <div className='flex items-start justify-start mt-4'>

                <div className='flex items-start justify-start w-125 h-100'>

                    <div className='w-22 h-full mr-4 flex flex-col items-center justify-between'>


                        {
                            productDetails.product_images.map((image) => (

                                <img className="w-22 h-22 border-2 border-transparent transition-all hover:border-less-primary rounded-md" src={`${image.image}`} onClick={() => {setSelectedImage(image.image)}} alt="Img" />
                            ))
                        }


                    </div>

                    <div className='w-100 h-100'>

                        <img className='100 w-100 h-100 flex items-center justify-center object-center object-contain rounded-md' src={selectedImage} alt="" />

                    </div>


                </div>
                
                <div className='flex flex-col items-start justify-start pl-15 w-auto'>

                    <h1 className='font-product text-2xl font-semibold tracking-wide text-primary'>{productDetails.product_name}</h1>
                    
                    <h1 className='font-product text-3xl font-semibold tracking-wide text-primary mt-4'>{productDetails.product_base_price + selectedVariant.extra_price}/-</h1>

                    <div className='mt-6 flex flex-col items-start justify-start font-product'>

                        <p className='text-base font-semibold text-gray-500'>Product Variation</p>

                        <div className='flex items-start justify-start mt-4'>

                            {
                            productDetails.variant_categories.map((variant_category, index) => (

                                <div key={index}>

                                <h2>{variant_category.category_title}</h2>

                                <div className='flex items-center justify-start mt-1'>

                                    {variant_category.variants.map((variant, i) => (
                                        <button key={i} className={`px-4 py-1 rounded-sm ${variant == selectedVariant ? "bg-primary text-white" : "bg-gray-200 text-dull"} ${i == 0 ? "ml-0" : "ml-2"}`} onClick={() => {setSelectedVariant(variant)}} >{variant.variant_name}</button>
                                    ))}

                                </div>

                                </div>
                            ))
                            }


                        </div>

                    </div>

                    <div className='flex items-start justify-start mt-9'>

                        <button disabled={showBuyForm} onClick={() => setShowBuyForm(true)} className='bg-primary rounded-sm font-product text-white flex items-center justify-center px-8 py-3 relative overflow-hidden group cursor-pointer'>
                            <span className='w-1/3 h-100 bg-white blur-md opacity-30 absolute rotate-45 -left-20 transition-all group-hover:left-40 duration-200'></span>
                            Buy Now
                        </button>
                        
                        <button className='bg-primary rounded-sm font-product text-white flex items-center justify-center px-8 py-3 ml-2 relative group cursor-pointer overflow-hidden'>
                            <span className='w-1/3 h-100 bg-white blur-md opacity-30 absolute rotate-45 -left-25 transition-all group-hover:left-45 duration-200'></span>
                            Add To Cart
                        </button>

                    </div>

                    <div className='flex flex-col items-start justify-start font-product mt-8'>

                        <p className='text-base font-semibold text-gray-500'>Product Details</p>

                        <p className='w-80  font-semibold mt-2 tracking-wide text-gray-500 text-sm'>{productDetails.product_description}</p>

                    </div>

                </div>

            </div>


        </div>

        {/* {
        productDetails.product_images?.length > 0 ? (

            <div className='w-2/4 flex items-center justify-around'>

            {
            productDetails.product_images.map((image) => (

                <img className='w-56 h-56' src={`${image.image}`} alt={productDetails.product_name}/>

            ))
            }

            </div>

        ) : (
            <p>No images available for this product.</p>
        )
        }

        <div className='flex flex-col items-center justify-center mt-8 font-product'>

            <h2 className='text-xl'>{productDetails.product_name}</h2>
            <p>{productDetails.product_description}</p>
        
            <button disabled={showBuyForm} onClick={() => setShowBuyForm(true)} className='w-36 h-12 bg-primary text-secondary rounded-sm mt-4 transition-all cursor-pointer'>Buy Now</button>

        </div> */}


    </section>
    </>

)

}
export default ProductDetailsScreen