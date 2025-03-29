import React, { useEffect, useState } from 'react'
import useFetchData from '../../../Components/useFetchData';
import axios from 'axios';




function SellerDashboard() {

  const { data: detailsData, error: detailsError, loading: detailsLoading } = useFetchData("authentication/get_user_details", "get", null, 1);
  const { data: sellerData, error: sellerError, loading: sellerLoading } = useFetchData("api/get_seller_details", "get", null, 1);

  let [dashboardData, setDashboardData] = useState(null);

  async function GetSellerDashboardData(storeID) {

    if (!storeID) return;

    try{

      const response = await axios({
        method : "post",
        url : "http://127.0.0.1:8000/api/get_seller_dashboard_details",
        withCredentials : true,
        data : {
          store_id : sellerData?.store_id
        },
        headers : {
          'Content-Type' : 'application/json'
        }
      })

      setDashboardData(response.data);

      console.log(response.data);

    } catch (error) {

      console.log(error);

    }

    
    
  }
  
  useEffect(() => {

    if (sellerData?.store_id) {
      
      GetSellerDashboardData({ storeID: sellerData.store_id });

    }

  }, [sellerData?.store_id]);

  return (

    <div className='p-8 flex flex-col items-center justify-start'>

        <div className='mt-12 flex items-center justify-center'>

          <span className='w-52 h-44 p-4 relative group border-cyan-400 rounded-sm flex flex-col items-center justify-around' style={{borderWidth : "3px"}}>

          <div className='w-11/12 h-10 top-0 opacity-0 group-hover:-top-10 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold transition-all rounded-sm bg-transparent border-cyan-400 absolute' style={{borderWidth : "2px"}}>
            Total Products
          </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={75} height={75} color={"#22d3ee"} fill={"none"}>
                <path d="M12 22C11.1818 22 10.4002 21.6646 8.83693 20.9939C4.94564 19.3243 3 18.4895 3 17.0853L3 7.7475M12 22C12.8182 22 13.5998 21.6646 15.1631 20.9939C19.0544 19.3243 21 18.4895 21 17.0853V7.7475M12 22L12 12.1707M21 7.7475C21 8.35125 20.1984 8.7325 18.5953 9.495L15.6741 10.8844C13.8712 11.7419 12.9697 12.1707 12 12.1707M21 7.7475C21 7.14376 20.1984 6.7625 18.5953 6M3 7.7475C3 8.35125 3.80157 8.7325 5.40472 9.495L8.32592 10.8844C10.1288 11.7419 11.0303 12.1707 12 12.1707M3 7.7475C3 7.14376 3.80157 6.7625 5.40472 6M6.33203 13.311L8.32591 14.2594" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2V4M16 3L14.5 5M8 3L9.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <p className='text-cyan-400 font-semibold font-product text-2xl'>{dashboardData?.store_products_count}</p>

          </span>
          
          <span className='w-52 h-44 p-4 border-primary group rounded-sm flex flex-col items-center justify-around ml-5 relative' style={{borderWidth : "3px"}}>

            <div className='w-11/12 h-10 top-0 opacity-0 group-hover:-top-10 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold transition-all rounded-sm bg-transparent border-primary absolute' style={{borderWidth : "2px"}}>
              Current Month Revenue
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={75} height={75} color={"#006964"} fill={"none"}>
                <ellipse cx="15.5" cy="11" rx="6.5" ry="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11" stroke="currentColor" strokeWidth="1.5" />
                <ellipse cx="8.5" cy="4" rx="6.5" ry="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M15 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <p className='text-primary font-semibold font-product text-2xl'>{dashboardData?.current_revenue_data.revenue_amount}</p>

          </span>

        </div>

    </div>

  )

}

export default SellerDashboard