import React, { useEffect, useState } from 'react'
// import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
// import useFetchData from '../../../Components/useFetchData';
import axios from 'axios';



function SellerSalesTab({STORE_ID}) {


  let [revenueMonths, setRevenueMonths] = useState([]);
  const [loading, setLaoding] = useState(true);
  let [monthNames, setMonthNames] = useState([]);
  let [revenueEarnings, setRevenueEarnings] = useState([]);


  async function GetSellerRevenue({storeID}) {

    if (!storeID) return;
    
    try{
  
      const revenueResponse = await axios({
        method : "post",
        url : `${import.meta.env.VITE_API_URL}/api/get_seller_revenue_months`,
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

      setLaoding(false);
  
    } catch (error){
  
      console.log(error);

      setLaoding(false);
  
    }

  }

  useEffect(() => {

    
    GetSellerRevenue({ storeID: STORE_ID });
    

  }, [STORE_ID]);

  return loading ? (
    <h1>Loading....</h1>
  ) : (

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