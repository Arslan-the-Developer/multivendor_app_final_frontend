import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../HomeScreen/Components/Navbar'
import useFetchData from '../../Components/useFetchData';
import useRefreshTokens from '../../Components/useRefreshTokens';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import { Link } from 'react-router-dom';


function UserProfileScreen() {

    useRefreshTokens();

    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsData, setDetailsData] = useState(false);
    const [isChecked, setIsChecked] = useState(undefined);
    const [isTwoStepFormHidden, setTwoStepFormHidden] = useState(true);
    const [isSetPINButtonDisabled, setPINButtonDisble] = useState(false);
    const inputRefs = useRef([]);


    async function FetchUserDetails() {

        setDetailsLoading(true);

        try{

            const response = await axios({
                method : "get",
                url : "http://127.0.0.1:8000/authentication/get_user_details",
                withCredentials : true,
            })

            console.log(response.data);

            setDetailsData(response.data);

            setDetailsLoading(false);

            setIsChecked(response.data.is_protected);

        }
        catch (error){

            console.log(error);

            setDetailsLoading(false);

        }
        
    }

    async function ConfigureTwoStepVerification(e) {

        if(!isChecked){

            setTwoStepFormHidden(false);

        }
        
    }


    async function SetTwoFactorPIN(e) {

        e.preventDefault();

        setPINButtonDisble(true);

        const pin = inputRefs.current.map((input) => input.value).join("");

        const data = {
            two_factor_pin : pin
          };

        try {
            // Make the login request
            const response = await axios({
              method: "post",
              url: "http://127.0.0.1:8000/authentication/set_two_step_pin",
              data: data, // Send the form data
              withCredentials: true, // Include credentials such as cookies
              headers: {
                "Content-Type": "application/json", // Adjust the content type if needed
              },
            });
      
            console.log(response.data);
      
            setPINButtonDisble(false);

            setTwoStepFormHidden(true);

            FetchUserDetails();

      
        } catch (error) {

            // Handle errors
            console.error("Authentication Failed :", error.response ? error.response.data : error.message);
            
            setPINButtonDisble(false);
      
        }
        
    }

    useEffect(() => {

        FetchUserDetails();

    }, []);

    const handleInput = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        e.target.value = value;
    
        if (value && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus(); // Move to the next input
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputRefs.current[index - 1].focus(); // Move to the previous input
        }
    };

    if(detailsLoading){
        return (
            <div>Loading.....</div>
        )
    }

  return (

    <>
        <Navbar />

        <section className='w-full relative flex flex-col items-center justify-start mt-6' style={{height : "85vh"}}>

            {
                !isTwoStepFormHidden ? (
                    <div className='w-full h-full bg-secondary absolute flex items-center justify-center' style={{zIndex : "15"}}>

                        <form onSubmit={SetTwoFactorPIN} className={`font-product shadow-md flex flex-col items-center justify-center border-2 border-primary p-4 bg-white relative`} style={{width : "25rem"}}>

                            <h1 className='text-xl font-product font-semibold tracking-wider mb-3 text-primary'>Two Factor Authentication</h1>

                            <p className='w-full text-xs text-center mb-4 font-semibold tracking-wider text-yellow-600'>Setting This PIN Will Ensures Your Account Security</p>

                            <div className='flex items-center justify-around mt-2'>
                            {[0, 1, 2, 3, 4].map((_, index) => (
                                <input
                                key={index}
                                type="text"
                                ref={(el) => (inputRefs.current[index] = el)} // Assign refs dynamically
                                onInput={(e) => handleInput(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength="1"
                                className="border-2 border-primary w-14 h-14 focus:outline-none text-xl text-primary text-center mx-2 placeholder:text-primary"
                                placeholder='-'
                                required
                                />
                            ))}
                            </div>

                            <div className='flex items-center justify-between mt-8 w-full'>
                                <button type="submit" onClick={() => setTwoStepFormHidden(true)} className='w-1/2 cursor-pointer h-12 bg-gray-400 text-white transition outline-none flex items-center justify-center'>Back</button>
                                <button type="submit" disabled={isSetPINButtonDisabled} className='w-1/2 cursor-pointer h-12 bg-primary ml-2 text-white transition outline-none flex items-center justify-center'>{isSetPINButtonDisabled ? <BarLoader color="#ffffff" /> : "SET PIN"}</button>
                            </div>

                        </form>

                    </div>
                ) : ""
            }

            <div className='w-1/2 mt-10 flex flex-col items-center justify-start'>

                <div className='w-44 h-44 flex items-center justify-center relative'>
                    <img style={{zIndex : "2"}} className='object-contain object-center w-40 h-40 rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s" alt="" />
                    <span className='absolute rounded-full w-full h-full bg-primary opacity-30 scale-105'></span>
                </div>

                <div className='flex flex-col items-center font-product font-semibold tracking-wider mt-6 justify-center text-dull'>
                    <h1 className='text-xl'>{detailsData ? detailsData['username'] : ""}</h1>
                    <h1 className='text-sm opacity-40 tracking-widest mt-1'>{detailsData ? detailsData['email'] : ""}</h1>
                </div>

                <div className='w-3/4 flex flex-wrap items-center justify-between mt-8 font-product font-semibold text-dull'>

                    <div className='flex items-center justify-between px-4 bg-white w-1/2 rounded-sm h-12' style={{width : "49.5%"}}>

                        <h1>Is Seller</h1>

                        <h1 className={`${detailsData ? detailsData['is_seller'] ? "text-green-600" : "text-red-400" : ""}`}>{detailsData ? detailsData['is_seller'] ? "Yes" : "No" : ""}</h1>

                    </div>

                    <div className='flex items-center justify-between px-4 bg-white w-1/2 rounded-sm h-12' style={{width : "49.5%"}}>
                        <h1>Two Step Verification</h1>

                        <div className='flex items-center justify-center transition-all relative'>

                            <input onChange={(e) => {ConfigureTwoStepVerification(e)}} type="checkbox" className='relative shrink-0 appearance-none w-10 h-6 rounded-full bg-gray-300 checked:bg-green-300 transition-all duration-300 cursor-pointer' checked={isChecked}/>

                            <div className={`absolute flex items-center justify-center w-4 h-4 bg-white scale-90 rounded-full pointer-events-none transition-all duration-300 ${isChecked ? "translate-x-2" : "-translate-x-2"}`}>
                            </div>

                        </div>
                        
                    </div>

                    <div className='flex mt-2 items-center justify-between px-4 bg-white w-1/2 rounded-sm h-12' style={{width : "49.5%"}}>

                        <Link to={'/user-profile/manage-shipping-addresses'}>Manage Delivery Addresses</Link>

                    </div>

                </div>

            </div>
        </section>

    </>

  )

}


export default UserProfileScreen