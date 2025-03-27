import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarLoader } from 'react-spinners';
import { motion } from 'motion/react';


function UserRegistrationScreen() {

  const navigate = useNavigate();

  const [isSubmitButtonDisabled, setSubmitButtonDisable] = useState(false);

  const register_err_msg = localStorage.getItem('registration_error_message');

  function handle_register_error(msg){

    const register_err_element = document.getElementById('register_err');
  
      register_err_element.textContent = msg;

      register_err_element.style.opacity = "1";

      setTimeout(() => {

        register_err_element.style.opacity = "0";
    
      }, 3000);

  }

  useEffect(() => {

    if (register_err_msg){

      handle_register_error(`${register_err_msg}`);
  
    }

  });

  
  localStorage.removeItem("registration_error_message");


  async function handleRegister(e) {
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
        url: `${import.meta.env.VITE_API_URL}/authentication/user_registration`,
        data: data, // Send the form data
        withCredentials: true, // Include credentials such as cookies
        headers: {
          "Content-Type": "application/json", // Adjust the content type if needed
        },
      });
  
      // Handle the response
      console.log(response.data);

      localStorage.setItem("verification_token",response.data['verification_token']);

      navigate("/user-otp-verify");


    } catch (error) {
      // Handle errors
      console.error("Registration failed:", error.response ? error.response.data : error.message);

      handle_register_error(error.response ? error.response.data.error : "");

      setSubmitButtonDisable(false);
      // Show an error message to the user if needed
    }
  }

  return (

    <>

    <section className='w-full h-screen relative flex items-center justify-center'>

      <div class="min-h-screen w-full flex flex-col items-center justify-center py-6 px-4 font-product">
            <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
              <div>
                <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-dull max-md:hidden">Create Your</h2>
                <p className='font-lilita font-light lg:text-5xl text-3xl lg:leading-[57px] text-dull max-md:w-full max-md:text-4xl max-md:text-center max-md:flex max-md:items-center max-md:justify-center'><p className='font-product text-2xl max-md:flex mr-3 hidden'>Register To</p>Vend<span className='text-primary'>ezy</span></p>
                <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-dull max-md:hidden">Account</h2>
                <p class="text-sm mt-6 text-slate-500 leading-relaxed max-md:hidden">Create your free vendezy account and join explore the storm of products from best & verified sellers gathered together on one platform and Happy Shopping!</p>
                <p class="text-sm mt-12 text-slate-500 max-md:hidden">Already A Member? <Link to={'/user-login'} class="text-primary font-medium hover:underline ml-1">Login here</Link></p>
              </div>

              <motion.form initial={{opacity : 0, y : -30}} animate={{opacity : 1, y : 0}} class="max-w-md md:ml-auto w-full" onSubmit={handleRegister}>

                <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-5 max-md:hidden">
                  Create Account
                </h3>

                <div class="space-y-6">
                  <div>
                    <label class='text-sm text-slate-800 font-medium block'>Username</label>
                    <input name="name" type="text" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Enter Username"/>
                  </div>
                  <div>
                    <label class='text-sm text-slate-800 font-medium block'>Email</label>
                    <input name="email" type="email" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Enter Email" />
                  </div>
                  <div>
                    <label class='text-sm text-slate-800 font-medium block'>Password</label>
                    <input name="password" type="password" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Enter Password" />
                  </div>
                  <div>
                    <label class='text-sm text-slate-800 font-medium block'>Re-enter Password</label>
                    <input name="password" type="password" required class="bg-secondary w-full text-sm text-primary px-4 py-3 rounded-sm outline-none border-2 border-gray-500 focus:border-primary focus:bg-transparent" placeholder="Confirm Password" />
                  </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center'>

                  <div className='w-full flex items-center justify-between text-primary my-3'>
                    <hr className='border border-less-primary' style={{width : "46%"}} />
                    <p>or</p>
                    <hr className='border border-less-primary' style={{width : "46%"}} />
                  </div>

                  <Link to={`${import.meta.env.VITE_API_URL}/authentication/login/google/`} className='flex items-center justify-center w-full py-3 rounded-sm font-bold text-2xl text-primary transition font-product border-none shadow-md tracking-wider' style={{boxShadow : "0 0 5px 0px rgba(0,0,0,.2)"}}> <span className='text-blue-400'>G</span><span className='text-red-400'>o</span><span className='text-yellow-400'>o</span><span className='text-blue-400'>g</span><span className='text-green-500'>l</span><span className='text-red-400'>e</span> </Link>

                </div>

                <div class="!mt-8">
                  <button disabled={isSubmitButtonDisabled} type="submitt" class="w-full shadow-xl py-4 tracking-wider cursor-pointer px-4 text-sm font-semibold rounded text-white bg-primary hover:bg-[#015956] transition-all focus:outline-none">
                    {isSubmitButtonDisabled ? <BarLoader color="#ffffff" /> : "Register"}
                  </button>
                </div>

                <p className='w-full hidden items-center justify-center mt-5 max-md:flex'>Have An Account? <Link to={'/user-login'} className='text-primary ml-1 hover:underline'>Login Here</Link></p>

              </motion.form>
            </div>
          </div>

    </section>

    </>

  )

}

export default UserRegistrationScreen