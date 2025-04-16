import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import useRefreshTokens from '../../../Components/Hooks/useRefreshTokens';
import api from '../../../axios';



function SellerRegistrationScreen() {

  const [isNumberFormButtonDisabled, setNumberFormButtonDisabled] = useState(false);
  const [isOTPFormButtonDisabled, setOTPFormButtonDisabled] = useState(false);
  const [isTwoFactorFormButtonDisabled, setTwoFactorFormButtonDisable] = useState(false);
  const [shouldShowTwoFactorForm, setShowTwoFactorForm] = useState(false);

  useRefreshTokens();

  const navigate = useNavigate();

  async function handleSellerRegistration(e) {

    e.preventDefault();
    
    setNumberFormButtonDisabled(true);

    const data_from_form = new FormData(e.target);
    const data_to_send = Object.fromEntries(data_from_form.entries()); // Convert FormData to an object

    try {

      const response = await api.post(`/authentication/seller_registration`, data_to_send);
      
      localStorage.setItem("verification_token",`${response.data.verification_token}`);
      
  
      let number_form = e.target;
      let seller_otp_form = document.getElementById("seller_otp_form");

      number_form.classList.add("scale-110");
      
      number_form.classList.add("opacity-0");

      setTimeout(() => {
        
        number_form.classList.add("hidden");

      }, 300);

      setTimeout(() => {

        seller_otp_form.classList.remove("hidden");
        
      }, 400);

      setTimeout(() => {

        seller_otp_form.classList.remove("opacity-0");
        seller_otp_form.classList.remove("scale-90");
        
      }, 500);

    } catch (error) {

      e.target.reset();

      setNumberFormButtonDisabled(false);

      const number_input = document.getElementById("number_input");
      const code_span = document.getElementById("code_span");
      const msg_span = document.getElementById("msg");

      number_input.classList.add("border-yellow-400");
      code_span.classList.add("border-yellow-400");

      msg_span.textContent = error.response ? error.response.data : error.message;

      msg_span.classList.add("text-yellow-400"); 

      setTimeout(() => {
        
        number_input.classList.remove("border-yellow-400");
        code_span.classList.remove("border-yellow-400");
        msg_span.classList.remove("text-yellow-400"); 
        msg_span.textContent = "Please Enter Your Phone Number To Continue";

      },4000);

      // Show an error message to the user if needed
    }


  }

  async function handleSellerOTPVerification(e) {
    
    e.preventDefault();
    
    const otp = inputRefs.current.map((input) => input.value).join("");
    
    setOTPFormButtonDisabled(true);

    try {
      
      const verification_token = localStorage.getItem("verification_token");
      
      const data = {
        "verification_token" : verification_token,
        "otp" : otp,
      };
      
      // Make the verification request
      const response = await api.post(`/authentication/seller_otp_verify`, data);

      console.log(response.data);

      localStorage.removeItem("verification_token");


      let otp_form = e.target;
      let success_div = document.getElementById("success_div");

      otp_form.classList.add("scale-110");
      otp_form.classList.add("opacity-0");
      setTimeout(() => {
        otp_form.classList.add("hidden");
      }, 200);

      if(response.data['is_two_step_enabled']){

        setTimeout(() => {
          success_div.classList.remove("hidden");
        }, 300);
  
        setTimeout(() => {
          success_div.classList.remove("translate-y-5");
          success_div.classList.remove("opacity-0");
        }, 600);
  
        setTimeout(() => {
          success_div.classList.add("scale-110");
          success_div.classList.add("opacity-0");
        }, 2200);
  
        setTimeout(() => {
          navigate("/store-basic-details");
        }, 3000);

      } else{

        setShowTwoFactorForm(true);

      }

      

    } catch (error) {
      console.error(
        "OTP verification failed:",
        error.response ? error.response.data : error.message
      );

      setOTPFormButtonDisabled(false);
    }
    
  }

  async function SetTwoFactorAuthentication(e) {

    e.preventDefault();

    const pin = twoFactorRefs.current.map((input) => input.value).join("");

    try{

      const response = await api.post(`/authentication/set_two_step_pin`, {two_factor_pin : pin});

      console.log(response.data);

      let pin_form = e.target;
      let success_div = document.getElementById("success_div");

      pin_form.classList.add("scale-110");
      pin_form.classList.add("opacity-0");
      setTimeout(() => {
        pin_form.classList.add("hidden");
      }, 200);

      setTimeout(() => {
        success_div.classList.remove("hidden");
      }, 300);

      setTimeout(() => {
        success_div.classList.remove("translate-y-5");
        success_div.classList.remove("opacity-0");
      }, 600);

      setTimeout(() => {
        success_div.classList.add("scale-110");
        success_div.classList.add("opacity-0");
      }, 2200);

      setTimeout(() => {
        navigate("/store-basic-details");
      }, 3000);

    }
    catch(error){

      console.log(error)

    }
    
  }

  const inputRefs = useRef([]); // To store references to all the input fields
  
  const twoFactorRefs = useRef([]);

  const handleInput = (e, index, of_form) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = value;

    if (of_form === "otp-verify"){

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus(); // Move to the next input
      }

    } else if(of_form === "two-factor-pin"){

      if (value && index < twoFactorRefs.current.length - 1) {
        twoFactorRefs.current[index + 1].focus(); // Move to the next input
      }

    } else{

      console.log("Wrong Form Type");

    }

  };

  const handleKeyDown = (e, index, form_type) => {

    if(form_type === "otp-verify"){

      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRefs.current[index - 1].focus(); // Move to the previous input
      }

    } else if(form_type === 'two-factor-pin'){

      if (e.key === "Backspace" && !e.target.value && index > 0) {
        twoFactorRefs.current[index - 1].focus(); // Move to the previous input
      }

    } else{

      console.log("Wrong Form Type");

    }
  };

  return (

    <section className='w-full h-screen flex items-center justify-center flex-col bg-primary'>

          

      <form className='flex flex-col transition items-center justify-center border-2 border-primary p-4 relative motion-preset-slide-up' style={{width : "24rem"}} onSubmit={handleSellerRegistration}>
        
        <h1 className='text-2xl font-monty mb-10 text-secondary'>Vendor Registration</h1>

        <div className='w-full flex items-center justify-center'>
          <span id='code_span' className='p-3 transition-all border-b-2 bg-transparent text-center text-secondary text-xl'>+92</span>
          <input className='p-3 outline-none no-autofill-background transition-all text-secondary w-full border-b-2 bg-transparent placeholder:text-slate-300 text-xl' type="text" autoFocus required name='store_contact_number' id='number_input'
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10); // Limit to 10 digits
              }
            }}
            placeholder="1234567890"
            style={{letterSpacing : "0.9rem"}}
          />

        </div>
        
        <p id='msg' className='capitalize text-sm transition-all text-secondary font-semibold mt-6 w-full text-center'>Please Enter Your Phone Number To Continue</p>

        <button disabled={isNumberFormButtonDisabled} type="submit" className='w-40 text-secondary h-14 mt-10 flex items-center justify-center border-2 border-secondary transition-all outline-none focus:bg-secondary focus:text-primary hover:bg-secondary hover:text-primary hover:w-44'>{isNumberFormButtonDisabled ? <BarLoader color="#ffffff" /> : "Continue"}</button>


      </form>
      
      <form onSubmit={handleSellerOTPVerification} className="flex flex-col items-center justify-center p-4 bg-transparent relative hidden opacity-0 transition scale-90 motion-preset-slide-up" style={{ width: "24rem" }} id='seller_otp_form'>

        <h1 className="text-2xl font-monty mb-7 text-secondary">Verify OTP</h1>

        <p className='text-sm text-secondary w-full text-center mb-8'>Enter OTP We've Sent On Your Phone Number</p>

        <div className="w-full flex items-center justify-between">
          {[0, 1, 2, 3].map((_, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputRefs.current[index] = el)} // Assign refs dynamically
              onInput={(e) => handleInput(e, index, "otp-verify")}
              onKeyDown={(e) => handleKeyDown(e, index, "two-factor-pin")}
              maxLength="1"
              className="border-2 border-secondary w-14 h-14 bg-transparent focus:outline-none text-xl text-secondary text-center placeholder:text-slate-300"
              placeholder='-'
              required
              />
            ))}
        </div>

        <button disabled={isOTPFormButtonDisabled} type="submit" className='w-full text-secondary h-14 flex items-center justify-center mt-10 border-2 border-secondary transition-all outline-none focus:bg-secondary focus:text-primary hover:bg-secondary hover:text-primary'>{isOTPFormButtonDisabled ? <BarLoader color="#ffffff" /> : "Submit"}</button>
      </form>
      
      {
        shouldShowTwoFactorForm ? (

          <form onSubmit={SetTwoFactorAuthentication} className="flex flex-col items-center justify-center p-4 bg-transparent relative transition scale-90 motion-preset-slide-up" style={{ width: "25rem" }} id='seller_otp_form'>

            <h1 className="text-2xl font-monty mb-4 text-secondary">Two Factor PIN</h1>

            <p className='text-sm text-secondary w-full text-center mb-1 font-product tracking-wider'>Set A 5 Digit PIN To Secure Your Account</p>
            <p className='text-sm w-full text-center mb-8 font-product text-yellow-400 tracking-wider'>You'll Be Prompted To Enter This PIN On Every Login</p>

            <div className="w-full flex items-center justify-between">
              {[0, 1, 2, 3, 4].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  ref={(rel) => (twoFactorRefs.current[index] = rel)} // Assign refs dynamically
                  onInput={(e) => handleInput(e, index, "two-factor-pin")}
                  onKeyDown={(e) => handleKeyDown(e, index, "two-factor-pin")}
                  maxLength="1"
                  className="border-2 border-secondary w-14 h-14 bg-transparent focus:outline-none text-xl text-secondary text-center placeholder:text-slate-300"
                  placeholder='-'
                  required
                  />
                ))}
            </div>

            <button disabled={isTwoFactorFormButtonDisabled} type="submit" className='w-full text-secondary h-14 flex items-center justify-center mt-10 border-2 border-secondary transition-all outline-none focus:bg-secondary focus:text-primary hover:bg-secondary hover:text-primary'>{isTwoFactorFormButtonDisabled ? <BarLoader color="#ffffff" /> : "Set"}</button>
          </form>

        ) : ""
      }
      


      <div className='flex flex-col items-center justify-center text-secondary text-2xl font-semibold transition opacity-0 hidden translate-y-5' id='success_div'>
        <h1 className='mb-5'>- GREAT WORK -</h1>
        <h1>ITS TIME TO SET UP YOUR STORE</h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="200" height="200" color="text-secondary" fill="none" className='absolute opacity-10'>
            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
    </section>

  )

}


export default SellerRegistrationScreen