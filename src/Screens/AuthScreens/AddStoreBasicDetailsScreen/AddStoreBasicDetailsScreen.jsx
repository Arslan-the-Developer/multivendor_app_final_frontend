import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BarLoader} from 'react-spinners'
import useRefreshTokens from '../../../Components/Hooks/useRefreshTokens';
import useCheckAuthentication from '../../../Components/Hooks/useCheckAuthentication';



function AddStoreBasicDetailsScreen() {

    useRefreshTokens();

    const navigate = useNavigate();

    const { isAuthenticated, isSeller, isApprovedSeller, isStoreBasicInfoAdded, isStoreIDInfoAdded, isStoreRejected, loading } = useCheckAuthentication();      

    useEffect(() => {
        if (!loading && (!isAuthenticated || !isSeller)) {
            navigate("/");
          }
    }, [isAuthenticated, navigate]);

    // Prevent rendering if navigation is in process


    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result); // Set the image preview URL
        };
        reader.readAsDataURL(file); // Convert image file to base64 URL
        }
    };


    function handle_error_msg(msg){

        let error_element = document.getElementById("error_element");

        error_element.classList.remove("bg-primary");
        error_element.classList.remove("text-xl");
        error_element.classList.add("text-md");
        error_element.classList.add("bg-red-500");

        error_element.textContent = msg;

        setTimeout(() => {

            error_element.classList.remove("bg-red-500");
            error_element.classList.remove("text-md");
            error_element.classList.add("text-xl");
            error_element.classList.add("bg-primary");

            error_element.textContent = "basic store details";
            
        }, 3000);

    }


    const [isSubmitButtonDisabled, setSubmitButtonDisable] = useState(false);

    async function handleDetailsSubmission(e) {

        e.preventDefault(); // Prevent default form submission behavior

        setSubmitButtonDisable(true);

        let submit_button = document.getElementById("form_submit_button");
    
        let data_to_send = new FormData(e.target); // Create FormData object

        // Check if a valid category is selected
        if (!(data_to_send.get('store_category'))) {

            handle_error_msg("Select A Valid Store Category");

            setSubmitButtonDisable(false);

            return;

        }
    
        // Log entries in the FormData
        for (const [key, value] of data_to_send.entries()) {

            console.log(key, value);

        }

        try{

            const response = await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}/authentication/seller_info_update`,
                data: data_to_send, // Send the form data
                withCredentials: true, // Include credentials such as cookies
                headers: {
                  "Content-Type": "multipart/form-data", // Adjust the content type if needed
                },
            });
    
            console.log(response.data);

            e.target.classList.add("scale-105");
            e.target.classList.add('opacity-0');

            const basic_success_div = document.getElementById("basic_success_div");

            setTimeout(() => {
                e.target.classList.add('hidden');
                basic_success_div.classList.remove("hidden");
            }, 300);


            setTimeout(() => {
                basic_success_div.classList.remove("scale-90");
                basic_success_div.classList.remove("opacity-0");
            }, 500);

            setTimeout(() => {
                navigate("/store-id-details");
            }, 2000);

        } catch(error) {

            handle_error_msg(error.response ? error.response.data : error.message);

            setSubmitButtonDisable(false);

        }

    }


    return loading ? (

        <h2>loading...</h2>

    ) : (
    
    (!isAuthenticated || !isSeller) ? (

        <h2>Unauthorized</h2>

    ) : (

    isStoreBasicInfoAdded ? (

        !isStoreIDInfoAdded ? (

            <seciton className="w-full h-screen flex flex-col items-center justify-center text-xl text-primary">
                <h3>- Your Seller Application Is Being Reviewed -</h3>
                <hr className='border border-gray-300 w-48 my-4' />
                <h3>- Once Approved, Your Store Will Be Good To Go -</h3>
            </seciton>

        ) : (

            <seciton className="w-full h-screen flex flex-col items-center justify-center text-xl text-primary">
                <h3>- Your Store's Basic Details Are Filled -</h3>
                <hr className='border border-gray-300 w-48 my-3' />
                <h3>- Looks Like Your Store Need Some Verification -</h3>

                <Link className='text-base px-8 py-3 mt-10 border-2 border-primary transition hover:bg-primary hover:text-secondary'>Verify Now</Link>
            </seciton>
        )

    ) : (
        
        <section className='w-full h-screen flex flex-col items-center justify-center bg-secondary relative'>

            <h3 id='error_element' className='absolute transition-all top-0 p-3 bg-primary w-full text-center text-secondary font-semibold uppercase mb-6 text-xl text-dull font-monty'>Basic Store Details</h3>

            <div id='basic_success_div' className='flex items-center justify-center flex-col relative transition scale-90 hidden opcity-0'>
                <h2 className='text-xl font-semibold'>- Great, Just One More Step -</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={150} height={150} color={"#006964"} fill={"none"} className='opacity-10 absolute'>
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <form className='flex flex-col items-center justify-center transition' style={{width : "28rem"}} onSubmit={handleDetailsSubmission} encType="multipart/form-data">
                
                <div className='flex items-center justify-center relative'>

                    <input onChange={handleImageChange} id='real_image_input' name='store_image' className='absolute w-32 h-32 rounded-full object-fill object-center opacity-0 p-1 border-2 border-primary' type="file" accept='.png, .jpg, .jpeg' src="https://www.shutterstock.com/image-vector/3d-home-icon-render-house-260nw-2198580961.jpg cursor-pointer" alt="" style={{aspectRatio : "1:1", zIndex : "3"}} required />

                    <img id='image_input_display' className='absolute w-36 h-36 rounded-full object-cover object-center p-2 ' src={imagePreview || ""} alt="" style={{aspectRatio : "1:1", zIndex : "2"}}/>

                    <div style={{zIndex : "1"}} className='w-36 h-36 rounded-full border-4 border-primary flex items-center justify-center'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="70" height="70" color="#006964" fill="none">
                        <path d="M22 6.75C22.4142 6.75 22.75 6.41421 22.75 6C22.75 5.58579 22.4142 5.25 22 5.25V6.75ZM14 5.25C13.5858 5.25 13.25 5.58579 13.25 6C13.25 6.41421 13.5858 6.75 14 6.75V5.25ZM18.75 2C18.75 1.58579 18.4142 1.25 18 1.25C17.5858 1.25 17.25 1.58579 17.25 2H18.75ZM17.25 10C17.25 10.4142 17.5858 10.75 18 10.75C18.4142 10.75 18.75 10.4142 18.75 10H17.25ZM22 5.25H18V6.75H22V5.25ZM18 5.25H14V6.75H18V5.25ZM17.25 2V6H18.75V2H17.25ZM17.25 6V10H18.75V6H17.25Z" fill="currentColor" />
                        <path d="M11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C21 19.2175 21 16.9783 21 12.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M2 14.1354C2.61902 14.0455 3.24484 14.0011 3.87171 14.0027C6.52365 13.9466 9.11064 14.7729 11.1711 16.3342C13.082 17.7821 14.4247 19.7749 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M21 16.8962C19.8246 16.3009 18.6088 15.9988 17.3862 16.0001C15.5345 15.9928 13.7015 16.6733 12 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>

                    </div>



                </div>

                
                <input name='store_name' type="text" placeholder='Store Name' required className='w-full p-2 bg-secondary outline-none border-b-2 border-primary placeholder:text-primary text-primary mt-6'/>

                <input type='text' className='w-full h-24 outline-none placeholder:text-primary bg-secondary text-primary resize-none p-2 border-b-2 border-primary mt-6' name="store_address" placeholder='Store Address. . . . .' required></input>
                
                <select name='store_category' id="dropdown" defaultValue={"default"} className='w-full p-2 bg-secondary outline-none border-b-2 border-primary rounded-sm text-primary mt-6 font-product' required
                >
                    <option value="default" className='font-monty' disabled>Store Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion & Clothing</option>
                    <option value="beauty">Beauty & Personal Care</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="sports">Sports & Outdoors</option>
                    <option value="books">Books & Stationery</option>
                    <option value="health">Health & Wellness</option>
                    <option value="toys">Toys & Games</option>
                    <option value="automotive">Automotive</option>
                    <option value="jewelry">Jewelry & Accessories</option>
                    <option value="grocery">Grocery & Food</option>
                    <option value="baby">Baby Products</option>
                    <option value="furniture">Furniture & Decor</option>
                    <option value="pet">Pet Supplies</option>
                    <option value="office">Office Supplies</option>
                </select>

                <select name='store_country' id="dropdown" className='w-full p-2 bg-secondary border-b-2 outline-none border-primary rounded-sm text-primary mt-6' required>
                    <option value="pakistan">Pakistan</option>
                </select>

                <button id='form_submit_button' type="submit" disabled={isSubmitButtonDisabled} className='w-full h-14 border-2 flex items-center justify-center border-primary mt-10 text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary outline-none transition'>{isSubmitButtonDisabled ? <BarLoader color="#006964" /> : "Submit"}</button>

            </form>

        </section>
            
        )
    )
    )
}


export default AddStoreBasicDetailsScreen;
