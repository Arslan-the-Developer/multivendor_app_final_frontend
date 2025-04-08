import React, { useEffect, useState } from 'react'
import Navbar from '../HomeScreen/Components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuantityInputForCart from '../../Components/QuantityInputForCart';
import { BarLoader } from 'react-spinners';
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';
import useCheckAuthentication from '../../Components/Hooks/useCheckAuthentication';


function UserCartScreen() {

  useRefreshTokens();

  let navigate = useNavigate();

  let [cartProducts, setCartProducts] = useState([]);
  let [loadingProducts, setLoadingProducts] = useState(false);
  let [isRemoveButtonDisabled, setRemoveButtonDisabled] = useState(false);
  let [isClearCartButtonDisabled, setClearCartButtionDisable] = useState(false);
  let [isCheckoutButtonDisabled, setCheckoutButtonDisabled] = useState(false);
  let [cartTotal, setCartTotal] = useState(0);
  let [totalCartProducts, setTotalCartProducts] = useState(0);

  const { isAuthenticated, isSeller, isApprovedSeller, isStoreBasicInfoAdded, isStoreIDInfoAdded, isStoreRejected, loading } = useCheckAuthentication();

  async function UpdateCartTotal() {

    const total = cartProducts.reduce((sum, product) => 
      sum + product.product.product_price * product.quantity, 0);

    setCartTotal(total);
    
  }

  async function FetchUserCartProducts() {

    try{

      setLoadingProducts(true);

      const response = await axios({
        method : "get",
        url : "http://127.0.0.1:8000/api/get_user_cart_products",
        withCredentials : true,
      })

      console.log(response.data);
      
      setCartProducts(response.data);

      setTotalCartProducts(response.data.length);

      setLoadingProducts(false);

    } catch (error) {

      console.log(error);

      setLoadingProducts(false);

    }
    
  }

  useEffect(() => {
    FetchUserCartProducts();
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      UpdateCartTotal();
    }
  }, [cartProducts]); 

  
  async function RemoveCartProduct(e, product_id) {

    e.preventDefault();

    try{

      setRemoveButtonDisabled(true);

      const response = await axios({
        method : "delete",
        url : "http://127.0.0.1:8000/api/add_modify_cart_product",
        withCredentials : true,
        data : {
          product_id : product_id,
        }
      })

      console.log(response.data);

      setRemoveButtonDisabled(false);

      FetchUserCartProducts();

    } catch (error) {

      console.log(error);

      setRemoveButtonDisabled(false);

    }
    
  }
  
  
  async function UpdateCartProduct(product_id, product_quantity) {

    try{

      const response = await axios({
        method : "put",
        url : "http://127.0.0.1:8000/api/add_modify_cart_product",
        withCredentials : true,
        data : {
          product_id : product_id,
          product_quantity : product_quantity,
        }
      })

      console.log(response.data);


    } catch (error) {

      console.log(error);

    }
    
  }


  async function ClearCart() {

    setClearCartButtionDisable(true);

    try{
      
      const response = await axios({
        method : "get",
        url : "http://127.0.0.1:8000/api/clear_user_cart",
        withCredentials : true,
      });

      console.log(response.data);

      FetchUserCartProducts();

      setClearCartButtionDisable(false);

    } catch(error){

      console.log(error);
      
      setClearCartButtionDisable(false);

    }
    
  }


  async function CartCheckout(e) {

    e.preventDefault();

    setCheckoutButtonDisabled(true);

    try{

      const response = await axios({
        method : "post",
        url : "http://127.0.0.1:8000/api/create_user_cart_order",
        withCredentials : true,
      })

      console.log(response.data);

      navigate(`/order/${response.data['order_id']}/payment`);

      setCheckoutButtonDisabled(false);

    } catch(error){

      console.log(error);

      setCheckoutButtonDisabled(false);

    }
    
  }

  if (!isAuthenticated){

    return navigate("/user-login");

  }

  return (

    <>
        <Navbar />
        <section className='w-full absolute bottom-0 flex items-center justify-start py-8' style={{height : "90%"}}>

            {
              loadingProducts ? (

                <h1>Loading.....</h1>

              ) : (

                cartProducts.length < 1 ? (

                  <div className='w-full h-full flex flex-col items-center justify-center'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/shopping-cart-remove-01-stroke-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                      <path d="M3 2.5H5.5L7.72878 16.3185C7.88509 17.2876 8.72163 18 9.70327 18H18" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M9.25 21.5C10.2165 21.5 11 20.7165 11 19.75C11 18.7835 10.2165 18 9.25 18C8.2835 18 7.5 18.7835 7.5 19.75C7.5 20.7165 8.2835 21.5 9.25 21.5Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M18.25 21.5C19.2165 21.5 20 20.7165 20 19.75C20 18.7835 19.2165 18 18.25 18C17.2835 18 16.5 18.7835 16.5 19.75C16.5 20.7165 17.2835 21.5 18.25 21.5Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M8 15.5L19.5 13.5L21 5.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M11 4.5L16 9.5M11 9.5L16 4.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>

                    <h1 className='mt-6 font-product text-2xl font-semibold tracking-wider text-primary'>Your Cart Is Empty</h1>

                    <Link to={"/"} className='px-6 py-4 bg-primary rounded mt-8 text-white transition hover:scale-95 hover:shadow-lg'>Explore Products</Link>

                  </div>

                ) : (

                  <div className='w-3/4 h-full flex flex-wrap items-start justify-around content-start p-6 overflow-y-scroll custom-scrollbar'>

                    {
                    cartProducts.map((product) => (
  
                      <div key={product.product.id} className='h-40 bg-white p-3 mt-3 rounded-md shadow-md flex items-start justify-start group' style={{width : "49%"}}>

                        <div className='w-3/12 h-full flex items-start justify-start'>

                          <img className='w-full h-full object-contain object-center' src={`http://127.0.0.1:8000${product.product.product_images[0].image}`} alt="" />

                        </div>

                        <div className='w-1/2 h-full flex flex-col items-start justify-center px-6 py-1'>

                          <h1 className='font-product tracking-wider font-semibold'>{product.product.product_name}</h1>
                          
                          <h1 className='font-product tracking-wider font-semibold flex items-center justify-center text-sm text-primary mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/store-03-stroke-rounded.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#006964">
                              <path d="M3.00003 10.9871V15.4925C3.00003 18.3243 3.00003 19.7403 3.87871 20.62C4.75739 21.4998 6.1716 21.4998 9.00003 21.4998H15C17.8284 21.4998 19.2426 21.4998 20.1213 20.62C21 19.7403 21 18.3243 21 15.4925V10.9871" stroke="#006964" strokeWidth="1.5"></path>
                              <path d="M15 16.9768C14.3159 17.584 13.2268 17.9768 12 17.9768C10.7732 17.9768 9.68412 17.584 9.00003 16.9768" stroke="#006964" strokeWidth="1.5" strokeLinecap="round"></path>
                              <path d="M17.7957 2.50294L6.14986 2.53202C4.41169 2.44248 3.96603 3.78259 3.96603 4.43768C3.96603 5.02359 3.89058 5.87774 2.82527 7.4831C1.75996 9.08846 1.84001 9.56536 2.44074 10.6767C2.93931 11.5991 4.20744 11.9594 4.86865 12.02C6.96886 12.0678 7.99068 10.2517 7.99068 8.97523C9.03254 12.1825 11.9956 12.1825 13.3158 11.8157C14.6386 11.4483 15.7717 10.1331 16.0391 8.97523C16.195 10.4142 16.6682 11.2538 18.0663 11.8308C19.5145 12.4284 20.7599 11.515 21.3848 10.9294C22.0097 10.3439 22.4107 9.04401 21.2968 7.6153C20.5286 6.63001 20.2084 5.7018 20.1033 4.73977C20.0423 4.18234 19.9888 3.58336 19.5972 3.20219C19.0248 2.64515 18.2036 2.47613 17.7957 2.50294Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            <span className='ml-1'>
                              {product.product.product_store.store_name}
                            </span>
                          </h1>

                          <h2 className='mt-2 font-product font-semibold text-primary'>{product.product.product_price}/-</h2>

                        </div>

                        <div className='relative w-3/12 h-full flex flex-col items-center justify-center'>

                            <button onClick={(e) => RemoveCartProduct(e, product.product.id)} disabled={isRemoveButtonDisabled} className='absolute bottom-0 w-full h-10 flex items-center justify-center right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-sm bg-red-500'>

                              {
                                isRemoveButtonDisabled ? (

                                  <BarLoader color='#ffffff' />

                                ) : (
                              
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/delete-02-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#ffffff">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4.63751 20.1665L3.82444 6.75092L3.73431 5.06621C3.72513 4.89447 3.8619 4.75018 4.03388 4.75018H19.9945C20.1685 4.75018 20.306 4.89769 20.2938 5.07124L20.1756 6.75092L19.3625 20.1665C19.2745 21.618 18.0717 22.7502 16.6176 22.7502H7.38247C5.9283 22.7502 4.72548 21.618 4.63751 20.1665ZM8.74963 16.5002C8.74963 16.9144 9.08542 17.2502 9.49963 17.2502C9.91385 17.2502 10.2496 16.9144 10.2496 16.5002V10.5002C10.2496 10.086 9.91385 9.75018 9.49963 9.75018C9.08542 9.75018 8.74963 10.086 8.74963 10.5002V16.5002ZM14.4996 9.75018C14.9138 9.75018 15.2496 10.086 15.2496 10.5002V16.5002C15.2496 16.9144 14.9138 17.2502 14.4996 17.2502C14.0854 17.2502 13.7496 16.9144 13.7496 16.5002V10.5002C13.7496 10.086 14.0854 9.75018 14.4996 9.75018Z" fill="#ffffff"></path>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.31879 2.46286C8.63394 1.7275 9.35702 1.2507 10.1571 1.2507H13.8383C14.6383 1.2507 15.3614 1.7275 15.6766 2.46286L16.6569 4.75034H19.2239C19.2903 4.75034 19.3523 4.75034 19.4102 4.7507H19.4637C19.4857 4.74973 19.5079 4.74972 19.5303 4.7507H20.9977C21.55 4.7507 21.9977 5.19842 21.9977 5.7507C21.9977 6.30299 21.55 6.7507 20.9977 6.7507H2.99768C2.4454 6.7507 1.99768 6.30299 1.99768 5.7507C1.99768 5.19842 2.4454 4.7507 2.99768 4.7507H4.46507C4.48746 4.74972 4.50968 4.74973 4.53167 4.7507H4.58469C4.6426 4.75034 4.70457 4.75034 4.77093 4.75034H7.33844L8.31879 2.46286ZM13.8903 3.37192L14.481 4.75034H9.5144L10.1052 3.37192C10.1367 3.29838 10.209 3.2507 10.289 3.2507L13.7064 3.2507C13.7864 3.2507 13.8587 3.29838 13.8903 3.37192Z" fill="#ffffff"></path>
                                  </svg>

                                )
                              }

                            </button>

                          <QuantityInputForCart currentValue={product.quantity} productID={product.product.id} updateFunction={UpdateCartProduct} />

                        </div>

                      </div>
                      
                    ))
                    }

                  </div>

                  
                )

              )
            }

            {
              !(cartProducts.length < 1) ? (

                <div className='w-1/4 h-full flex flex-col items-start justify-start py-8 pr-5 font-product font-semibold tracking-wider relative overflow-hidden'>


                  <div className='w-full relative flex flex-col items-center overflow-hidden justify-start p-4 bg-white shadow-lg rounded-md' style={{height : "55%", zIndex : "2"}}>

                    <h3 className='text-primary scale-110'>Cart Total</h3>

                    <hr className='w-full border border-gray-200 my-4' />

                    <div className='w-full flex items-center justify-between pr-4 pl-2 mt-4'>
                      <h2>Total Products : </h2>
                      <h2>{totalCartProducts}</h2>
                    </div>
                    
                    <div className='w-full flex items-center justify-between pr-4 pl-2 mt-6'>
                      <h2>Discounts {`(Rs)`} : </h2>
                      <h2>0</h2>
                    </div>
                    
                    <div className='w-full flex absolute bottom-5 left-7 items-center justify-between text-xl pr-14'>
                      <h2>Total {`(Rs)`} : </h2>
                      <h2 className='text-primary'>{cartTotal}/-</h2>
                    </div>

                  </div>

                  <div className='w-full flex items-center justify-center h-16 bg-white -translate-y-1 shadow-lg transition-all hover:translate-y-2 overflow-hidden rounded-md'>

                    <button disabled={isCheckoutButtonDisabled} onClick={(e) => CartCheckout(e)} className='bg-primary text-secondary w-1/2 h-full flex items-center justify-center cursor-pointer group'>{isCheckoutButtonDisabled ? <BarLoader color='#ffffff' /> : <h2 className='group-hover:scale-105 transition-all'>Checkout</h2>}</button>
                    <button onClick={ClearCart} disabled={isClearCartButtonDisabled} className='bg-red-600 text-secondary w-1/2 h-full flex items-center justify-center cursor-pointer group'><h2 className='group-hover:scale-105 transition-all'>{isClearCartButtonDisabled ? <BarLoader color='#ffffff' /> : "Clear Cart"}</h2></button>

                  </div>

                </div>

              ) : ""
            }

        </section>
    </>

  )

}

export default UserCartScreen