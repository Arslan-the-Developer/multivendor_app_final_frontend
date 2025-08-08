import React, { useEffect, useState, useRef } from 'react';

import {BarLoader} from 'react-spinners'
import api from '../../../axios';



function SellerAddNewProduct({onSuccess,productFetchFunction,storeIDForFunction}) {

  const [firstFormImage, setFirstFormImage] = useState(" ");
  const [secondFormImage, setSecondFormImage] = useState(" ");
  const [thirdFormImage, setThirdFormImage] = useState(" ");
  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [variants, setVariants] = useState([
  {
      images: [
        { file: null, preview: null },
        { file: null, preview: null },
        { file: null, preview: null },
      ],
      name: '',
      quantity: '',
      price: '',
    },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [keywordsError, setKeywordsError] = useState("");

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);


  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        images: [
          { file: null, preview: null },
          { file: null, preview: null },
          { file: null, preview: null },
        ],
        name: '',
        quantity: '',
        price: '',
      },
    ]);
  };

  const handleRemoveVariant = index => {
    if (variants.length <= 1) return;

    // revoke all previews for that variant
    variants[index].images.forEach(img => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });

    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    setVariants(variants.map((variant, i) => {
          if (i !== index) return variant;
          return { ...variant, [field]: value };
        }));
    };

    const handleVariantImageChange = (variantIdx, imageIdx, file) => {
      const preview = file ? URL.createObjectURL(file) : null;

      setVariants(current =>
        current.map((v, vi) => {
          if (vi !== variantIdx) return v;

          // revoke old preview for this slot
          const old = v.images[imageIdx].preview;
          if (old) URL.revokeObjectURL(old);

          // build new images array
          const newImages = v.images.map((slot, ii) =>
            ii === imageIdx
              ? { file, preview }
              : slot
          );

          return { ...v, images: newImages };
        })
      );
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


    const formData = new FormData();

    formData.append("product_name", e.target.product_name.value);
    formData.append("product_subcategory", e.target.product_subcategory.value);
    formData.append("product_description", e.target.product_description.value);
    formData.append("product_keywords", JSON.stringify(tags));


    formData.append(
      "product_variants",
      JSON.stringify(
        variants.map(({ name, quantity, price }) => ({
          name,
          quantity,
          price,
        }))
      )
    );


    variants.forEach((variant, variantIndex) => {
      variant.images.forEach((imgObj, imageIndex) => {
        if (imgObj.file) {

          console.log(`variant_${variantIndex}_image`);
        
          formData.append( `variant_${variantIndex}_image`, imgObj.file, imgObj.file.name );

        }
      });
    });
    

    try {
      const response = await api.post("/api/create_test_product", formData);
      setSubmitButtonDisabled(false);
      onSuccess();
      productFetchFunction({ storeId: storeIDForFunction });
      console.log(response);
    } catch (error) {
      setErrorMessage(error.response?.data || error.message);
      setSubmitButtonDisabled(false);
      setTimeout(() => setErrorMessage(""), 4000);
    }



    // // 2️⃣ Build the FormData from scratch
    // const fd = new FormData();

    // // --- Scalar fields ---
    // fd.append("product_name", e.target.product_name.value);
    // fd.append("product_subcategory", e.target.product_subcategory.value);
    // fd.append("product_description", e.target.product_description.value);

    // // --- JSON fields ---
    // fd.append("product_keywords", JSON.stringify(tags));
    // fd.append(
    //   "product_variants",
    //   JSON.stringify(
    //     variants.map(({ name, quantity, price }) => ({
    //       name,
    //       quantity,
    //       price,
    //     }))
    //   )
    // );

    // // --- Append images for each variant ---
    // variants.forEach((variant, vi) => {
    //   variant.images
    //     .filter(imgObj => imgObj.file)       // only real File objects
    //     .forEach(imgObj => {
    //       fd.append(`variant_${vi}_image`, imgObj.file, imgObj.file.name);
    //     });
    // });

    // // 🔍 Debug: make sure your files are in there
    // for (let [key, value] of fd.entries()) {
    //   console.log(key, value instanceof File ? value.name : value);
    // }

    // // 3️⃣ Send without overriding Content-Type
    // try {
    //   const response = await api.post("/api/create_test_product", fd);
    //   setSubmitButtonDisabled(false);
    //   onSuccess();
    //   productFetchFunction({ storeId: storeIDForFunction });
    //   console.log(response);
    // } catch (error) {
    //   setErrorMessage(error.response?.data || error.message);
    //   setSubmitButtonDisabled(false);
    //   setTimeout(() => setErrorMessage(""), 4000);
    // }
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

    return () => {
      variants.forEach(v =>
        v.images.forEach(img => {
          if (img.preview) URL.revokeObjectURL(img.preview);
        })
      );
    };
    
  }, [variants]);

  return (

    <div className='w-full flex flex-col items-start justify-start py-6 font-product overflow-scroll custom-scrollbar h-screen'>

      <form className='w-full h-[90%] flex flex-col items-start justify-start' type='multipart/form-data' onSubmit={handleProductAdd}>
      
        <div className='w-full flex h-full items-start justify-between'>

          <div className='w-[64%] border-2 h-full border-less-primary rounded-md flex flex-col items-start justify-start p-4'>

            <h3 className='text-primary text-xl font-semibold tracking-wide'>General Information</h3>

            <div className='w-full flex items-center justify-between mt-5'>

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
          
          <div className='w-[34%] rounded-md flex flex-col items-start justify-start p-4 border-2 border-less-primary h-full'>

            <div className='flex items-center justify-center relative w-full'>

              <h3 className='w-full text-center text-xl font-semibold tracking-wide text-primary'>Product Variants</h3>
              <button onClick={handleAddVariant} type='button' className='absolute right-0 cursor-pointer transition-all hover:rotate-90 hover:scale-110' title='Add Variant'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={28} height={28} color={"#006964"} fill={"none"}>
                      <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 8V16M16 12H8" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              </button>

            </div>

            <div className='w-full flex flex-col items-center justify-start mt-2 relative overflow-y-scroll h-full no-scrollbar'>

              {variants.map((variant, vIdx) => (
                <div key={vIdx} className="flex flex-col items-center justify-center w-full mt-5">
                  <div className='w-full flex items-center justify-between'>
                    {variant.images.map((slot, imgIdx) => (
                      <div key={imgIdx} className="relative w-30 h-30 rounded-sm overflow-hidden">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={e =>
                            handleVariantImageChange(vIdx, imgIdx, e.target.files[0])
                          }
                          style={{zIndex : 3}}
                          required
                        />
                        {!slot.preview && (
                          <div className="absolute inset-0 flex items-center justify-center border-3 border-less-primary rounded-sm" style={{zIndex : 1}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={50} height={50} color={"#006964"} fill={"none"}>
                                <path d="M3 16L7.46967 11.5303C7.80923 11.1908 8.26978 11 8.75 11C9.23022 11 9.69077 11.1908 10.0303 11.5303L14 15.5M15.5 17L14 15.5M21 16L18.5303 13.5303C18.1908 13.1908 17.7302 13 17.25 13C16.7698 13 16.3092 13.1908 15.9697 13.5303L14 15.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 2.5C7.77027 2.5 5.6554 2.5 4.25276 3.69797C4.05358 3.86808 3.86808 4.05358 3.69797 4.25276C2.5 5.6554 2.5 7.77027 2.5 12C2.5 16.2297 2.5 18.3446 3.69797 19.7472C3.86808 19.9464 4.05358 20.1319 4.25276 20.302C5.6554 21.5 7.77027 21.5 12 21.5C16.2297 21.5 18.3446 21.5 19.7472 20.302C19.9464 20.1319 20.1319 19.9464 20.302 19.7472C21.5 18.3446 21.5 16.2297 21.5 12" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21.5 6H18M18 6H14.5M18 6V2.5M18 6V9.5" stroke="#006964" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        {slot.preview && (
                          <img
                            src={slot.preview}
                            alt={`Variant ${vIdx + 1} Image ${imgIdx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover rounded"
                            style={{zIndex : 2}}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <hr className='border w-3/4 border-less-primary my-4' />

                  <div className='w-full flex flex-col items-start justify-start'>
                    <input
                      type="text"
                      placeholder={`Variant ${vIdx + 1} Name`}
                      onChange={e => handleVariantChange(vIdx, 'name', e.target.value)}
                      className="w-full py-3 px-4 bg-less-primary rounded-sm text-primary placeholder:text-primary outline-none"
                      required
                    />
                    <div className='w-full flex items-center justify-between overflow-hidden mt-2'>
                      <input
                        type="number"
                        placeholder="Qty"
                        onChange={e => handleVariantChange(vIdx, 'quantity', e.target.value)}
                        className="w-[49%] px-2 py-3 text-center rounded-sm bg-less-primary text-primary placeholder:text-primary outline-none dis-num-buttons"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        onChange={e => handleVariantChange(vIdx, 'price', e.target.value)}
                        className="w-[49%] px-2 py-3 text-center rounded-sm bg-less-primary text-primary placeholder:text-primary outline-none dis-num-buttons"
                        required
                      />
                    </div>
                  </div>

                  {variants.length > 1 && (
                    <button onClick={() => handleRemoveVariant(vIdx)} className="mt-2 w-full bg-red-500 py-3 rounded-sm text-white">
                      Remove
                    </button>
                  )}
                  
                  <hr className='w-3/4 border border-less-primary mt-4' />
                </div>
              ))}

            </div>

          </div>

        </div>

        <button type="submit" className='w-full py-3 bg-primary text-white mt-3 rounded-sm'>Save</button>
      </form>

    </div>

  )

}

export default SellerAddNewProduct