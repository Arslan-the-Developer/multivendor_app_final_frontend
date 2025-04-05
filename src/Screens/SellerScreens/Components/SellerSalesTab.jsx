import React, { useEffect, useState } from 'react'
// import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
// import useFetchData from '../../../Components/useFetchData';
import axios from 'axios';



function SellerSalesTab() {

  const { data: sellerData, error: sellerError, loading: sellerLoading } = useFetchData("api/get_seller_details", "get", null, 1);

  let [revenueMonths, setRevenueMonths] = useState([]);
  let [monthNames, setMonthNames] = useState([]);
  let [revenueEarnings, setRevenueEarnings] = useState([]);

  async function GetSellerRevenue({storeID}) {

    if (!storeID) return; // Guard clause to avoid unnecessary calls
    
    try{
  
      const revenueResponse = await axios({
        method : "post",
        url : "http://127.0.0.1:8000/api/get_seller_revenue_months",
        withCredentials : true,
        data : {
          store_id : storeID,
        },
        headers : {
          'Content-Type' : "application/json",
        }
      })

      console.log(revenueResponse.data);

      setRevenueMonths(revenueResponse.data);

      let tempMonthList = revenueResponse.data.map((element) => element.month_name);
      
      let tempEarningsList = revenueResponse.data.map((element) => element.revenue_amount);

      setMonthNames(tempMonthList);
      setRevenueEarnings(tempEarningsList);
  
    } catch (error){
  
      console.log(error);
  
    }

  }

  useEffect(() => {
      if (sellerData?.store_id) {
        GetSellerRevenue({ storeID: sellerData.store_id });
      }
    }, [sellerData?.store_id]);

  return (

    <section className='w-full p-10'>

        <h2 className='font-product text-primary font-semibold text-2xl'>Sales</h2>

        {/* {
          revenueMonths.length === 0 ? (

            <h2>Loading...</h2>

          ) : (

            <div>

              {
              revenueMonths.map((item) => (
                <h1 key={item.id}>{item.month_name}</h1>
              ))
              }

            </div>
          )
        } */}


        <BarChart
          xAxis={[
            {
              scaleType: 'band', // Use 'band' scale for categorical data
              data: monthNames, // Months on the x-axis
              label: "Months", // Label for the x-axis
            },
          ]}
          series={[
            {
              data: revenueEarnings, // Earnings data corresponding to each month
              label: "Earnings ($)", // Label for the series
            },
          ]}
          height={350} // Height of the chart
        />

    </section>

  )

}

export default SellerSalesTab