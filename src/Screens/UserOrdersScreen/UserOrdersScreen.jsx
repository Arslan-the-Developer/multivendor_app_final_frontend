import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion } from "motion/react";
import { Link } from 'react-router-dom';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';
import Navbar from '../../Components/Navbar';
import api from '../../axios';


function UserOrdersScreen() {

    useRefreshTokens();


    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);


    async function fetchUserOrders() {

        try{

            const response = await api.get("/api/get_user_orders");

            setOrders(response.data);

            setLoading(false);

        } catch(error){

            console.log(error);

            setLoading(false);

        }
        
    }


    useEffect(() => {

        fetchUserOrders();

    }, [])


  return (

    <>

    <Navbar />

    {
        loading ? (

            <section className='w-full flex items-center justify-start' style={{height : "90vh"}}>

                <h2 className='font-product font-semibold text-primary tracking-wide'>Loading Your Orders</h2>

            </section>

        ) : (


        <section className='w-full flex flex-col items-center justify-start py-12 px-6'>

            <h2 className='mt-4 font-product font-semibold text-primary tracking-wider text-xl'>ORDERS</h2>

            <div className='w-full flex items-center justify-around content-start flex-wrap mt-2'>


                {
                    orders.map((order) => (

                        
                        <motion.div initial={{opacity : 0, y : 25}} animate={{opacity : 1, y : 0}} className='h-40 p-2 mt-3 bg-white shadow-lg rounded-sm flex items-center justify-between font-product transition border-2 border-white hover:border-primary duration-300 cursor-pointer group' style={{width : "32.6%"}}>

                            <Link to={`/order/order-details/${order.id}`} className='w-full h-full flex items-center justify-between'>

                                <div className='w-1/3 h-full flex items-center justify-center'>

                                    <motion.img transition={{delay : 0.4}} initial={{opacity : 0, scale : 0.9}} animate={{opacity : 1, scale : 1}} className='object-contain object-center group-hover:scale-90 transition' style={{width : "90%"}} src={`${order.order_items[0].product.product_images[0].image}`} alt="" />

                                </div>
                                
                                <div className='w-3/4 h-full px-4 py-3'>

                                    <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}}>Total Items : {order.order_items.length}</motion.h2>

                                    <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} className='mt-1'>Payment Status : {order.is_paid ? "Paid" : "Not Paid"}</motion.h2>

                                    <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} className='mt-1'>Is Delivered : {order.is_delivered ? "Yes" : "No"}</motion.h2>
                                    
                                    <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} className='mt-1 text-xl text-primary font-semibold'>{order.order_total}/-</motion.h2>

                                </div>

                            </Link>
                        </motion.div>
                    ))
                }



            </div>

        </section>

        )
    }


    </>

  )

}

export default UserOrdersScreen;