import React, { useEffect, useState, useRef } from 'react'
import { BarLoader } from 'react-spinners';
import api from '../../../axios';



function SellerProductDetails({selectedProd, onSuccess, productFetchFunction, storeIdForFunction}) {

    const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const [isUpdateButtonDisabled, setUpdateButtonDisabled] = useState(false);
    const [productDeleteMessage, setProductDeleteMessage] = useState("");
    const [shouldShowUpdateButton, setShouldShowUpdateButton] = useState(false);
    const [firstFormImage, setFirstFormImage] = useState("");
    const [secondFormImage, setSecondFormImage] = useState("");
    const [thirdFormImage, setThirdFormImage] = useState("");

    const inputRefs = useRef([]);

    const getImageSrc = (index, element) => {
      if (index === 0) {
        return firstFormImage === "" ? `${import.meta.env.VITE_API_URL}/${element.image}` : firstFormImage;
      }
      if (index === 1) {
        return secondFormImage === "" ? `${import.meta.env.VITE_API_URL}/${element.image}` : secondFormImage;
      }
      if (index === 2) {
        return thirdFormImage === "" ? `${import.meta.env.VITE_API_URL}/${element.image}` : thirdFormImage;
      }
      return "";
    };

    const readFileAsDataURL = (file, callback) => {
      const reader = new FileReader();
      reader.onload = () => callback(reader.result);
      reader.readAsDataURL(file);
    };

    const handleImageChange = (event, setImage) => {
      const file = event.target.files[0];
      if (file) {
        readFileAsDataURL(file, setImage); // Reuse the helper function
      }
    };

    const handleButtonClick = (index) => {

      const input = inputRefs.current[index];
      input.readOnly = !input.readOnly;
      input.focus();

      input.addEventListener('blur', () => {
        input.readOnly = true;
      })

    }

    async function delete_product(productId) {

      setDeleteButtonDisabled(true);

      try{

        const response = await api.delete(`/api/modify_product/${productId}`);

        setDeleteButtonDisabled(false);

        setProductDeleteMessage(`Product ${selectedProd.product_name} Is Deleted`);

        setTimeout(() => {

          onSuccess();
          productFetchFunction({storeId : storeIdForFunction});

        }, 4000);

      }
      catch (error) {

        console.log("OTP verification failed:", error.response ? error.response.data : error.message);
        
        setDeleteButtonDisabled(false);

      }

      
    }


    async function update_product(e, product_id) {

      e.preventDefault();

      setUpdateButtonDisabled(true);

      console.log(`Product Update Request To '${import.meta.env.VITE_API_URL}/api/modify_product/${product_id}`);

      let updated_data_to_send = new FormData(e.target);

      for(let [key, value] of updated_data_to_send.entries()){

        console.log(`${key} : ${value}`);

      }

      selectedProd.product_images.forEach((element, index) => {
        const fileInput = document.querySelector(`input[type="file"]`);
        const hiddenInput = document.getElementById(`hidden-input-${index}`);
        const isFile = hiddenInput.dataset.isFile === "true";
      
        if (isFile) {
          // Append the file if a new file is selected
          const file = fileInput.files[0];
          updated_data_to_send.append('product_image', file); // Append under the same key
        } else {
          // Append the current image URL if no new file is selected
          updated_data_to_send.append('product_image', hiddenInput.defaultValue); // Append under the same key
        }
      });

      setUpdateButtonDisabled(false);

      try{

        const response = await api.put(`/api/modify_product/${product_id}`);

        setUpdateButtonDisabled(false);

        console.log(response);

      } catch(error) {

        setUpdateButtonDisabled(false);

        console.log(error);

      }
      
    }


  return (

    <div className={`w-full items-center flex flex-col ${productDeleteMessage === "" ? "justify-start" : "justify-center h-full"} font-product motion-preset-slide-up`}>

      {
        productDeleteMessage !== "" ? (

          <h2 className='text-red-500 text-xl motion-preset-slide-up'>{productDeleteMessage}</h2>

        ) : (

          <form onSubmit={(e) => update_product(e, selectedProd?.id)} className='flex flex-col items-center justify-center'>
          
            <div className='w-full flex flex-col items-center justify-center'>

              <div className='flex items-center justify-between w-3/5'>
              {
                selectedProd.product_images.map((element, index) => (
                  <div key={index} className="flex items-center justify-center relative group">
                    {/* File Input */}
                    <input
                      type="file"
                      className="w-36 h-36 opacity-0"
                      style={{ zIndex: "2" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const hiddenInput = document.getElementById(`hidden-input-${index}`);
                        if (file) {
                          hiddenInput.dataset.isFile = true; // Mark as a file
                          hiddenInput.value = ''; // Clear the default value
                        } else {
                          hiddenInput.dataset.isFile = false; // Reset if no file is selected
                        }
                        setShouldShowUpdateButton(true);
                      }}
                    />

                    {/* Hidden Input to Hold Default Value */}
                    <input
                      type="hidden"
                      id={`hidden-input-${index}`}
                      defaultValue={element.image} // Current image URL
                      data-is-file={false} // Default state
                    />

                    {/* Current Image Display */}
                    <img
                      src={getImageSrc(index, element)}
                      alt={`Product image ${index + 1}`}
                      className="w-36 h-36 absolute object-center object-cover mix-blend-multiply rounded-md shadow-md transition-all duration-400 group-hover:p-1 hover:rounded-lg cursor-pointer"
                      style={{ zIndex: "1" }}
                    />
                  </div>
                ))
              }

              </div>



              </div>

              <hr className='border-2 border-less-primary w-1/4 my-8' />

              <div className='flex items-center justify-center'>

                <div className='flex flex-col items-center justify-start'>

                  <span className='flex items-center justify-center relative group'>

                    <input defaultValue={selectedProd.product_name} name='product_name' onChange={(e) => {setShouldShowUpdateButton(true); e.target.readOnly = false;}} ref={(el) => (inputRefs.current[0] = el)} type="text" readOnly placeholder={selectedProd.product_name} className='px-3 placeholder:text-primary py-3 bg-less-primary rounded-sm text-primary outline-none' style={{fontSize : "18px", width : "22rem"}} />

                    <svg onClick={() => handleButtonClick(0)} className='absolute right-2 cursor-pointer transition hover:scale-110 opacity-0 group-hover:opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </span>
                  
                  <span className='flex items-center justify-center relative mt-5 group'>

                    <textarea defaultValue={selectedProd.product_description} name='product_description' onChange={() => setShouldShowUpdateButton(true)} ref={(el) => (inputRefs.current[1] = el)} type="text" readOnly placeholder={selectedProd.product_description} className='px-3 py-3 bg-less-primary rounded-sm text-primary placeholder:text-primary outline-none resize-none h-28' style={{fontSize : "18px", width : "22rem"}} />

                    <svg onClick={() => handleButtonClick(1)} className='absolute right-2 top-2 cursor-pointer transition hover:scale-110 opacity-0 group-hover:opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </span>

                </div>

                <hr className='border-2 border-less-primary mx-8 h-full' />
                
                <div className='flex flex-col items-center justify-start'>

                  <span className='flex items-center justify-center relative group'>

                    <input defaultValue={selectedProd.product_quantity} name='product_quantity' onChange={() => setShouldShowUpdateButton(true)} ref={(el) => (inputRefs.current[2] = el)} type="text" readOnly placeholder={selectedProd.product_quantity} className='px-3 py-3 bg-less-primary rounded-sm text-primary outline-none placeholder:text-primary' style={{fontSize : "18px", width : "22rem"}} />

                    <svg onClick={() => handleButtonClick(2)} className='absolute right-2 cursor-pointer transition hover:scale-110 opacity-0 group-hover:opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </span>
                  
                  <span className='flex items-center justify-center relative mt-5 group'>

                    <textarea defaultValue={selectedProd.product_keywords} name='product_keywords' onChange={() => setShouldShowUpdateButton(true)} ref={(el) => (inputRefs.current[3] = el)} type="text" readOnly placeholder={selectedProd.product_keywords} className='px-3 py-3 bg-less-primary rounded-sm text-primary placeholder:text-primary outline-none resize-none h-28' style={{fontSize : "18px", width : "22rem"}} />

                    <svg onClick={() => handleButtonClick(3)} className='absolute right-2 top-2 cursor-pointer transition hover:scale-110 opacity-0 group-hover:opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                        <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                  </span>

                </div>

              </div>

              <span className='flex items-center justify-center relative mt-6 group'>

                <input defaultValue={selectedProd.product_price} name='product_price' onChange={() => setShouldShowUpdateButton(true)} ref={(el) => (inputRefs.current[4] = el)} type="text" readOnly placeholder={selectedProd.product_price} className='px-3 py-3 bg-less-primary rounded-sm text-primary outline-none placeholder:text-primary' style={{fontSize : "18px", width : "22rem"}} />

                <svg onClick={() => handleButtonClick(4)} className='absolute right-2 cursor-pointer transition hover:scale-110 opacity-0 group-hover:opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                    <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </span>


              <div className='flex items-center justify-center mt-8'>

                <button onClick={() => delete_product(selectedProd.id)} disabled={isDeleteButtonDisabled} className='w-36 h-12 flex items-center justify-center bg-red-500 text-secondary rounded-sm transition hover:bg-red-600'>{isDeleteButtonDisabled ? <BarLoader color='#ffffff' /> : "Delete Product"}</button>

                {
                  shouldShowUpdateButton ? (

                    <button type="submit" disabled={isUpdateButtonDisabled} className='w-36 h-12 flex items-center ml-3 justify-center bg-primary text-secondary outline-none border-none rounded-sm transition'>{isUpdateButtonDisabled ? <BarLoader /> : "Update"}</button>

                  ) : ""
                }


              </div>

          </form>

        )
      }


    </div>

  )

}

export default SellerProductDetails