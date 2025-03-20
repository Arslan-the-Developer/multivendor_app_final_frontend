import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarLoader } from 'react-spinners';


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

    <section className='w-full h-screen flex flex-col items-center justify-center'>

        <form onSubmit={handleRegister} className='shadow-md flex flex-col items-center justify-center border-2 border-primary p-4 bg-white relative' style={{width : "25rem"}}>
            
            <p id="register_err" className='py-3 bg-red-500 text-center text-white -top-16 w-full absolute transition opacity-0'></p>

            <Link to={"/"} className="text-4xl font-lilita mb-6">Vend<span className="text-primary">ezy</span></Link>

            <input name='username' type="text" placeholder='Username' className='w-full px-2 py-3 placeholder:text-primary text-primary outline-none border-2 border-primary mb-4' required />
            
            <input name='email' type="email" placeholder='Email' className='w-full px-2 py-3 placeholder:text-primary text-primary outline-none border-2 border-primary' required />

            <input name='password' type="password" placeholder='Password' className='w-full px-2 py-3 placeholder:text-primary text-primary outline-none border-2 border-primary mt-4 font-verdana placeholder:font-monty' required/>
            
            <input name='password2' type="password" placeholder='Confirm Password' className='w-full px-2 py-3 placeholder:text-primary text-primary outline-none border-2 border-primary mt-4 font-verdana placeholder:font-monty' required/>

            <hr className='w-full border border-gray-300 my-4' />

            <Link to={"http://localhost:8000/authentication/login/google/"} className='flex items-center justify-center w-full py-3 rounded-sm font-bold text-2xl text-primary transition font-product border-none shadow-md tracking-wider' style={{boxShadow : "0 0 5px 0px rgba(0,0,0,.2)"}}> <span className='text-blue-400'>G</span><span className='text-red-400'>o</span><span className='text-yellow-400'>o</span><span className='text-blue-400'>g</span><span className='text-green-500'>l</span><span className='text-red-400'>e</span> </Link>

            <button type="submit" disabled={isSubmitButtonDisabled} className='w-full mt-5 h-12 bg-primary text-secondary transition outline-none flex items-center justify-center'>{isSubmitButtonDisabled ? <BarLoader color="#ffffff" /> : "Register"}</button>

            <p className='mt-4 text-sm text-primary'>Have An Account??<Link to={"/user-login"} className='ml-1 underline hover:text-dull focus:text-dull outline-none'>Login</Link></p>

        </form>

    </section>

  )

}

export default UserRegistrationScreen