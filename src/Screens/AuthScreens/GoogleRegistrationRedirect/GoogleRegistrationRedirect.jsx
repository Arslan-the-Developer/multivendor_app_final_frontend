import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PuffLoader } from 'react-spinners';

function GoogleRegistrationRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const verification_token = urlParams.get('verification_token');
      const error_message = urlParams.get('message');

      if (error_message) {
        localStorage.setItem('registration_error_message', error_message);
        navigate('/user-register'); // Redirect to error page
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/authentication/get_authorization_tokens/${String(verification_token)}`,
          {
            withCredentials: true, // Include credentials such as cookies
            headers: {
              'Content-Type': 'application/json', // Adjust the content type if needed
            },
          }
        );

        if (response.status === 200) {

          localStorage.setItem("store_date",response.data['store_date']);
          localStorage.setItem("store_time",response.data['store_time']);
          
          navigate('/'); // Redirect to home page

        } else {
          console.error('Unexpected response:', response);
          navigate('/user-register'); // Redirect to error page
        }
      } catch (error) {
        console.error('Error during token retrieval:', error);
        localStorage.setItem('registration_error_message', 'An error occurred during the registration process.');
        navigate('/user-register'); // Redirect to error page
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <PuffLoader color="#006964" size={100} />
      <h1 className="text-xl mt-6 text-primary font-monty">Just A Moment</h1>
    </section>
  );
}

export default GoogleRegistrationRedirect;
