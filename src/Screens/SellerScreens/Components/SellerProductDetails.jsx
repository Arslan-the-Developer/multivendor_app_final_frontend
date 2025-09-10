import React, { useEffect, useState, useRef } from 'react'
import { BarLoader } from 'react-spinners';
import api from '../../../axios';
import axios from 'axios';



function SellerProductDetails({selectedProd, onSuccess, productFetchFunction, storeIdForFunction}) {

  const initialFormData = {
    product_name: selectedProd.product_name,
    product_description: selectedProd.product_description,
    product_subcategory: selectedProd.product_sub_category,
    keywords: selectedProd.product_keywords ? selectedProd.product_keywords.split(",") : [],
    images: selectedProd.product_images, 
    basePrice: selectedProd.product_base_price,
    variantCategories: selectedProd.variant_categories || [],
  };


  const [images, setImages] = useState(
    initialFormData.images.map(img => ({
      id: img.id,           // keep backend ID
      url: img.image,       // backend URL
      type: "old",          // mark as old
    }))
  );

  const [deletedImages, setDeletedImages] = useState([]); // track deleted old images
  const [showAllImages, setShowAllImages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [keywordsError, setKeywordsError] = useState("");

  const [tags, setTags] = useState(initialFormData.keywords);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);


  // For PRODCT VARIANTS


  const [basePrice, setBasePrice] = useState(initialFormData.basePrice);

  const [variantCategories, setVariantCategories] = useState(
    initialFormData.variantCategories.map(cat => ({
      ...cat,
      type: "old"   // 👈 new key-value added
    }))
  );

  const [deletedCategories, setDeletedCategories] = useState([]);
  const [deletedVariants, setDeletedVaraints] = useState([]);


  const isBasePriceSet = basePrice > 0;

  const [submitButtonError, setSubmitButtonError] = useState("");


  const handleReplaceImage = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newImg = {
      file,
      url: URL.createObjectURL(file),
      type: "new",
    };

    setImages(prev => {
      const updated = [...prev];
      updated[index] = newImg;
      return updated;
    });
  };



  const handleAddMore = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map(file => ({
      file,                           // keep the file for upload
      url: URL.createObjectURL(file), // preview
      type: "new",
    }));

    setImages(prev => [...prev, ...newImages]);
  };


  const handleDelete = (img, index) => {
    if (img.type === "old") {
      setDeletedImages(prev => [...prev, img.id]); // track for backend
    }

    setImages(prev => prev.filter((_, i) => i !== index));
  };



    const addCategory = () => {
    if (!isBasePriceSet) return;
    setVariantCategories([
      ...variantCategories,
      { title: "", variants: [{ name: "", quantity: 0, extraPrice: 0 }], type : "new" }
    ]);
  };

  const updateCategoryTitle = (index, value) => {
    if (!isBasePriceSet) return;
    const updated = [...variantCategories];
    updated[index].category_title = value;
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

    setVariantCategories(prev => 
      prev.map((cat, i) => {
        if (i !== catIndex) return cat; // unchanged category

        return {
          ...cat,
          variants: cat.variants.map((variant, j) => {
            if (j !== varIndex) return variant; // unchanged variant
            return {
              ...variant,
              [field]: value   // safely update only this field
            };
          })
        };
      })
    );
  };


  const deleteVariant = (catIndex, varIndex) => {
    setVariantCategories(prev => {
      const updated = prev.map((cat, i) => {
        if (i === catIndex) {
          const variantToDelete = cat.variants[varIndex];

          // Track only if it had an ID (i.e., existed in backend already)
          if (variantToDelete.id) {
            setDeletedVaraints(prevDeleted => [...prevDeleted, variantToDelete.id]);
          }

          return {
            ...cat,
            variants: cat.variants.filter((_, j) => j !== varIndex) // immutable delete
          };
        }
        return cat;
      });

      return updated;
    });
  };


  const deleteCategory = (catIndex) => {
    if (variantCategories.length > 1) {
      if(variantCategories[catIndex].type === "old"){
        setDeletedCategories(prev => [...prev, variantCategories[catIndex].id]);
      }
      const updated = [...variantCategories];
      updated.splice(catIndex, 1);
      setVariantCategories(updated);
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


  function MonitorChanges(initial, current) {

    let changed_fields = [];
    let dataToSend = {};

    // --- Product name ---
    if (initial.product_name !== current.product_name) {
      changed_fields.push("product_name");
      dataToSend.product_name = current.product_name;
    }

    // --- Product subcategory ---
    if (initial.product_subcategory !== current.product_subcategory) {
      changed_fields.push("product_subcategory");
      dataToSend.product_subcategory = current.product_subcategory;
    }

    // --- Product description ---
    if (initial.product_description !== current.product_description) {
      changed_fields.push("product_description");
      dataToSend.product_description = current.product_description;
    }

    // --- Product keywords ---
    const initialSorted = [...initial.keywords].sort();
    const currentSorted = [...current.keywords].sort();
    const isSameKeywords =
      initialSorted.length === currentSorted.length &&
      initialSorted.every((val, i) => val === currentSorted[i]);

    if (!isSameKeywords) {
      changed_fields.push("product_keywords");
      dataToSend.product_keywords = JSON.stringify(current.keywords);
    }


    if(initial.basePrice !== current.basePrice){

      changed_fields.push("product_base_price");
      dataToSend.product_base_price = current.basePrice;

    }


    // --- Variant Categories ---
    const changes = {
      categories_added: [],
      categories_deleted: deletedCategories,
      categories_updated: [],
      variants_added: [],
      variants_deleted: deletedVariants,
      variants_updated: []
    };

    // Detect new categories
    current.variantCategories.forEach(cat => {
      if (!cat.id) {
        changes.categories_added.push({
          title: cat.category_title,
          variants: cat.variants
        });
      }
    });

    // Detect updates
    current.variantCategories.forEach(newCat => {
      const oldCat = initial.variantCategories.find(c => c.id === newCat.id);
      if (!oldCat) return; // skip new

      // Category title update
      if (oldCat.category_title !== newCat.category_title) {
        changes.categories_updated.push({
          id: newCat.id,
          new_title: newCat.category_title
        });
      }

      // Variants inside this category
      newCat.variants.forEach(newV => {
        // Added
        if (!newV.id) {
          changes.variants_added.push({
            category_id: newCat.id,
            name: newV.variant_name,
            quantity: newV.variant_quantity,
            extraPrice: newV.extra_price
          });
          return;
        }

        // Updated
        const oldV = oldCat.variants.find(v => v.id === newV.id);
        if (!oldV) return;

        const updatedFields = {};
        if (oldV.variant_name !== newV.variant_name) {
          updatedFields.variant_name = newV.variant_name;
        }
        if (oldV.variant_quantity !== newV.variant_quantity) {
          updatedFields.variant_quantity = newV.variant_quantity;
        }
        if (oldV.extra_price !== newV.extra_price) {
          updatedFields.extra_price = newV.extra_price;
        }

        if (Object.keys(updatedFields).length > 0) {
          changes.variants_updated.push({
            id: newV.id,
            ...updatedFields
          });
        }
      });
    });

    // Only include if changes exist
    if (
      changes.categories_added.length ||
      changes.categories_deleted.length ||
      changes.categories_updated.length ||
      changes.variants_added.length ||
      changes.variants_deleted.length ||
      changes.variants_updated.length
    ) {
      changed_fields.push("variant_categories_changes");
      dataToSend.variant_categories_changes = JSON.stringify(changes);
    }

    return [changed_fields, dataToSend];
  }





  async function handleProductUpdate(e) {
    
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

    // 2️⃣ Build currentData (from your state)
    const currentData = {
      product_name: e.target.product_name.value,
      product_description: e.target.product_description.value,
      product_subcategory: e.target.product_subcategory.value,
      keywords: tags, // already array
      images: images, // [{ preview, file }]
      basePrice: basePrice,
      variantCategories: variantCategories,
    };

    
    let MonitoringResult = MonitorChanges(initialFormData, currentData);

    
    let newImagesLength = currentData.images.filter(item => item.type === "new").length;
    
    if(MonitoringResult[0].length < 1 && deletedImages.length < 1 && newImagesLength < 1){

      setSubmitButtonDisabled(false);

      setSubmitButtonError("No Changes Detected");

      setTimeout(() => {

        setSubmitButtonError("");

      }, 2000);

      return;

    }
    
   
    let formDataToSend = new FormData();
    
   
    // Send Images Data

    deletedImages.forEach(id => {

      formDataToSend.append("deleted_images", id);
      
    });
    
    
    currentData.images.forEach(img => {

      if(img.type === "new" && img.file){

        formDataToSend.append("new_images", img.file);

      }
      
    });


    MonitoringResult[0].forEach(field => {

      formDataToSend.append(field, MonitoringResult[1][field]);
      
    });


    console.log("Form Data To Send");

    for(let [key,value] of formDataToSend.entries()){
      console.log(key,value);
    }
    


    try {

      const response = await api.put(`/api/modify_product/${selectedProd.id}`, formDataToSend);

      setSubmitButtonDisabled(false);

      onSuccess();
      productFetchFunction({ storeId: storeIdForFunction });

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

    <div className='flex flex-col items-start justify-start mt-6 font-product overflow-scroll custom-scrollbar relative'>

      <form className='w-full flex flex-col items-start justify-start no-scrollbar' type='multipart/form-data' onSubmit={handleProductUpdate}>
      
        <div className='w-full flex items-start justify-start'>

          <div className='w-[64%] border-2 border-less-primary rounded-md flex flex-col items-start justify-start p-4'>

            <h3 className='text-primary text-xl font-semibold tracking-wide'>General Information</h3>

            <div className='w-full flex items-center justify-between mt-3'>

              <div className='w-[49.3%] flex flex-col items-start justify-start'>
                <label className='cursor-pointer' htmlFor="pr_name">Product Name</label>
                <input defaultValue={initialFormData.product_name} name='product_name' id='pr_name' className='bg-less-primary px-2 py-[12px] rounded-md w-full mt-1 placeholder:text-primary text-primary outline-none' type="text" placeholder='Product Name' required/>
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
                          <option key={sub_category} value={sub_category} selected={sub_category === initialFormData.product_subcategory}>
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
              <textarea id='pr_ds' defaultValue={initialFormData.product_description} className='w-full bg-less-primary mt-2 rounded-md p-2 resize-none text-primary placeholder:text-primary outline-none h-35' placeholder='Write Details Of Your High Quality Product...' name="product_description" required></textarea>
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
              showAllImages && (
                <div className='w-full h-full bg-white p-4 absolute top-0 left-0 rounded-sm flex flex-col items-start justify-start' style={{zIndex : 5}}>

                  <div className='w-full h-full flex flex-col items-start justify-start relative'>

                    <button className='absolute top-0 right-0 transition-all hover:rotate-90 cursor-pointer hover:scale-105' onClick={() => setShowAllImages(false)}>
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
                            src={img.url}
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


            <div className='w-full flex flex-col items-center justify-start relative'>

              <div className="w-full flex flex-col gap-4">

                {/* Main Image */}
                {images.length > 0 ? (
                  <label className="w-full h-64 border-2 border-less-primary rounded-md overflow-hidden relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleReplaceImage(e, 0)}
                    />
                    <img
                      src={images[0].url}
                      alt="main"
                      className="w-full h-full object-contain"
                    />
                    <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      handleDelete(img, i);   // ✅ pass the actual image and its index
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                  </label>
                ) : (
                  <label className="w-full h-64 border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer">
                    +
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleReplaceImage(e, 0)}
                    />
                  </label>
                )}

                <div className="w-full flex gap-3">
                {[0, 1, 2].map((slotIndex) => {
                  const img = images[slotIndex + 1]; // skip first (main)
                  const extraCount = images.length - 4; // total - (1 main + 3 row slots)

                  if (img) {
                    const isLastSlot = slotIndex === 2;
                    const showOverlay = isLastSlot && extraCount > 0;

                    return (
                      <label
                        key={slotIndex}
                        className="relative w-24 h-24 border-2 border-less-primary rounded-md overflow-hidden cursor-pointer"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleReplaceImage(e, slotIndex + 1)}
                        />
                        <img
                          src={img.url}
                          alt="preview"
                          className="w-full h-full object-contain"
                        />

                        {/* Delete button (only if no overlay) */}
                        {!showOverlay && (
                          <button
                            type="button"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              handleDelete(img, slotIndex + 1);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                          >
                            ✕
                          </button>
                        )}

                        {/* Overlay for +n */}
                        {showOverlay && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation(); // stop click from reaching label/input
                              e.preventDefault();  // prevent file input from opening
                              setShowAllImages(true);
                            }}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-lg font-semibold cursor-pointer"
                          >
                            +{extraCount}
                          </span>
                        )}
                      </label>
                    );
                  } else {
                    // Empty slot
                    return (
                      <label
                        key={slotIndex}
                        className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer"
                      >
                        +
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleReplaceImage(e, slotIndex + 1)}
                        />
                      </label>
                    );
                  }
                })}
              </div>

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
                    defaultValue={category.category_title}
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
                  const finalPrice = basePrice + (parseFloat(variant.extra_price) || 0);
                  return (
                    <div key={varIndex} className="flex gap-3 mb-3 items-center">
                      <input
                        type="text"
                        className="outline-none placeholder:text-primary text-primary px-2 py-3 rounded w-140 bg-less-primary"
                        placeholder="Variant Name (e.g., Small)"
                        defaultValue={variant.variant_name}
                        value={variant.variant_name}
                        onChange={(e) =>
                          updateVariant(catIndex, varIndex, "variant_name", e.target.value)
                        }
                        disabled={!isBasePriceSet}
                        required
                      />
                      <input
                        type="number"
                        className="text-primary placeholder:text-primary outline-none dis-num-buttons px-2 py-3 rounded w-35 text-center bg-less-primary"
                        placeholder="Quantity"
                        min="1"
                        defaultValue={variant.variant_quantity}
                        value={variant.variant_quantity < 1 ? 1 : variant.variant_quantity}
                        onChange={(e) =>
                          updateVariant(
                            catIndex,
                            varIndex,
                            "variant_quantity",
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
                        value={variant.extra_price}
                        onChange={(e) =>
                          updateVariant(
                            catIndex,
                            varIndex,
                            "extra_price",
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

        <div className='w-full h-15 flex items-center justify-between mt-3 mb-8'>

          <button disabled={isSubmitButtonDisabled} type="submit" className={`w-full h-full flex items-center justify-center bg-primary text-white rounded-sm ${isSubmitButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>{isSubmitButtonDisabled ? <BarLoader color='#ffffff' /> : submitButtonError !== "" ? submitButtonError : "Update"}</button>

        </div>

      </form>

    </div>

  )


}

export default SellerProductDetails