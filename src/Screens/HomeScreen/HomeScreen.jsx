import React, { useEffect } from 'react';
import axios from 'axios';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';
import { Link } from 'react-router-dom';



function HomeScreen() {

  const { isAuthenticated, isSeller, isApprovedSeller ,loading } = useCheckAuthentication();

  return (

    <div>HomeScreen
      {loading ? (
            <p>Checking authentication...</p>
        ) : (
          <section className='w-full flex items-center justify-center flex-col'>
            <p>User is {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</p>
            <p>User is {isSeller ? 'Seller' : 'Not A Seller'}</p>
            <p>User is {isApprovedSeller ? 'Approved Seller' : 'Not Approved Seller'}</p>
            <Link className='px-6 py-3 bg-primary text-secondary mt-6' to={'/user-register'}>Register</Link>
          </section>
      )
      }
    </div>

  )

}

export default HomeScreen