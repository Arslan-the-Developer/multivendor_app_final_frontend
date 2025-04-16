import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import api from '../../../axios';



function SellerOrdersScreen() {

  const [baseTitle, setBaseTitle] = useState('Orders');
  const [orderFlowTitle, setOrderFlowTitle] = useState('');
  const [orders, setOrders] = useState('');
  const [paidOrderExists, setPaidOrderExists] = useState(false);
  const [loading, setLoading] = useState(true);

  async function FetchSellerOrders() {

    try{
      
      const response = await api.get("/api/get_seller_orders");

      response.data.forEach(element => {

        if(element.order.is_paid){

          setPaidOrderExists(true);

          return;

        }
        
      });

      setOrders(response.data);

      setLoading(false);

    } catch(error){

      console.log(error);

      setLoading(false);

    }
    
  }

  useEffect(() => {

    FetchSellerOrders();
    
  }, []);

  return (

    <div className='w-full h-full flex flex-col items-start justify-start p-8'>
        <h3 className="text-xl font-product cursor-pointer font-semibold text-primary">{baseTitle}</h3>
        <div className='flex flex-wrap items-start justify-start content-start w-full h-full mt-4'>

          {
            loading ? (

              <h1>Loading....</h1>

            ) : !paidOrderExists ? (

              <div className='w-full h-full font-product flex flex-col items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="200" height="200" viewBox="0 0 647.63626 632.17383" className="injected-svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" copyright="unDraw" scrapped="true" source="https://undraw.co/">
                  <path d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z" transform="translate(-276.18187 -133.91309)" fill="#0079692b"></path>
                  <path d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z" transform="translate(-276.18187 -133.91309)" fill="#006964"></path>
                  <path d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z" transform="translate(-276.18187 -133.91309)" fill="#006964"></path>
                  <circle cx="190.15351" cy="24.95465" r="20" fill="#006964"></circle>
                  <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff"></circle>
                  <path d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z" transform="translate(-276.18187 -133.91309)" fill="#0079692b"></path>
                  <path d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z" transform="translate(-276.18187 -133.91309)" fill="#006964"></path>
                  <path d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z" transform="translate(-276.18187 -133.91309)" fill="#006964"></path>
                  <circle cx="433.63626" cy="105.17383" r="20" fill="#006964"></circle>
                  <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff"></circle>
                  </svg>
                <h2 className='mt-6 text-xl font-semibold text-primary tracking-wide'>No Orders To Show</h2>
                
              </div>

            ) : (

              orders.map((order) => (
                order.order.is_paid ? (

                    <motion.div initial={{opacity : 0, y : 25}} animate={{opacity : 1, y : 0}} key={order.id} style={{minWidth : "32%"}} className="h-36 ml-2 mt-3 bg-white flex items-center justify-start transition duration-300 border-2 border-white hover:border-primary rounded-md shadow-lg p-2 motion-preset-slide-up cursor-pointer group">

                    <div className='w-1/3 h-full'>

                      <motion.img transition={{delay : 0.4}} initial={{opacity : 0, scale : 0.9}} animate={{opacity : 1, scale : 1}} className='w-full h-full object-contain object-center transition-all group-hover:scale-90' src={`http://127.0.0.1:8000${order.seller_order_items[0].product.product_images[0].image}`} alt="" />

                    </div>

                    <div className='w-3/4 h-full flex flex-col items-start justify-around px-4 py-2 font-product'>
                    
                        <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}}>Consignee : {order.order.user.username}</motion.h2>

                        <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} className='mt-1'>Payment Status : {order.order.is_paid ? "Paid" : "Not Paid"}</motion.h2>
                        
                        <motion.h2 transition={{delay : 0.4}} initial={{opacity : 0, y : -10}} animate={{opacity : 1, y : 0}} className='mt-1 text-xl text-primary font-semibold'>{order.order_amount}/-</motion.h2>

                    </div>

                  </motion.div>
                  
                ) : ""
              ))
            )
          }

        </div>
    </div>

  )

}


export default SellerOrdersScreen