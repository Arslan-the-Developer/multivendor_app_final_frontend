import React, { useState, useEffect } from 'react';
// import useFetchData from '../../../Components/useFetchData';

import SellerProductDetails from './SellerProductDetails';
import SellerAddNewProduct from './SellerAddNewProduct';
import api from '../../../axios';



function SellerProductsScreen({STORE_ID}) {


  // State to hold the store products data
  const [loading, setLoading] = useState(true);
  const [storeProducts, setStoreProducts] = useState([]);
  const [productsError, setProductsError] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [baseTitle, setBaseTitle] = useState("Products");
  const [productFlowTitle, setProductFlowTitle] = useState("");
  const [isAddingNewProduct, setAddingNewProduct] = useState(false);

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

  const fetchStoreProducts = async ({ storeId }) => {
    if (!storeId) return; // Guard clause to avoid unnecessary calls
    setProductsLoading(true);

    try {

      const response = await api.post(`/api/get_store_products`, { store_id: storeId });

      setStoreProducts(response.data);

      setLoading(false);

    } catch (error) {

      setProductsError(error.message);

      setLoading(false);
      
    } finally {
      setProductsLoading(false);
      setLoading(false);
    }
  };


  // Fetch store products when sellerData.store_id changes
  useEffect(() => {
    
    fetchStoreProducts({ storeId: STORE_ID });
    
  }, [STORE_ID]);

  const backToSellerProductList = () => {
    setSelectedProduct(null);
    setProductFlowTitle("");
    setAddingNewProduct(false);
    setBaseTitle("Products");
  }

  const showSelectedProduct = (product) => {
    setSelectedProduct(product);
    setProductFlowTitle(`> ${product.product_name}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start p-8 h-full">

      <div className='w-full flex items-start justify-start font-product tracking-wide motion-preset-slide-up motion-duration-400 relative'>

        <h3 onClick={() => backToSellerProductList()} className="text-xl cursor-pointer font-semibold text-primary">{baseTitle}</h3>
        <h3 className="ml-2 text-xl font-semibold text-primary motion-preset-slide-down">{productFlowTitle}</h3>

        {
          storeProducts.length === 0 ? "" : (
        
            <div className='absolute right-0 motion-preset-slide-down'>
              <button onClick={isAddingNewProduct ? () => {setAddingNewProduct(false); setBaseTitle("Products")} : () => {setAddingNewProduct(true); setBaseTitle("New Product"); setProductFlowTitle("");}} className={`w-28 h-11 rounded-md transition-all ${isAddingNewProduct ? "bg-red-500 text-secondary" : "bg-less-primary text-primary hover:bg-primary hover:text-secondary"}`}>{`${isAddingNewProduct ? "Cancel" : "Add New"}`}</button>
            </div>

          )
        }


      </div>


      {productsLoading ? (
        
        <p>Loading products...</p>

      ) : productsError ? (

        <p>Error loading products: {productsError}</p>

      ) : isAddingNewProduct ? (

        <SellerAddNewProduct onSuccess = {backToSellerProductList} productFetchFunction = {fetchStoreProducts} storeIDForFunction = {STORE_ID} />

      ) : (
      
      selectedProduct ? (

        <SellerProductDetails selectedProd={selectedProduct} onSuccess={backToSellerProductList} productFetchFunction={fetchStoreProducts} storeIdForFunction={STORE_ID} />

      ) : (

        <span className="flex flex-wrap w-full mt-8 items-center justify-start">

            {
            storeProducts.length === 0 ? (

              <div className='w-full flex flex-col items-center justify-center h-full'>

                <button onClick={isAddingNewProduct ? () => {setAddingNewProduct(false); setBaseTitle("Products")} : () => {setAddingNewProduct(true); setBaseTitle("Go Back <"); setProductFlowTitle("");}} className='bg-less-primary rounded-full p-1 transition-all hover:scale-95 outline-none border-4 border-less-primary border-dashed hover:border motion-preset-expand'>

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={160} height={160} color={"#006964"} fill={"none"}>
                    <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.5 8.5C2.86239 7.67056 3.3189 6.89166 3.85601 6.17677M6.17681 3.85598C6.89168 3.31888 7.67058 2.86239 8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>

                <p className='text-primary mt-6 text-xl font-product font-semibold motion-preset-slide-up motion-duration-500'>Add Product</p>

              </div>

            ) : (
              
              storeProducts.map((product) => (
  
                <div key={product.id} style={{minWidth : "32%"}} className="h-36 ml-2 mt-3 bg-white flex items-center justify-start transition duration-300 border-2 border-white hover:border-primary rounded-md shadow-lg p-4 motion-preset-slide-up cursor-pointer"
                  onClick={() => showSelectedProduct(product)}
                >
  
                  <img className="w-26 h-26 object-cover object-center" src={`${product.product_variants[0]?.variant_images[0]?.variant_image}`} alt={product.product_name} />
  
                  <hr className="border border-gray-300 h-3/4 mx-4" />
                  
                  <div className="h-full flex flex-col items-start text-sm justify-around">
                    <h2 className='text-primary text-base font-semibold'>{product.product_name}</h2>
                    <h2>Quantity : {product.product_quantity}</h2>
                    <h2>Price : Rs. {product.product_price}</h2>
                    <h2>Rating : {product.average_rating === 0 ? "Not Rated Yet" : product.average_rating.toFixed(1)}</h2>
                  </div>
  
                </div>
  
              ))
            ) 
            }

        </span>

      )
    )
      }

    </div>
  );
}

export default SellerProductsScreen;
