import { useEffect, useState } from 'react';
import axios from 'axios';


function useCheckAuthentication() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [isApprovedSeller, setIsApprovedSeller] = useState(false);
    const [loading, setLoading] = useState(true);


    async function CheckSeller() {

        try{

            const seller_response = await axios.get(`${import.meta.env.VITE_API_URL}/authentication/check_seller`,{ withCredentials : true });

            setIsSeller(seller_response.data.is_seller);
            setIsApprovedSeller(seller_response.data.is_approved_seller);

        } catch(seller_check_error){

            setIsSeller(false);
            setIsApprovedSeller(false);

        }
        
    }

    async function checkAuthentication() {

        try {

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/authentication/check_user_authentication`,{ withCredentials: true });

            if (response.status === 200) {

                setIsAuthenticated(true);

                CheckSeller();

            }

        } catch (error) {

            if (error.response?.status === 403) {
                setIsAuthenticated(false);
            }

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {

        checkAuthentication();

    }, []);

    return { isAuthenticated, isSeller, isApprovedSeller ,loading };
}

export default useCheckAuthentication;
