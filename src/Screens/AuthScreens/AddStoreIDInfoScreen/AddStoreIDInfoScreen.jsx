import React, { useState } from 'react'
import axios from 'axios'
import useRefreshTokens from '../../../Components/Hooks/useRefreshTokens';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import api from '../../../axios';


function AddStoreIDInfoScreen() {

    useRefreshTokens();

    const navigate = useNavigate();

    const [isSubmitButtonDisabled, setSubmitDisable] = useState(false);
    // const [file1, setFile1] = useState(null);
    // const [file2, setFile2] = useState(null);

    const [frontImagePreview, setFrontImagePreview] = useState(" ");
    const [backImagePreview, setBackImagePreview] = useState(" ");
    
    const handleFrontImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setFrontImagePreview(reader.result); // Set the image preview URL
        };
        reader.readAsDataURL(file); // Convert image file to base64 URL
        }
    };
    
    const handleBackImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setBackImagePreview(reader.result); // Set the image preview URL
        };
        reader.readAsDataURL(file); // Convert image file to base64 URL
        }
    };

    const [idNumber, setIdNumber] = useState("");

    const handleInput = (e) => {
        // Remove all non-numeric characters
        const numericValue = e.target.value.replace(/[^0-9]/g, "");

        // Format the value to match CNIC pattern
        let formattedValue = numericValue
            .slice(0, 13) // Limit to a maximum of 13 characters
            .replace(/^(\d{5})(\d{1,7})?(\d{1})?$/, (match, p1, p2, p3) => {
                return [p1, p2, p3].filter(Boolean).join("-");
            });

        setIdNumber(formattedValue); // Update the state with the formatted value
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

    async function handleIdInfoSubmit(e) {

        setSubmitDisable(true);

        e.preventDefault();

        const formData = new FormData(e.target);

        for(var [key, value] of formData.entries()){

            console.log(key, value);
        }

        try{

            const response = await api.post(`/authentication/add_seller_id_info`, formData);

            console.log(response);

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
                navigate("/");
            }, 2000);

        }
        catch(error){

            handle_error_msg(error.response ? error.response.data : error.message);

            setSubmitDisable(false);

        }
        
    }

    return (
        
        <section className='w-full h-screen flex flex-col items-center justify-center bg-secondary relative'>

            <h3 id='error_element' className='absolute transition-all top-0 p-3 bg-primary w-full text-center text-secondary font-semibold uppercase mb-6 text-xl text-dull font-monty'>Store ID Info</h3>

            <div id='basic_success_div' className='flex items-center justify-center flex-col relative transition scale-90 hidden opcity-0'>
                <h2 className='text-xl font-semibold'>- Great, Everything Is Done -</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={150} height={150} color={"#006964"} fill={"none"} className='opacity-10 absolute'>
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <form onSubmit={handleIdInfoSubmit} className='flex flex-col items-center justify-center transition' style={{width : "28rem"}} encType="multipart/form-data">
                
                <p className='text-sm text-primary'>Front & Back Side ID Card Images</p>

                <hr className='border w-1/2 border-gray-300 mt-3 mb-3' />

                <div className='flex justify-center items-center w-full mb-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#ca8a04"} fill={"none"}>
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className='text-sm ml-2 text-yellow-600 font-semibold'>Provide Clear, Well-Lit And Non-Blurry Images</p>
                </div>

                <div className='flex items-center justify-center relative mt-2'>

                    <div className='mr-4 transition hover:scale-105' title='Front Side Image'>
                     
                        <input id='real_image_input' onChange={handleFrontImageChange} name='card_image' className='absolute w-40 h-28 cursor-pointer border-none outline-none rounded-sm object-fill object-center opacity-0' type="file" accept='.png, .jpg, .jpeg' alt="" style={{aspectRatio : "1:1", zIndex : "3"}} required />

                        <img id='image_input_display' src={frontImagePreview} className='absolute w-40 h-28 border-none outline-none rounded-xl object-cover object-center'/>

                        <div style={{zIndex : "1"}} className='w-40 h-28 rounded-xl border-4 border-primary flex items-center justify-center flex-col'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" color="#006964" fill="none">
                            <path d="M11.5085 2.9903C7.02567 2.9903 4.78428 2.9903 3.39164 4.38238C1.99902 5.77447 1.99902 8.015 1.99902 12.4961C1.99902 16.9771 1.99902 19.2176 3.39164 20.6098C4.78428 22.0018 7.02567 22.0018 11.5085 22.0018C15.9912 22.0018 18.2326 22.0018 19.6253 20.6098C21.0179 19.2176 21.0179 16.9771 21.0179 12.4961V11.9958" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4.99902 20.9898C9.209 16.2385 13.9402 9.93727 20.999 14.6632" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M17.9958 1.99829V10.0064M22.0014 5.97728L13.9902 5.99217" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p className='text-sm text-primary mt-2'>Front Side</p>

                        </div>
                    </div>

                    <div className='ml-4 transition hover:scale-105' title='Back Side Image'>

                        <input id='real_image_input' onChange={handleBackImageChange} name='card_image' className='absolute w-40 h-28 cursor-pointer border-none outline-none rounded-sm object-fill object-center opacity-0 p-1 border-2 border-primary' type="file" accept='.png, .jpg, .jpeg' src='' alt="" style={{aspectRatio : "1:1", zIndex : "3"}} required />

                        <img id='image_input_display' src={backImagePreview} className='absolute w-40 h-28 border-none outline-none rounded-xl object-cover object-center'/>

                        <div style={{zIndex : "1"}} className='w-40 h-28 rounded-xl border-4 border-primary flex items-center justify-center flex-col'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" color="#006964" fill="none">
                            <path d="M11.5085 2.9903C7.02567 2.9903 4.78428 2.9903 3.39164 4.38238C1.99902 5.77447 1.99902 8.015 1.99902 12.4961C1.99902 16.9771 1.99902 19.2176 3.39164 20.6098C4.78428 22.0018 7.02567 22.0018 11.5085 22.0018C15.9912 22.0018 18.2326 22.0018 19.6253 20.6098C21.0179 19.2176 21.0179 16.9771 21.0179 12.4961V11.9958" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M4.99902 20.9898C9.209 16.2385 13.9402 9.93727 20.999 14.6632" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M17.9958 1.99829V10.0064M22.0014 5.97728L13.9902 5.99217" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <p className='text-sm text-primary mt-2'>Back Side</p>

                        </div>
                    </div>

                </div>


                <input name='id_name' placeholder='Name on ID Card' type="text" className='w-full p-2 bg-secondary outline-none border-b-2 border-primary placeholder:text-primary text-primary mt-12' required/>
                
                <input name='id_number' value={idNumber} onChange={handleInput} type="text" placeholder='ID Number' required className='w-full p-2 bg-secondary outline-none border-b-2 border-primary placeholder:text-primary text-primary mt-8'/>

                <button id='form_submit_button' type="submit" disabled={isSubmitButtonDisabled} className='w-full h-14 border-2 flex items-center justify-center border-primary mt-10 text-primary hover:bg-primary hover:text-secondary focus:bg-primary focus:text-secondary outline-none transition'>{isSubmitButtonDisabled ? <BarLoader color="#006964" /> : "Submit"}</button>

            </form>

        </section>
        
    );

}

export default AddStoreIDInfoScreen