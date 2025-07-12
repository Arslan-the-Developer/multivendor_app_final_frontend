import React, { useEffect, useState, useRef } from 'react';

import {BarLoader} from 'react-spinners'
import api from '../../../axios';



function SellerAddNewProduct({onSuccess,productFetchFunction,storeIDForFunction}) {

  const [firstFormImage, setFirstFormImage] = useState(" ");
  const [secondFormImage, setSecondFormImage] = useState(" ");
  const [thirdFormImage, setThirdFormImage] = useState(" ");
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  const addTag = () => {
    const value = input.trim();
    if (value && !tags.includes(value) && tags.length < 5) {
      setTags([...tags, value]);
    }
    setInput('');
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === ',' || e.key === '.') {
      e.preventDefault();
    } else if (e.key === 'Backspace' && !input) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleKeywordsChange = (e) => {
    setKeywordInput(e.target.value.replace(/[.,]/g, ''))
  }
  

  const handleImageChange = (event, setImage) => {

      const file = event.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result); // Set the image preview URL
        };
        reader.readAsDataURL(file); // Convert image file to base64 URL
      }
  };

  async function GetSubCategories() {

    try{

      const response = await api.get("/api/get_product_subcategories");

      console.log(response.data);

      setSubCategories(response.data);

    } catch(error){

      console.log(error);

    }
    
  }

  async function handleProductAdd(e) {

    e.preventDefault();

    setSubmitButtonDisabled(true);

    let newProductData = new FormData(e.target);

    try{

      const response = await api.post("/api/create_product", newProductData);

      setSubmitButtonDisabled(false);

      onSuccess();
      productFetchFunction({storeId : storeIDForFunction});

    } catch(error){
      
      setErrorMessage(error.response ? error.response.data : error.message);

      setSubmitButtonDisabled(false);

      setTimeout(() => {
        setErrorMessage("");
      }, 4000);

    }

    
  }


  useEffect(() => {

    GetSubCategories();

  }, [])

  return (

    <div className='w-full mt-2 items-center flex flex-col justify-start font-product motion-preset-slide-up motion-duration-500 relative'>

      <h2 className={`absolute -top-9 text-xl text-red-500 transition-all duration-300 ${errorMessage === "" ? "opacity-0" : "opacity-1"}`}>{errorMessage}</h2>

      <form onSubmit={handleProductAdd} className='flex flex-col items-center justify-center mt-5' encType='multipart/form-data'>

        <div className='flex items-center justify-center'>

          <div className='flex items-center justify-center relative transition-all hover:-translate-y-1'>
            <input name='product_image' onChange={(e) => handleImageChange(e, setFirstFormImage)} className='w-32 h-32 opacity-0 rounded-xl cursor-pointer' type="file" accept='.png, .jpg, .jpeg' required style={{zIndex : "3"}} />
            <img className='w-32 h-32 bg-transparent border-2 border-primary rounded-xl object-center object-cover absolute' src={firstFormImage} style={{zIndex : "2"}} />
            <svg className='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={65} height={65} color={"#006964"} fill={"none"}>
                <path d="M22 6.75C22.4142 6.75 22.75 6.41421 22.75 6C22.75 5.58579 22.4142 5.25 22 5.25V6.75ZM14 5.25C13.5858 5.25 13.25 5.58579 13.25 6C13.25 6.41421 13.5858 6.75 14 6.75V5.25ZM18.75 2C18.75 1.58579 18.4142 1.25 18 1.25C17.5858 1.25 17.25 1.58579 17.25 2H18.75ZM17.25 10C17.25 10.4142 17.5858 10.75 18 10.75C18.4142 10.75 18.75 10.4142 18.75 10H17.25ZM22 5.25H18V6.75H22V5.25ZM18 5.25H14V6.75H18V5.25ZM17.25 2V6H18.75V2H17.25ZM17.25 6V10H18.75V6H17.25Z" fill="currentColor" />
                <path d="M11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C21 19.2175 21 16.9783 21 12.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 14.1354C2.61902 14.0455 3.24484 14.0011 3.87171 14.0027C6.52365 13.9466 9.11064 14.7729 11.1711 16.3342C13.082 17.7821 14.4247 19.7749 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M21 16.8962C19.8246 16.3009 18.6088 15.9988 17.3862 16.0001C15.5345 15.9928 13.7015 16.6733 12 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          <div className='flex items-center justify-center relative transition-all hover:-translate-y-1'>
            <input name='product_image' onChange={(e) => handleImageChange(e, setSecondFormImage)} className='w-32 h-32 opacity-0 rounded-xl mx-10 cursor-pointer' type="file" accept='.png, .jpg, .jpeg' required style={{zIndex : "3"}} />
            <img className='w-32 h-32 bg-transparent border-2 border-primary rounded-xl object-center object-cover absolute' src={secondFormImage} style={{zIndex : "2"}} />
            <svg className='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={65} height={65} color={"#006964"} fill={"none"}>
                <path d="M22 6.75C22.4142 6.75 22.75 6.41421 22.75 6C22.75 5.58579 22.4142 5.25 22 5.25V6.75ZM14 5.25C13.5858 5.25 13.25 5.58579 13.25 6C13.25 6.41421 13.5858 6.75 14 6.75V5.25ZM18.75 2C18.75 1.58579 18.4142 1.25 18 1.25C17.5858 1.25 17.25 1.58579 17.25 2H18.75ZM17.25 10C17.25 10.4142 17.5858 10.75 18 10.75C18.4142 10.75 18.75 10.4142 18.75 10H17.25ZM22 5.25H18V6.75H22V5.25ZM18 5.25H14V6.75H18V5.25ZM17.25 2V6H18.75V2H17.25ZM17.25 6V10H18.75V6H17.25Z" fill="currentColor" />
                <path d="M11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C21 19.2175 21 16.9783 21 12.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 14.1354C2.61902 14.0455 3.24484 14.0011 3.87171 14.0027C6.52365 13.9466 9.11064 14.7729 11.1711 16.3342C13.082 17.7821 14.4247 19.7749 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M21 16.8962C19.8246 16.3009 18.6088 15.9988 17.3862 16.0001C15.5345 15.9928 13.7015 16.6733 12 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          <div className='flex items-center justify-center relative transition-all hover:-translate-y-1'>
            <input name='product_image' onChange={(e) => handleImageChange(e, setThirdFormImage)} className='w-32 h-32 opacity-0 rounded-xl cursor-pointer' type="file" accept='.png, .jpg, .jpeg' required style={{zIndex : "3"}} />
            <img className='w-32 h-32 bg-transparent border-2 border-primary rounded-xl object-center object-cover absolute' src={thirdFormImage} style={{zIndex : "2"}} />
            <svg className='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={65} height={65} color={"#006964"} fill={"none"}>
                <path d="M22 6.75C22.4142 6.75 22.75 6.41421 22.75 6C22.75 5.58579 22.4142 5.25 22 5.25V6.75ZM14 5.25C13.5858 5.25 13.25 5.58579 13.25 6C13.25 6.41421 13.5858 6.75 14 6.75V5.25ZM18.75 2C18.75 1.58579 18.4142 1.25 18 1.25C17.5858 1.25 17.25 1.58579 17.25 2H18.75ZM17.25 10C17.25 10.4142 17.5858 10.75 18 10.75C18.4142 10.75 18.75 10.4142 18.75 10H17.25ZM22 5.25H18V6.75H22V5.25ZM18 5.25H14V6.75H18V5.25ZM17.25 2V6H18.75V2H17.25ZM17.25 6V10H18.75V6H17.25Z" fill="currentColor" />
                <path d="M11.5 3C7.02166 3 4.78249 3 3.39124 4.39124C2 5.78249 2 8.02166 2 12.5C2 16.9783 2 19.2175 3.39124 20.6088C4.78249 22 7.02166 22 11.5 22C15.9783 22 18.2175 22 19.6088 20.6088C21 19.2175 21 16.9783 21 12.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 14.1354C2.61902 14.0455 3.24484 14.0011 3.87171 14.0027C6.52365 13.9466 9.11064 14.7729 11.1711 16.3342C13.082 17.7821 14.4247 19.7749 15 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M21 16.8962C19.8246 16.3009 18.6088 15.9988 17.3862 16.0001C15.5345 15.9928 13.7015 16.6733 12 18" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

        </div>

        <hr className='w-3/5 border border-less-primary my-8' />

        <div className='flex items-start justify-start'>

          <div className='flex flex-col items-center justify-center'>

            <input name='product_name' className='p-3 bg-less-primary placeholder:text-primary rounded-sm w-96 outline-none text-primary' type="text" placeholder='Product Name' required />
            <textarea name="product_description" className='p-3 bg-less-primary placeholder:text-primary mt-6 rounded-sm w-96 resize-none h-28 outline-none text-primary' placeholder='Product Description' required></textarea>

          </div>

          <hr className='h-full border border-less-primary mx-8' />

          <div className='flex flex-col items-start justify-start'>

            <input name='product_quantity' onInput={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value.slice(0, 4);
            }} className='p-3 bg-less-primary placeholder:text-primary rounded-sm text-start items-start justify-start w-96 outline-none text-primary' type="text" placeholder='Product Quantity' required />

            <div className="mt-6 flex flex-wrap items-start justify-start w-96 p-3 h-28 bg-less-primary rounded-sm gap-1" onClick={() => inputRef.current?.focus()}>
              <textarea name="product_keywords" className='p-3 bg-less-primary placeholder:text-primary mt-6 rounded-sm w-96 resize-none h-28 outline-none text-primary' placeholder='Enter Comma Seperated Keywords...' required></textarea>
            </div>

          </div>

        </div>

        <div className='flex items-center justify-between w-full'>


          <select name='product_subcategory' id="dropdown" defaultValue={"default"} className='w-96 py-3 px-2 bg-less-primary outline-none rounded-sm text-primary mt-6 font-product' required>

                  {
                    subCategories.length === 0 ? (

                      <option selected value="">Loading....</option>

                    ) : (
                      <>
                        <option value="default" className='font-monty uppercase' disabled>Subcategories For '{subCategories?.parent_category}'</option>
                        {
                          subCategories?.sub_categories.map((sub_category) => (
                            <option value={`${sub_category}`}>{sub_category}</option>
                          ))
                        }
                      </>

                    )
                  }


            </select>

          <input name='product_price' onInput={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = value.slice(0, 7);
            }} className='p-3 bg-less-primary placeholder:text-primary rounded-sm w-96 outline-none text-primary mt-6' type="text" placeholder='Product Price (Rs)' required />
            
        </div>


        <button disabled={isSubmitButtonDisabled} className='w-72 bg-primary h-14 flex items-center justify-center text-secondary text-xl rounded-sm mt-8' type="submit">{isSubmitButtonDisabled ? <BarLoader color='#ffffff' /> : "Add"}</button>

      </form>

    </div>

  )

}

export default SellerAddNewProduct