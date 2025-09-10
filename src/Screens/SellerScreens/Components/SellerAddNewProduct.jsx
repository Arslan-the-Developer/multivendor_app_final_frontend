import React, { useEffect, useState, useRef } from 'react';

import {BarLoader} from 'react-spinners'
import api from '../../../axios';
import axios from 'axios';




function SellerAddNewProduct({onSuccess,productFetchFunction,storeIDForFunction}) {

  const [images, setImages] = useState([]); // All images
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [firstFormImage, setFirstFormImage] = useState(" ");
  const [secondFormImage, setSecondFormImage] = useState(" ");
  const [thirdFormImage, setThirdFormImage] = useState(" ");
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  // const [variants, setVariants] = useState([
  // {
  //     images: [
  //       { file: null, preview: null },
  //       { file: null, preview: null },
  //       { file: null, preview: null },
  //     ],
  //     name: '',
  //     quantity: '',
  //     price: '',
  //   },
  // ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [keywordsError, setKeywordsError] = useState("");

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);


  // For PRODCT VARIANTS


  const [basePrice, setBasePrice] = useState(0);

  const [variantCategories, setVariantCategories] = useState([
    {
      title: "",
      variants: [
        { name: "", quantity: 0, extraPrice: 0 }
      ]
    }
  ]);

  const isBasePriceSet = basePrice > 0;


  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    let updated = [...images];
    updated[index] = { file, preview };
    setImages(updated);
  };


  const handleAddMore = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImages((prev) => [...prev, { file, preview }]);
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const renderImageSlot = (index, isMain = false) => (
    <label
      key={index}
      className={`border-2 p-1 border-less-primary rounded-md flex items-center justify-center cursor-pointer overflow-hidden ${
        isMain ? "w-full h-68" : "w-24 h-24"
      }`}
    >
      {images[index] ? (
        <img
          src={images[index].preview}
          alt="Selected"
          className="object-contain object-center w-full h-full"
        />
      ) : (
        <span className="text-primary relative flex items-center justify-center">
          {
            isMain ? (

              <svg className='absolute opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={90} height={90} color={"#006964"} fill={"none"}>
                  <path d="M3 16L7.46967 11.5303C7.80923 11.1908 8.26978 11 8.75 11C9.23022 11 9.69077 11.1908 10.0303 11.5303L14 15.5M15.5 17L14 15.5M21 16L18.5303 13.5303C18.1908 13.1908 17.7302 13 17.25 13C16.7698 13 16.3092 13.1908 15.9697 13.5303L14 15.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 2.5C7.77027 2.5 5.6554 2.5 4.25276 3.69797C4.05358 3.86808 3.86808 4.05358 3.69797 4.25276C2.5 5.6554 2.5 7.77027 2.5 12C2.5 16.2297 2.5 18.3446 3.69797 19.7472C3.86808 19.9464 4.05358 20.1319 4.25276 20.302C5.6554 21.5 7.77027 21.5 12 21.5C16.2297 21.5 18.3446 21.5 19.7472 20.302C19.9464 20.1319 20.1319 19.9464 20.302 19.7472C21.5 18.3446 21.5 16.2297 21.5 12" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21.5 6H18M18 6H14.5M18 6V2.5M18 6V9.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>

            ) : (

              <svg className='absolute opacity-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={32} height={32} color={"#006964"} fill={"none"}>
                  <path d="M3 16L7.46967 11.5303C7.80923 11.1908 8.26978 11 8.75 11C9.23022 11 9.69077 11.1908 10.0303 11.5303L14 15.5M15.5 17L14 15.5M21 16L18.5303 13.5303C18.1908 13.1908 17.7302 13 17.25 13C16.7698 13 16.3092 13.1908 15.9697 13.5303L14 15.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 2.5C7.77027 2.5 5.6554 2.5 4.25276 3.69797C4.05358 3.86808 3.86808 4.05358 3.69797 4.25276C2.5 5.6554 2.5 7.77027 2.5 12C2.5 16.2297 2.5 18.3446 3.69797 19.7472C3.86808 19.9464 4.05358 20.1319 4.25276 20.302C5.6554 21.5 7.77027 21.5 12 21.5C16.2297 21.5 18.3446 21.5 19.7472 20.302C19.9464 20.1319 20.1319 19.9464 20.302 19.7472C21.5 18.3446 21.5 16.2297 21.5 12" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M21.5 6H18M18 6H14.5M18 6V2.5M18 6V9.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>

            )
          }
        </span>
      )}
      <input
        type="file"
        name='product_image'
        accept="image/*"
        className="hidden"
        onChange={(e) => handleImageChange(e, index)}
      />
    </label>
  );

  const renderPlusN = () => {
    const extraCount = images.length - 3; // main + first 2 small slots
    const lastImage = images[images.length - 1]?.preview;

    return (
      <div
        className="w-24 h-24 border rounded-md flex items-center justify-center bg-center bg-contain text-white text-lg font-bold cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${lastImage})`,
        }}
      >
        +{extraCount}
      </div>
    );
  };


    const addCategory = () => {
    if (!isBasePriceSet) return;
    setVariantCategories([
      ...variantCategories,
      { title: "", variants: [{ name: "", quantity: 0, extraPrice: 0 }] }
    ]);
  };

  const updateCategoryTitle = (index, value) => {
    if (!isBasePriceSet) return;
    const updated = [...variantCategories];
    updated[index].title = value;
    setVariantCategories(updated);
  };

  const addVariant = (catIndex) => {
    if (!isBasePriceSet) return;
    const updated = [...variantCategories];
    updated[catIndex].variants.push({ name: "", quantity: 0, extraPrice: 0 });
    setVariantCategories(updated);
  };

  const updateVariant = (catIndex, varIndex, field, value) => {
    if (!isBasePriceSet && field !== "quantity") return;
    const updated = [...variantCategories];
    updated[catIndex].variants[varIndex][field] = value;
    setVariantCategories(updated);
  };

  const deleteVariant = (catIndex, varIndex) => {
    if (variantCategories[catIndex].variants.length > 1) {
      const updated = [...variantCategories];
      updated[catIndex].variants.splice(varIndex, 1);
      setVariantCategories(updated);
    }
  };

  const deleteCategory = (catIndex) => {
    if (variantCategories.length > 1) {
      const updated = [...variantCategories];
      updated.splice(catIndex, 1);
      setVariantCategories(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = variants.map(v => v.image);
    const names = variants.map(v => v.name);
    const quantities = variants.map(v => v.quantity);
    const prices = variants.map(v => v.price);
    onSubmit({ images, names, quantities, prices });
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

    // 1️⃣ Validate keywords
    if (tags.length < 5) {
      setKeywordsError("– Enter at least 5 Keywords");
      setTimeout(() => {
        setKeywordsError("");
        setSubmitButtonDisabled(false);
      }, 2000);
      return;
    }


    console.log("product_name", e.target.product_name.value);
    console.log("product_subcategory", e.target.product_subcategory.value);
    console.log("product_description", e.target.product_description.value);
    console.log("Images",images);
    console.log("Base Price",basePrice);
    console.log("Variant Categories",variantCategories);


    const formData = new FormData();

    formData.append("product_name", e.target.product_name.value);
    formData.append("product_subcategory", e.target.product_subcategory.value);
    formData.append("product_description", e.target.product_description.value);
    formData.append("product_base_price", basePrice);
    formData.append("product_keywords", JSON.stringify(tags));
    formData.append("product_variants", JSON.stringify(variantCategories));

    images.forEach((imgObj, index) => {
      formData.append(`product_image`, imgObj.file); // key name should match your backend's expected field
    });

    

    try {
      const response = await api.post("/api/create_product", formData);
      setSubmitButtonDisabled(false);
      onSuccess();
      productFetchFunction({ storeId: storeIDForFunction });
      console.log(response);
    } catch (error) {
      setErrorMessage(error.response?.data || error.message);
      setSubmitButtonDisabled(false);
      setTimeout(() => setErrorMessage(""), 4000);
    }


  }

  const handleKeyDown = (e) => {
    const val = inputValue.trim();

    if (tags.length >= 5 && e.key !== 'Backspace') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && val) {
      e.preventDefault();
      // add tag
      if (tags.length < 5) {
        setTags((prev) => [...prev, val]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !val && tags.length) {
      // remove last tag
      setTags((prev) => prev.slice(0, prev.length - 1));
    }
  };


  useEffect(() => {

    GetSubCategories();
    
  }, []);
  


  return (

    <div className='w-full flex flex-col items-start justify-start mt-6 font-product overflow-scroll custom-scrollbar relative'>

      <form className='w-full flex flex-col items-start justify-start no-scrollbar' type='multipart/form-data' onSubmit={handleProductAdd}>
      
        <div className='w-full flex items-start justify-start'>

          <div className='w-[64%] border-2 border-less-primary rounded-md flex flex-col items-start justify-start p-4'>

            <h3 className='text-primary text-xl font-semibold tracking-wide'>General Information</h3>

            <div className='w-full flex items-center justify-between mt-3'>

              <div className='w-[49.3%] flex flex-col items-start justify-start'>
                <label className='cursor-pointer' htmlFor="pr_name">Product Name</label>
                <input name='product_name' id='pr_name' className='bg-less-primary px-2 py-[12px] rounded-md w-full mt-1 placeholder:text-primary text-primary outline-none' type="text" placeholder='Product Name' required/>
              </div>
              
              
              <div className='w-[49.3%] flex flex-col items-start justify-start'>
                <label className='cursor-pointer' htmlFor="dropdown">Product Category</label>
                <select name="product_subcategory" id="dropdown" defaultValue="" className="bg-less-primary px-2 py-[13px] mt-1 rounded-md w-full placeholder:text-primary text-primary outline-none" required >
                  {
                    subCategories.length === 0 ? (
                      <option value="">Loading....</option>
                    ) : (
                      <>
                        <option value="" disabled>
                          Subcategories For '{subCategories?.parent_category}'
                        </option>
                        {subCategories?.sub_categories.map((sub_category) => (
                          <option key={sub_category} value={sub_category}>
                            {sub_category}
                          </option>
                        ))}
                      </>
                    )
                  }
                </select>
              </div>


            </div>
            
            <div className='w-full flex flex-col items-start justify-start mt-5'>
              <label className='cursor-pointer' htmlFor="pr_ds">Product Description</label>
              <textarea id='pr_ds' className='w-full bg-less-primary mt-2 rounded-md p-2 resize-none text-primary placeholder:text-primary outline-none h-35' placeholder='Write Details Of Your High Quality Product...' name="product_description" required></textarea>
            </div>
            

            


            <div className='w-full flex flex-col items-start justify-start mt-5'>
              <label className='cursor-pointer' htmlFor="pr_ds_in">Product Keywords <span className='text-red-500'>{keywordsError}</span></label>

              <label htmlFor="pr_ds_in" className="w-full bg-less-primary mt-2 rounded-md p-2 outline-none h-30 relative">

                <div className="flex flex-wrap gap-2 mb-1">

                  {
                    tags.map((tag, idx) => (
                      
                      <div key={idx} className="flex items-center bg-less-primary text-primary px-2 py-1 rounded">
                        {tag}
                      </div>

                    ))
                  }

                  <input id="pr_ds_in" type="text" placeholder={tags.length >= 5 ? `Maximum 5 Keywords Can Be Entered` : 'Enter Keywords For Your Product...' } value={inputValue} onChange={(e) => {if(tags.length < 5){setInputValue(e.target.value);}}} onKeyDown={handleKeyDown}  className="flex-grow outline-none text-primary placeholder:text-primary min-w-[8rem] disabled:cursor-not-allowed disabled:opacity-50" />

                </div>
              </label>
            </div>
            

          </div>

          <hr className='mx-8 h-full border border-less-primary' />
          
          <div className='w-[30%] rounded-md flex flex-col items-start justify-start p-4 border-2 border-less-primary relative overflow-hidden'>

            {
              isModalOpen && (
                <div className='w-full h-full bg-white p-4 absolute top-0 left-0 rounded-sm flex flex-col items-start justify-start'>

                  <div className='w-full h-full flex flex-col items-start justify-start relative'>

                    <button className='absolute top-0 right-0 transition-all hover:rotate-90 cursor-pointer hover:scale-105' onClick={() => setIsModalOpen(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#006964"} fill={"none"}>
                          <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </button>

                    <h1 className='w-full text-center text-xl font-product text-primary'>All Images</h1>

                    <div className='w-full flex flex-wrap items-start justify-around mt-4'>

                      {images.map((img, i) => (
                        <div key={i} className="relative group w-35 h-31 p-2 mt-3 border-2 border-less-primary overflow-hidden rounded-sm">
                          <img
                            src={img.preview}
                            alt="Preview"
                            className="object-contain object-center w-full h-full"
                          />

                          <div className="absolute inset-0 bg-less-primary opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

                            <button onClick={() => handleDelete(i)} className='bg-red-400 p-2 rounded-md cursor-pointer transition-all hover:bg-red-500'>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M9.5 16.5L9.5 10.5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M14.5 16.5L14.5 10.5" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                            
                          </div>

                        </div>
                      ))}

                    </div>
                    
                  </div>

                </div>
              )
            }


            <div className='w-full flex flex-col items-center justify-start'>

              {renderImageSlot(0, true)}

              <div className='w-full flex items-center justify-between mt-3'>

                {renderImageSlot(1)}
                {renderImageSlot(2)}
        
                {images.length >= 5 ? renderPlusN() : renderImageSlot(3)}

              </div>

              <hr className='w-full my-5 border border-less-primary' />

                <label className={`inline-block w-full text-center py-4 ${!(images.length >= 4) ? 'bg-less-primary text-gray-500 cursor-not-allowed' : 'bg-primary text-white cursor-pointer'} rounded`}>
                  Add More Images
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAddMore}
                    disabled={!(images.length >= 4)}
                  />
                </label>


            </div>


          </div>

        </div>




        <div className='w-full flex flex-col items-start justify-start mt-4 rounded-md p-4 border-2 border-less-primary'>

          <h1 className='text-xl font-product text-primary font-semibold'>Pricing & Stock</h1>

          <div className="w-full mt-5">

            {/* Base Price */}
            <div className="mb-6 flex flex-col">
              <label className="mb-1 text-dull">Base Price {'(PKR)'}</label>
              <input
                type="number"
                className="rounded-sm p-2 w-55 dis-num-buttons bg-less-primary text-primary outline-none"
                placeholder='0'
                value={basePrice < 1 ? "" : basePrice}
                min="0"
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || "")}
                required={true}
              />
              {!isBasePriceSet && (
                <p className="text-sm text-primary font-semibold tracking-wide mt-1">
                  Please Enter a Base Price Before Adding Categories or Variants.
                </p>
              )}
            </div>

            {/* Variant Categories */}
            {variantCategories.map((category, catIndex) => (
              <div key={catIndex} className="border-2 rounded-lg px-4 py-6 mb-6 border-less-primary">
                <div className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    className="bg-less-primary py-3 px-2 rounded-sm flex-1 mr-3 outline-none placeholder:text-primary text-primary"
                    placeholder="Variant Title (e.g., Size)"
                    value={category.title}
                    onChange={(e) => updateCategoryTitle(catIndex, e.target.value)}
                    disabled={!isBasePriceSet}
                    required
                  />
                  <button
                    className={`px-3 py-3 rounded ${
                      variantCategories.length > 1
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-less-primary text-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => deleteCategory(catIndex)}
                    disabled={variantCategories.length <= 1}
                  >
                    Delete Category
                  </button>
                </div>

                <hr className='w-full border border-less-primary my-3' />
                
                <div className='w-full h-10 rounded-sm bg-less-primary mb-4 flex items-center p-2 justify-start'>
                  <p className='w-140 text-primary'>Variant Name</p>
                  <p className='w-35 text-center text-primary'>Quantity</p>
                  <p className='w-38 text-center text-primary'>Extra Price</p>
                  <p className='w-35 text-center text-primary'>Final Price</p>
                </div>


                {/* Variants under this category */}
                {category.variants.map((variant, varIndex) => {
                  const finalPrice = basePrice + (parseFloat(variant.extraPrice) || 0);
                  return (
                    <div key={varIndex} className="flex gap-3 mb-3 items-center">
                      <input
                        type="text"
                        className="outline-none placeholder:text-primary text-primary px-2 py-3 rounded w-140 bg-less-primary"
                        placeholder="Variant Name (e.g., Small)"
                        value={variant.name}
                        onChange={(e) =>
                          updateVariant(catIndex, varIndex, "name", e.target.value)
                        }
                        disabled={!isBasePriceSet}
                        required
                      />
                      <input
                        type="number"
                        className="text-primary placeholder:text-primary outline-none dis-num-buttons px-2 py-3 rounded w-35 text-center bg-less-primary"
                        placeholder="Quantity"
                        min="1"
                        value={variant.quantity < 1 ? 1 : variant.quantity}
                        onChange={(e) =>
                          updateVariant(
                            catIndex,
                            varIndex,
                            "quantity",
                            parseInt(e.target.value) || 0
                          )
                        }
                        disabled={!isBasePriceSet}
                        required
                      />
                      <input
                        type="number"
                        className="text-primary placeholder:text-primary outline-none dis-num-buttons px-2 py-3 rounded w-33 text-center bg-less-primary"
                        min={0}
                        placeholder="Extra Price"
                        value={variant.extraPrice}
                        onChange={(e) =>
                          updateVariant(
                            catIndex,
                            varIndex,
                            "extraPrice",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        disabled={!isBasePriceSet}
                        required
                      />

                      {/* Final Price Display */}
                      <span className="text-primary font-semibold w-35 text-center bg-less-primary py-3 rounded-sm">
                        {isNaN(finalPrice) ? "-" : ` ${finalPrice}/-`}
                      </span>

                      <button
                        className={`px-3 py-3 rounded ${
                          category.variants.length > 1
                            ? "bg-red-400 hover:bg-red-500 text-white"
                            : "bg-less-primary text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={() => deleteVariant(catIndex, varIndex)}
                        disabled={category.variants.length <= 1}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}

                <button
                  className={`px-4 py-2 rounded mt-2 ${
                    isBasePriceSet
                      ? "bg-primary cursor-pointer text-white"
                      : "bg-less-primary text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => addVariant(catIndex)}
                  disabled={!isBasePriceSet}
                >
                  + Add Variant
                </button>
              </div>
            ))}

            <button
              className={`px-4 py-2 rounded ${
                isBasePriceSet
                  ? "bg-primary text-white"
                  : "bg-less-primary text-gray-400 cursor-not-allowed"
              }`}
              onClick={addCategory}
              disabled={!isBasePriceSet}
            >
              + Add Variant Category
            </button>
          </div>

        </div>

        <button disabled={isSubmitButtonDisabled} type="submit" className='w-full py-4 flex items-center justify-center bg-primary text-white mt-3 mb-8 rounded-sm cursor-pointer'>{isSubmitButtonDisabled ? <BarLoader color='#ffffff' /> : "Create"}</button>
      </form>

    </div>

  )

}

export default SellerAddNewProduct