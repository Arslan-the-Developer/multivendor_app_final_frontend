import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import useFetchData from '../../Components/useFetchData';
import useRefreshTokens from '../../Components/useRefreshTokens';

import SellerDashboard from './Components/SellerDashboard';
import SellerProductsScreen from './Components/SellerProductsScreen';
import SellerSalesTab from './Components/SellerSalesTab';
import SellerOrdersScreen from './Components/SellerOrdersScreen';




function SellerHomeScreen() {

    const [isDashboardTabActive, setDashboardTabActive] = useState(true);
    const [isProductsTabActive, setProductsTabActive] = useState(false);
    const [isSalesTabActive, setSalesTabActive] = useState(false);
    const [isEarningsTabActive, setEarningsTabActive] = useState(false);
    const [isOrdersTabActive, setOrdersTabActive] = useState(false);

    useRefreshTokens();

    const navigate = useNavigate();

    async function SetTabAsActive(tab_name) {

        switch(tab_name){

            case 'dashboard':

                setDashboardTabActive(true);
                setProductsTabActive(false);
                setSalesTabActive(false);
                setEarningsTabActive(false);
                setOrdersTabActive(false);

                break;

            case 'products':

                setDashboardTabActive(false);
                setProductsTabActive(true);
                setSalesTabActive(false);
                setEarningsTabActive(false);
                setOrdersTabActive(false);

                break;

            case 'sales':

                setDashboardTabActive(false);
                setProductsTabActive(false);
                setSalesTabActive(true);
                setEarningsTabActive(false);
                setOrdersTabActive(false);

                break;

            case 'earnings':

                setDashboardTabActive(false);
                setProductsTabActive(false);
                setSalesTabActive(false);
                setEarningsTabActive(true);
                setOrdersTabActive(false);

                break;

            case 'orders':

                setDashboardTabActive(false);
                setProductsTabActive(false);
                setSalesTabActive(false);
                setEarningsTabActive(false);
                setOrdersTabActive(true);

                break;
        }
        
    }

    const { data: authData, error: authError, loading: authLoading } = useFetchData("authentication/check_user_authentication", "get", null, 1);
    const { data: sellerAuthData, error: sellerAuthError, loading: sellerAuthLoading } = useFetchData("authentication/check_seller", "get", null, 1);


    const isAuthenticated = !authError || authError.status !== 403;
    const isSeller = sellerAuthData?.is_seller && sellerAuthData?.is_approved_seller;

    console.log(isSeller, isAuthenticated);


    const [isSidebarOpened, setSidebarOpen] = useState(true);

    const keyRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
        keyRef.current = event.keyCode;

        if (event.ctrlKey && keyRef.current === 66) {
            
            event.preventDefault();
            
            event.stopPropagation();
      
            console.log('Ctrl + b pressed!');

            setSidebarOpen((prevState) => !prevState);

            console.log('isSidebarOpened:', isSidebarOpened);

          } else if (event.ctrlKey && keyRef.current === 75) {
            
            event.preventDefault();

            console.log('Ctrl + k pressed!');

            document.getElementById("search_input").focus();

          }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if(!isAuthenticated || !isSeller){

        return (
            <section className='w-full h-screen flex flex-col items-center justify-center text-center'>

                <h2 className='flex items-center justify-center text-6xl font-lilita text-primary' style={{fontSize : "180px", letterSpacing : '-1.8rem', WebkitTextStroke : "2px white"}}>
                    <span style={{zIndex : "3"}}>4</span>
                    <span style={{zIndex : "2"}}>0</span>
                    <span style={{zIndex : "1"}}>4</span>
                </h2>

                <h4 className='text-3xl mt-3 font-lilita text-primary uppercase ml-10'>Page Not Found</h4>

                <Link to={"/"} className='px-8 py-3 border-2 border-primary ml-10 mt-6'>Back To Home</Link>   

            </section>
        );

    }

  return (

    <section className='w-full h-screen flex items-start justify-start overflow-hidden'>

        <nav className={isSidebarOpened ? 'w-1/4 p-3 h-screen flex flex-col items-center justify-start bg-white relative transition-all duration-300' : 'w-12 h-screen flex items-center justify-center bg-white transition-all duration-300'} >

            {
                isSidebarOpened ? (
                    <>
                        <button onClick={() => {setSidebarOpen(false)}} className={`cursor-pointer absolute bg-white w-6 rounded-e-md h-40 transition flex items-center justify-center group`} style={{top : "50%", right : "-10%", transform : "translate(-50%, -50%)", zIndex : "3"}} title='Close Sidebar'>
                            <svg className='group-hover:scale-125 transition' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#006964"} fill={"none"}>
                                <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <p className='font-lilita mt-2 text-3xl'>Vend<span className="text-primary">ezy</span></p>
                        <div className='w-full flex items-center justify-start flex-col mt-8'>
                            <button onClick={() => SetTabAsActive('dashboard')} className={`w-full py-4 text-dull transition-all duration-300 ${isDashboardTabActive ? "bg-less-primary text-primary font-semibold rounded-md" : ""}`}>Dashboard</button>
                            <button onClick={() => SetTabAsActive('products')} className={`w-full py-4 mt-1 text-dull transition-all duration-300 ${isProductsTabActive ? "bg-less-primary text-primary font-semibold rounded-md" : ""}`}>Products</button>
                            <button onClick={() => SetTabAsActive('sales')} className={`w-full py-4 mt-1 text-dull transition-all duration-300 ${isSalesTabActive ? "bg-less-primary text-primary font-semibold rounded-md" : ""}`}>Sales</button>
                            <button onClick={() => SetTabAsActive('orders')} className={`w-full py-4 mt-1 text-dull transition-all duration-300 ${isOrdersTabActive ? "bg-less-primary text-primary font-semibold rounded-md" : ""}`}>Orders</button>
                            <button onClick={() => SetTabAsActive('earnings')} className={`w-full py-4 mt-1 text-dull transition-all duration-300 ${isEarningsTabActive ? "bg-less-primary text-primary font-semibold rounded-md" : ""}`}>Earnings</button>
                        </div>
                    </>
                ) : (
                    <button onClick={() => {setSidebarOpen(true)}} className={'cursor-pointer transition hover:translate-x-1 hover:scale-110 absolute'} title='Open Sidebar'>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                            <path d="M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )
            }

        </nav>

            
        <section className='w-full h-full flex flex-col items-center justify-start relative' style={{background : "#f3faf6"}}>

            <div className='w-full flex items-end justify-center h-16 relative bg-transparent pt-5'>

                <form className='w-2/5 flex items-end justify-end relative'>

                    <input id='search_input' type="text" className='w-full py-2 px-3 border border-primary rounded-sm font-normal tracking-wide outline-none placeholder:text-gray-400 font-product' placeholder='Search . . . (ctrl + k)' />

                </form>

                <div className='flex items-center justify-end absolute right-8'>

                    <button className='mr-6 outline-none' title='Options'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                            <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </button>

                    <button className='mr-6 outline-none' title='Notifications'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                            <path d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="" className='w-10 h-10 rounded-full bg-primary object-cover object-center'/>

                </div>

            </div>


            {
                isDashboardTabActive ? (

                    <SellerDashboard />

                ) : ""

            }

            {
                isProductsTabActive ? (

                    <SellerProductsScreen />

                ) : ""
            }

            {
                isSalesTabActive ? (

                    <SellerSalesTab />

                ) : ""
            }

            {
                isOrdersTabActive ? (

                    <SellerOrdersScreen />

                ) : ""
            }


        </section>

    </section>


  )
}

export default SellerHomeScreen