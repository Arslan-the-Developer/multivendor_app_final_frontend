import { useEffect, useState, useRef } from 'react';
import api from '../../axios';


function useCheckAuthentication() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isApprovedSeller, setIsApprovedSeller] = useState(false);
  const [isStoreBasicInfoAdded, setStoreBasicInfoAdded] = useState(false);
  const [isStoreIDInfoAdded, setStoreIDInfoAdded] = useState(false);
  const [isStoreRejected, setStoreRejected] = useState(false);
  const [loading, setLoading] = useState(true);
  const didRun = useRef(false); // To prevent multiple invocations

  async function CheckSellerStatus() {
    try {
      const sellerStatusResponse = await api.get(`/authentication/check_seller_status`);
      setStoreBasicInfoAdded(sellerStatusResponse.data.is_basic_info_added);
      setStoreIDInfoAdded(sellerStatusResponse.data.is_id_info_added);
      setStoreRejected(sellerStatusResponse.data.is_rejected);
    } catch (error) {
      console.error("checkSellerStatus error:", error);
      // Set defaults to prevent undefined values
      setStoreBasicInfoAdded(false);
      setStoreIDInfoAdded(false);
      setStoreRejected(false);
    }
  }

  async function CheckSeller() {
    try {
      const sellerResponse = await api.get(`/authentication/check_seller`);
      setIsSeller(sellerResponse.data.is_seller);
      setIsApprovedSeller(sellerResponse.data.is_approved_seller);
      if (sellerResponse.data.is_seller) {
        await CheckSellerStatus();
      }
    } catch (error) {
      console.error("CheckSeller error:", error);
      setIsSeller(false);
      setIsApprovedSeller(false);
    }
  }

  async function checkAuthentication() {
    try {
      const response = await api.get(`/authentication/check_user_authentication`);
      if (response.status === 200) {
        setIsAuthenticated(true);
        await CheckSeller();
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setIsAuthenticated(false);
      }
      console.error("checkAuthentication error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined' || didRun.current) return;
    
    // Define a function to be called when the page is fully loaded and cookies are available.
    const onLoad = () => {
      // Optionally, you can check for a specific cookie here:
      // if(document.cookie.includes("myCookieName=")) { ... }
      checkAuthentication();
    };

    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }

    didRun.current = true;
  }, []);

  return { 
    isAuthenticated, 
    isSeller, 
    isApprovedSeller, 
    isStoreBasicInfoAdded, 
    isStoreIDInfoAdded, 
    isStoreRejected, 
    loading 
  };
}

export default useCheckAuthentication;
