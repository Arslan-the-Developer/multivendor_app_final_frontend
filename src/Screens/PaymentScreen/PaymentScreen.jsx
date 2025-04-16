import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BarLoader } from 'react-spinners';
import api from '../../axios';


const stripePromise = loadStripe('pk_test_51PvydsI9dAJ6SNVqO5TGglKqEsVIpTavrFcyNQkNFh9Y4tc1SSafaws8S1X6ncfRltyNqa9xzeZps5GnEzr9Tilh00PjUONFkM');

function PaymentScreen() {
  const { orderID } = useParams();
  const [clientSecret, setClientSecret] = useState('');
  const [allowAccess, setAllowAccess] = useState(null); // null means not determined yet
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check access and fetch client secret if allowed
  useEffect(() => {
    async function verifyAccessAndFetchSecret() {
      try {

        // Check access
        const accessResponse = await api.post('/api/validate_payment_page',{ order_id: orderID });

        const accessAllowed = accessResponse.data.allow_access;
        setAllowAccess(accessAllowed);

        if (!accessAllowed) {
          navigate("/");
          return;
        }

        // Fetch client secret if access is allowed
        const secretResponse = await api.post('/api/get_client_secret', { order_id: orderID });

        setClientSecret(secretResponse.data.client_secret);
        
      } catch (error) {
        console.error(error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    }

    verifyAccessAndFetchSecret();
  }, [orderID, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }


  // If access is not allowed, you might render null (or could add a message)
  if (!allowAccess) {
    return null;
  }

  const appearance = {
    theme: 'stripe',
    wallets : {
      link : 'never',
    }
  };
  const options = {
    clientSecret: clientSecret, // from your backend
    appearance, // pass the appearance object
  };

  return (
    <section className='w-full h-screen flex items-center justify-center bg-primary'>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm order_Id={orderID} />
        </Elements>
      ) : (
        <div>Loading payment details...</div>
      )}
    </section>
  );
}


function CheckoutForm({ order_Id }) {
  const stripe = useStripe();
  const elements = useElements();
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (event) => {

    setDisable(true);

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/order/${order_Id}/payment-success`,
      },
    });

    if (error) {

      setDisable(false);

      console.error(error.message);
      // handle errors in your UI
    } else {
      // Payment successful or in processing state
      // Stripe will redirect to return_url or handle next steps
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white p-4 rounded-sm '>
      {/* PaymentElement is basically the 'payment' element from the vanilla docs */}
      <PaymentElement
        options={{
          layout: 'accordion', 
          // You can add more PaymentElement options if needed
        }}
      />
      <button disabled={!stripe || disable} type="submit" className='w-full h-12 bg-white shadow-lg font-product mt-4 rounded-sm border-2 cursor-pointer border-white hover:border-gray-400'>
        {disable ? <BarLoader color='#006964' /> : `Pay`}
      </button>
    </form>
  );
}


export default PaymentScreen;
