import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';



function ManageUserShippingAddressScreen() {

  useRefreshTokens();

  const [isCreateButtonDisabled, setCreateButtonDisabled] = useState(false);
  const [addressLoading, setAddressLoading] = useState(true);
  const [userAddresses, setUserAddresses] = useState([]);
  

  async function FetchUserShippingAddresses() {

    try{

      const response = await axios({
        method : "get",
        url : "http://127.0.0.1:8000/api/get_user_delivery_addresses",
        withCredentials : true,
      });

      if(response.data['exists']){

        setUserAddresses(response.data['addresses']);

      }

      setAddressLoading(false);

    } catch(error) {

      console.log(error);

      setAddressLoading(false);

    }
    
  }


  async function CreateUserShippingAddress(e) {

    e.preventDefault();

    setCreateButtonDisabled(true);

    let formData = new FormData(e.target);

    try{

      const response = await axios({
        method : "post",
        url : "http://127.0.0.1:8000/api/create_user_delivery_address",
        withCredentials : true,
        data : formData,
      })

      console.log(response.data);

      FetchUserShippingAddresses(); 

    } catch(error) {

      console.log(error);

    }

    setCreateButtonDisabled(false);
    
  }


  async function setAddressAsDefault(address_id) {

    alert(`Setting ${address_id} as Default`);
    
  }


  async function deleteUserAddress(addressID) {

    try{
      const response = await axios({
        method : "post",
        url : "http://127.0.0.1:8000/api/delete_user_delivery_address",
        withCredentials : true,
        data : {
          address_ID : addressID
        }
      });
      
      console.log(response.data);

      FetchUserShippingAddresses();

    } catch(error){

      console.log(error);

    }
    
  }

  useEffect(() => {

    FetchUserShippingAddresses();

  }, []);


  return (

    <>
        <Navbar />
        <section className='w-full flex items-center justify-center py-10' style={{height : "90vh"}}>

            <div className='h-full w-4/5 p-4 flex flex-col items-center justify-start'>

              <h2 className='font-product text-xl text-primary font-semibold mt-3'>Your Addresses</h2>

              <div className='flex flex-wrap items-start content-start justify-between w-full mt-6'>
                {
                  addressLoading ? (
                    <h2>Loading.....</h2>
                  ) : (

                    userAddresses.map((address) => (
                      <div className='bg-white h-26 p-4 rounded-sm flex items-center relative justify-between font-product transition border-2 border-white hover:border-primary group' style={{width : "49%"}}>
                        <h2 className='text-sm font-semibold tracking-wide w-3/4'>{address.address}</h2>

                        <div className='font-product text-primary h-full'>
                          {
                            address.is_default ? (

                              <div className='flex flex-col items-center justify-center relative h-full'>

                                <p className='group-hover:-translate-y-3 transition mr-3'>Default</p>
                                <button type='button' onClick={() => deleteUserAddress(address.id)} className='bg-red-500 cursor-pointer px-8 h-8 rounded-sm opacity-0 transition-all group-hover:opacity-100 group-hover:bottom-0 mt-1 absolute -bottom-3 right-0'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/delete-02-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.63751 20.1665L3.82444 6.75092L3.73431 5.06621C3.72513 4.89447 3.8619 4.75018 4.03388 4.75018H19.9945C20.1685 4.75018 20.306 4.89769 20.2938 5.07124L20.1756 6.75092L19.3625 20.1665C19.2745 21.618 18.0717 22.7502 16.6176 22.7502H7.38247C5.9283 22.7502 4.72548 21.618 4.63751 20.1665ZM8.74963 16.5002C8.74963 16.9144 9.08542 17.2502 9.49963 17.2502C9.91385 17.2502 10.2496 16.9144 10.2496 16.5002V10.5002C10.2496 10.086 9.91385 9.75018 9.49963 9.75018C9.08542 9.75018 8.74963 10.086 8.74963 10.5002V16.5002ZM14.4996 9.75018C14.9138 9.75018 15.2496 10.086 15.2496 10.5002V16.5002C15.2496 16.9144 14.9138 17.2502 14.4996 17.2502C14.0854 17.2502 13.7496 16.9144 13.7496 16.5002V10.5002C13.7496 10.086 14.0854 9.75018 14.4996 9.75018Z" fill="#ffffff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.31879 2.46286C8.63394 1.7275 9.35702 1.2507 10.1571 1.2507H13.8383C14.6383 1.2507 15.3614 1.7275 15.6766 2.46286L16.6569 4.75034H19.2239C19.2903 4.75034 19.3523 4.75034 19.4102 4.7507H19.4637C19.4857 4.74973 19.5079 4.74972 19.5303 4.7507H20.9977C21.55 4.7507 21.9977 5.19842 21.9977 5.7507C21.9977 6.30299 21.55 6.7507 20.9977 6.7507H2.99768C2.4454 6.7507 1.99768 6.30299 1.99768 5.7507C1.99768 5.19842 2.4454 4.7507 2.99768 4.7507H4.46507C4.48746 4.74972 4.50968 4.74973 4.53167 4.7507H4.58469C4.6426 4.75034 4.70457 4.75034 4.77093 4.75034H7.33844L8.31879 2.46286ZM13.8903 3.37192L14.481 4.75034H9.5144L10.1052 3.37192C10.1367 3.29838 10.209 3.2507 10.289 3.2507L13.7064 3.2507C13.7864 3.2507 13.8587 3.29838 13.8903 3.37192Z" fill="#ffffff"></path>
                                  </svg>
                                </button>

                              </div>

                            ) : (

                              <div className='flex flex-col items-center justify-center relative h-full'>

                                <button type='button' onClick={() => setAddressAsDefault(address.id)} className='w-20 h-8 bg-primary group-hover:opacity-100 text-secondary text-xs rounded-sm tracking-wider cursor-pointer transition-all group-hover:-translate-y-4 hover:bg-teal-700'>Set Default</button>
                                <button type='button' onClick={() => deleteUserAddress(address.id)} className='bg-red-500 cursor-pointer w-20 h-8 flex items-center justify-center rounded-sm opacity-0 transition-all group-hover:opacity-100 group-hover:bottom-0 mt-1 absolute -bottom-3 right-0'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/delete-02-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.63751 20.1665L3.82444 6.75092L3.73431 5.06621C3.72513 4.89447 3.8619 4.75018 4.03388 4.75018H19.9945C20.1685 4.75018 20.306 4.89769 20.2938 5.07124L20.1756 6.75092L19.3625 20.1665C19.2745 21.618 18.0717 22.7502 16.6176 22.7502H7.38247C5.9283 22.7502 4.72548 21.618 4.63751 20.1665ZM8.74963 16.5002C8.74963 16.9144 9.08542 17.2502 9.49963 17.2502C9.91385 17.2502 10.2496 16.9144 10.2496 16.5002V10.5002C10.2496 10.086 9.91385 9.75018 9.49963 9.75018C9.08542 9.75018 8.74963 10.086 8.74963 10.5002V16.5002ZM14.4996 9.75018C14.9138 9.75018 15.2496 10.086 15.2496 10.5002V16.5002C15.2496 16.9144 14.9138 17.2502 14.4996 17.2502C14.0854 17.2502 13.7496 16.9144 13.7496 16.5002V10.5002C13.7496 10.086 14.0854 9.75018 14.4996 9.75018Z" fill="#ffffff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.31879 2.46286C8.63394 1.7275 9.35702 1.2507 10.1571 1.2507H13.8383C14.6383 1.2507 15.3614 1.7275 15.6766 2.46286L16.6569 4.75034H19.2239C19.2903 4.75034 19.3523 4.75034 19.4102 4.7507H19.4637C19.4857 4.74973 19.5079 4.74972 19.5303 4.7507H20.9977C21.55 4.7507 21.9977 5.19842 21.9977 5.7507C21.9977 6.30299 21.55 6.7507 20.9977 6.7507H2.99768C2.4454 6.7507 1.99768 6.30299 1.99768 5.7507C1.99768 5.19842 2.4454 4.7507 2.99768 4.7507H4.46507C4.48746 4.74972 4.50968 4.74973 4.53167 4.7507H4.58469C4.6426 4.75034 4.70457 4.75034 4.77093 4.75034H7.33844L8.31879 2.46286ZM13.8903 3.37192L14.481 4.75034H9.5144L10.1052 3.37192C10.1367 3.29838 10.209 3.2507 10.289 3.2507L13.7064 3.2507C13.7864 3.2507 13.8587 3.29838 13.8903 3.37192Z" fill="#ffffff"></path>
                                  </svg>
                                </button>

                              </div>

                            )
                          }
                        </div>

                      </div>
                    ))

                  )
                }
              </div>

            </div>
            
            <div className='h-full w-1/3 p-4 flex items-start justify-start'>

                <form onSubmit={CreateUserShippingAddress} className='w-full bg-white mt-4 flex flex-col items-center justify-start p-3 rounded-sm'>

                    <h1 className='font-product text-xl'>Add New</h1>

                    <textarea name='delivery_address' className='mt-3 w-full h-36 resize-none p-3 outline-none font-product bg-gray-100 rounded-sm' type="text" required placeholder='Address... (Delivery Location, City name, District name and Province name)' />

                    <div className='w-full flex items-center justify-start mt-3'>
                        <input name='is_default' class="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:checked:scale-100 w-5 h-5 cursor-pointer" type="checkbox" />
                        <label class="font-product ml-1">Default</label>
                    </div>

                    <div className='w-full flex items-center justify-start mt-5'>
                        <input class="dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out dark:checked:scale-100 w-4 h-4 cursor-pointer" type="checkbox" required />
                        <label class="font-product ml-1 text-xs">I accept that any delivery mismatch due to this address will be my fault</label>
                    </div>


                    <button disabled={isCreateButtonDisabled} className='w-full h-13 bg-primary text-secondary font-product mt-6 rounded-sm cursor-pointer flex items-center justify-center' type='submit'>{isCreateButtonDisabled ? <BarLoader color='#ffffff' /> : "Create"}</button>

                </form>

            </div>

        </section>
    </>

  )

}

export default ManageUserShippingAddressScreen
