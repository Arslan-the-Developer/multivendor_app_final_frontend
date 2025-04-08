import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';
import ProductCard from '../../Components/ProductCard';



function UserSearchScreen() {

  useRefreshTokens();

  const { keyword } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);

  async function FetchSearchResults(word_to_search_for) {

    try{

      const resopnse = await axios({
        method : "get",
        url : `${import.meta.env.VITE_API_URL}/api/user_search_products/${word_to_search_for}`,
        withCredentials : true,
      });

      setSearchResults(resopnse.data.results);

      setSearchLoading(false);

    } catch(error) {

      console.log(error);

      setSearchLoading(false);

    }
    
  }

  useEffect(() => {

    setSearchLoading(true);  // Ensure loading state resets when a new search starts

    FetchSearchResults(keyword);
    
  }, [keyword]); // Add keyword as a dependency




  return (

    <>
      <Navbar />
      <section className='flex flex-col items-center justify-start px-8 py-12'>

        <h1 className='w-full font-product text-primary font-semibold tracking-wider mb-6'>Search Results For : "{keyword}"</h1>

        {
          searchLoading ? (

            <h1 className='w-full flex items-center justify-center font-product text-primary font-semibold tracking-wider text-xl' style={{height : "70vh"}}>Loading Search Results...</h1>

          ) : (

            searchResults.length < 1 ? (

              <h1 className='w-full flex items-center justify-center font-product text-primary font-semibold tracking-wider text-xl' style={{height : "70vh"}}>No Results Found</h1>

            ) : (

              <div className='w-full flex items-start justify-start content-start flex-wrap'>

                {
                  searchResults.map((product) => (

                    <ProductCard product={product} />
                    
                  ))
                }

              </div>

            )
          )
        }
      </section>
    </>

  )

}


export default UserSearchScreen