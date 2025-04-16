import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../../axios';
import Navbar from '../../Components/Navbar';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';


function OrderDetailsScreen() {

    useRefreshTokens();


    const [loading, setLoading] = useState(true);
    const [orderDetails, setDetails] = useState([])
    const { orderID } = useParams();

    async function FetchOrderDetails() {

        try{

            const response = await api.post("/api/get_user_order_details", {order_id : orderID});

            setDetails(response.data);

            setLoading(false);

        } catch (error){

            console.log(error);

            setLoading(false);

        }
        
    }

    useEffect(() => {

        FetchOrderDetails();

    }, []);

    

  return loading ? (

    <>

        <Navbar />

        <section className='w-full flex items-center justify-center' style={{height : "90vh"}}>

            <h1>Loading.....</h1>

        </section>

    </>

  ) : (

    <>

        <Navbar />

        <section className='w-full flex flex-col items-center justify-start py-8' style={{height : "90vh"}}>

            <div className='w-full h-full flex flex-col'>

                <div className='w-full h-1/10 px-4 mt-4'>

                    <div className='h-full w-full px-4 flex items-center justify-start'>

                        <div className='w-1/2 h-full flex items-center justify-start'>

                            <div className='h-full flex items-center justify-center'>

                                <img className='h-3/4 object-contain object-center rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s" alt="" />

                            </div>

                            <div className='flex flex-col ml-3 font-product'>

                                <h2 className='font-semibold tracking-wide'>{orderDetails.user.username}</h2>
                                
                                <h2 className='text-xs font-semibold'>{orderDetails.user.email}</h2>

                            </div>

                        </div>

                        <div className='w-1/2 h-full flex items-center justify-end font-product'>

                            <h2 className='text-xl font-semibold'>Order #{orderDetails.id}</h2>

                        </div>

                    </div>

                </div>

                <div className='w-full h-9/10 flex items-start justify-around mt-5'>

                    <div className='h-full flex flex-col items-center justify-start' style={{width : "65%"}}>


                        <span className='w-full h-1/10 bg-primary rounded-sm flex items-center justify-start'>

                            <h2 className='w-1/4 h-full text-secondary flex items-center justify-center font-product'>Product</h2>
                            <h2 className='w-1/4 h-full text-secondary flex items-center justify-center font-product'>Store</h2>
                            <h2 className='w-1/4 h-full text-secondary flex items-center justify-center font-product'>Quantity</h2>
                            <h2 className='w-1/4 h-full text-secondary flex items-center justify-center font-product'>Price / Piece</h2>

                        </span>

                        <span className='w-full h-17/20 overflow-y-scroll custom-scrollbar'>

                            {
                                orderDetails.order_items.map((item) => (

                                    <div className='w-full h-16 mt-4 flex items-center justify-start'>

                                        <div className='w-1/4 h-full flex items-center justify-start font-product'>

                                            <div className='h-full flex items-center justify-center'>

                                                <img className='h-full object-center object-contain' src={`http://127.0.0.1:8000${item.product.product_images[0].image}`} alt="" />

                                            </div>

                                            <div className='h-full flex flex-col items-center justify-center ml-3'>

                                                <h2 className='font-semibold'>{item.product.product_name}</h2>

                                            </div>

                                        </div>
                                        
                                        <div className='w-1/4 h-full flex items-center justify-center font-product'>

                                            <h2>{item.product.product_store.store_name}</h2>

                                        </div>
                                        
                                        <div className='w-1/4 h-full flex items-center justify-center font-product'>

                                            <h2>{item.product_quantity}</h2>

                                        </div>
                                        
                                        <div className='w-1/4 h-full flex items-center justify-center font-product'>

                                            <h2>{item.product.product_price}/-</h2>

                                        </div>

                                    </div>
                                ))
                            }

                        </span>



                    </div>

                
                
                    <div className='flex flex-col items-center justify-start p-4 rounded-sm bg-gray-200' style={{width : "28%"}}>

                        <h2 className='font-product font-semibold text-xl text-primary'>Order Summary</h2>

                        <div className='w-full h-full flex flex-col items-center justify-center font-product mt-5'>

                            <div className='w-full h-full flex flex-col items-center justify-center'>

                                <div className='w-full flex items-center justify-between px-2'>

                                    <h2>Subtotal</h2>
                                    <h2>{orderDetails.order_items.reduce((acc, item) => acc + (parseInt(item.product_quantity, 10) * parseInt(item.product.product_price, 10)), 0)}/-</h2>

                                </div>
                                
                                <div className='w-full flex items-center justify-between px-2 mt-2'>

                                    <h2>Shipping Fee</h2>
                                    <h2>250/-</h2>

                                </div>
                                
                                <div className='w-full flex items-center justify-between px-2 mt-2'>

                                    <h2>Tax</h2>
                                    <h2>50/-</h2>

                                </div>
                                
                                <div className='w-full flex items-center justify-between px-2 mt-2'>

                                    <h2>Total</h2>
                                    <h2>{orderDetails.order_total}/-</h2>

                                </div>

                            </div>

                            <hr className='border border-gray-300 w-full mt-6 mb-4' />
                            
                            <div className='w-full h-full flex flex-col items-center justify-center'>

                                {
                                    orderDetails.is_paid ? (

                                        <>
                                            <button disabled className='h-14 w-full bg-gray-300 rounded-sm'>Paid</button>
                                            <button className='h-14 w-full bg-less-primary rounded-sm mt-2'>Check Status</button>
                                        </>

                                    ) : (

                                        <Link to={`/order/${orderDetails.id}/payment`} className='rounded-sm w-full h-14 bg-primary text-secondary flex items-center justify-center transition hover:scale-95'>Pay</Link>

                                    )
                                }

                            </div>

                        </div>
                        

                    </div>

                </div>

            </div>

        </section>

    </>

  )

}

export default OrderDetailsScreen;