import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarLoader } from 'react-spinners';
import { motion } from 'motion/react';

function UserLoginScreen() {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isSubmitButtonDisabled, setSubmitButtonDisable] = useState(false);
  const [isVerifyButtonDisabled, setVerifyButtonDisable] = useState(false);
  const [isTwoStepFormHidden, setTwoStepFormHidden] = useState(true);
  const inputRefs = useRef([]);

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

  async function handleLogin(e) {
    
    e.preventDefault();

    setSubmitButtonDisable(true);
  
    // Transform form data into an object
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    try {
      // Make the login request
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/authentication/user_login`,
        data: data, // Send the form data
        withCredentials: true, // Include credentials such as cookies
        headers: {
          "Content-Type": "application/json", // Adjust the content type if needed
        },
      });
  
      // Handle the response
      console.log("Login successful:", response.data);

      localStorage.setItem('is_restricted', response.data['is_restricted_account']);
      

      if(response.data['is_restricted_account']){

        localStorage.setItem('user_email', response.data['email']);

        setTwoStepFormHidden(false);

        e.target.classList.add("hidden");

      } 
      else{

        localStorage.setItem('store_date', response.data['store_date']);
        localStorage.setItem('store_time', response.data['store_time']);

        navigate("/");

      }

      setSubmitButtonDisable(false);


    } catch (error) {
      // Handle errors
      console.error("Login failed:", error.response ? error.response.data : error.message);

      setLoginError(error.response ? error.response.data.error : "");

      setTimeout(() => {
        setLoginError("");
      }, 1500);

      setSubmitButtonDisable(false);
      // Show an error message to the user if needed
    }
  }
  
  async function handleStaffPassword(e) {
    
    e.preventDefault();

    setVerifyButtonDisable(true);

    const user_email = localStorage.getItem("user_email");
    const pin = inputRefs.current.map((input) => input.value).join("");
  
    const data = {
      user_email : user_email,
      two_step_pin : pin
    };
  
    try {
      // Make the login request
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/authentication/verify_two_step_pin",
        data: data, // Send the form data
        withCredentials: true, // Include credentials such as cookies
        headers: {
          "Content-Type": "application/json", // Adjust the content type if needed
        },
      });

      console.log(response.data);

      setVerifyButtonDisable(false);

      localStorage.setItem('store_date', response.data['store_date']);
      localStorage.setItem('store_time', response.data['store_time']);
      localStorage.removeItem("is_restricted");
      localStorage.removeItem("user_email");

      navigate("/");


    } catch (error) {
      // Handle errors
      console.error("Authentication Failed :", error.response ? error.response.data : error.message);
      
      setVerifyButtonDisable(false);

    }
  }

  return (

    <section className='w-full h-screen relative flex items-center justify-center'>

      <div class="min-h-screen w-full flex flex-col items-center justify-center py-6 px-4 font-product">
            <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
              <div>
                <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-dull max-md:hidden">Login To Your</h2>
                <p className='font-lilita font-light lg:text-5xl text-3xl lg:leading-[57px] text-dull max-md:w-full max-md:text-4xl max-md:text-center max-md:flex max-md:items-center max-md:justify-center'><p className='font-product text-2xl max-md:flex mr-3 hidden'>Sign into</p>Vend<span className='text-primary'>ezy</span></p>
                <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-dull max-md:hidden">Account</h2>
                <p class="text-sm mt-6 text-slate-500 leading-relaxed max-md:hidden">Login to your account and shop from the best & verified sellers gathered together on one platform and Happy Shopping!</p>
                <p class="text-sm mt-12 text-slate-500 max-md:hidden">Don't have an account <Link to={'/user-register'} class="text-primary font-medium hover:underline ml-1">Register here</Link></p>
              </div>

              <motion.form initial={{opacity : 0, y : -30}} animate={{opacity : 1, y : 0}} class="max-w-md md:ml-auto w-full" onSubmit={handleLogin}>

                {loginError && <p id="login_err" className='py-3 bg-red-500 text-center text-white -top-16 w-full absolute'>{loginError}</p>}

                <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-8 max-md:hidden">
                  Sign in
                </h3>

                <div class="space-y-6">
                  <div>
                    <label class='text-sm text-slate-800 font-medium mb-2 block'>Email</label>
                    <input name="email" type="email" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Enter Email" />
                  </div>
                  <div>
                    <label class='text-sm text-slate-800 font-medium mb-2 block'>Password</label>
                    <input name="password" type="password" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Enter Password" />
                  </div>
                  <div class="flex flex-wrap items-center justify-between gap-4">
                    <div class="text-sm">
                      <Link class="text-primary hover:text-green-600 transition-all font-medium">
                        Forgot your password?
                      </Link>
                    </div>
                    <div class="text-sm hidden max-md:flex">
                      <Link to={`/user-register`} class="text-primary hover:text-green-600 transition-all font-medium">
                        Create Account
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="!mt-8">
                  <button disabled={isSubmitButtonDisabled} type="submitt" class="w-full shadow-xl py-4 px-4 text-sm font-semibold rounded text-white bg-primary hover:bg-[#015956] transition-all focus:outline-none">
                    {isSubmitButtonDisabled ? <BarLoader color="#ffffff" /> : "Login"}
                  </button>
                </div>

              </motion.form>
            </div>
          </div>

        
        <form onSubmit={handleStaffPassword} className={`${isTwoStepFormHidden ? 'hidden' : ''} font-product shadow-md flex flex-col items-center justify-center border-2 border-primary p-4 bg-white relative`} style={{width : "25rem"}}>

            <h1 className='text-xl font-product font-semibold tracking-wider mb-3 text-primary'>Two Factor Authentication</h1>

            <p className='w-full text-xs text-center mb-4 font-semibold tracking-wider text-yellow-600'>This Account Is Restricted Enter 2-Step Verification PIN</p>

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
                  required
                  placeholder='-'
                />
              ))}
            </div>

            <button type="submit" disabled={isVerifyButtonDisabled} className='w-full mt-8 cursor-pointer h-12 bg-primary text-secondary transition outline-none flex items-center justify-center'>{isVerifyButtonDisabled ? <BarLoader color="#ffffff" /> : "Verify"}</button>

        </form>

    </section>

  )

}

export default UserLoginScreen