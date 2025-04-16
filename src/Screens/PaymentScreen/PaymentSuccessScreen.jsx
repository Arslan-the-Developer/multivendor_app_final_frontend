import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../../axios';


function PaymentSuccessScreen() {

  const [loading, setLoading] = useState(true);

  const { orderID } = useParams();

  async function MarkOrderAsPaid() {

    try{

      const response = await api.post("/api/mark_order_as_paid", {order_id : orderID})

      console.log(response.data);

    } catch(error) {

      console.log(error);

    }
    
  }

  useEffect(() => {

    MarkOrderAsPaid();

  }, [])

  return (

    <section className='w-full h-screen flex items-center justify-center font-product flex-col relative'>

        <svg xmlns="http://www.w3.org/2000/svg" width="110" height="110" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/checkmark-badge-01-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.5686 2.40561C12.9196 1.8648 11.9769 1.8648 11.328 2.40561L9.17676 4.19829L5.94829 4.19829C4.9818 4.19829 4.19829 4.98179 4.19829 5.94829L4.19829 9.17675L2.40561 11.328C1.8648 11.9769 1.8648 12.9196 2.40561 13.5686L4.19829 15.7198L4.1983 18.9483C4.1983 19.9148 4.9818 20.6983 5.9483 20.6983L9.17676 20.6983L11.328 22.491C11.9769 23.0318 12.9196 23.0318 13.5686 22.491L15.7198 20.6983H18.9483C19.9148 20.6983 20.6983 19.9148 20.6983 18.9483L20.6983 15.7198L22.491 13.5686C23.0318 12.9196 23.0318 11.9769 22.491 11.328L20.6983 9.17675L20.6983 5.94829C20.6983 4.98179 19.9148 4.19829 18.9483 4.19829L15.7198 4.19829L13.5686 2.40561ZM16.7222 10.5815C17.0719 10.1541 17.0089 9.52407 16.5815 9.17435C16.154 8.82462 15.524 8.88762 15.1743 9.31506L11.374 13.9599L10.1553 12.7412C9.76482 12.3507 9.13166 12.3507 8.74114 12.7412C8.35061 13.1317 8.35061 13.7649 8.74114 14.1554L10.7411 16.1554C10.9409 16.3552 11.2159 16.4611 11.4981 16.4471C11.7802 16.433 12.0433 16.3002 12.2222 16.0815L16.7222 10.5815Z" fill="#006964"></path>
        </svg>

        <h2 className='text-2xl font-semibold tracking-wide text-primary mt-4'>Payment Successfull</h2>
        <h2 className='mt-4 font-semibold tracking-wide'>Your Order Is On Your Way</h2>

        <Link className='w-46 h-14 flex items-center justify-center bg-primary text-secondary rounded-sm mt-8' to={"/"}>Back Home</Link>

    </section>

  )

}


export default PaymentSuccessScreen;