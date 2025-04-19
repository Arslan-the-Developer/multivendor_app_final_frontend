import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { PuffLoader } from 'react-spinners';
import api from '../../axios';
import ProductCard from '../../Components/ProductCard'
import useRefreshTokens from '../../Components/Hooks/useRefreshTokens';



function CategoryProductsScreen() {

    useRefreshTokens();

    const {productSubCategory} = useParams();
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);

    async function FetchCategoryProducts(sub_category) {

        setProductsLoading(true);

        try{

            const response = await api.get(`/api/get_category_products/${sub_category}`);

            console.log(response.data);

            setProducts(response.data.results);
            setProductsCount(response.data.count);

            setProductsLoading(false);

        } catch(error){

            console.log(error);

            setProductsLoading(false);

        }
        
    }

    useEffect(() => {
        FetchCategoryProducts(productSubCategory);
    }, [productSubCategory]);


  return (

    <>
        <Navbar />
        <section className={`h-screen w-full flex flex-col items-start justify-start content-start py-18 px-10 max-md:px-2 max-md:py-2`} style={{height : "90vh"}}>

            <h2 className='font-product text-primary font-semibold tracking-wider mb-6 max-md:ml-0 max-md:w-full max-md:text-center'>{productSubCategory}</h2>

            <div className='w-full flex flex-wrap items-start justify-start'>

                {
                    productsLoading ? (

                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <PuffLoader color='#006964' />
                            <h2 className='mt-4 font-product text-xl text-primary'>Loading Products...</h2>
                            <h2 className='mt-2'>{productSubCategory}</h2>
                        </div>

                    ) : (

                        productsCount < 1 ? (
                            <div className='w-full h-full flex flex-col items-center justify-center'>
                                <h2 className='text-xl font-product text-primary'>No Products For This Category</h2>
                                <Link to={'/'} className='font-product mt-4 text-primary px-6 py-3 border-2 border-primary transition hover:bg-primary hover:text-secondary'>Back To Home</Link>
                            </div>
                        ) : (
                            products.map((product) => (
                                <ProductCard product={product} />
                            ))
                        )

                    )
                }
            
            </div>

        </section>
    </>

  )

}

export default CategoryProductsScreen;