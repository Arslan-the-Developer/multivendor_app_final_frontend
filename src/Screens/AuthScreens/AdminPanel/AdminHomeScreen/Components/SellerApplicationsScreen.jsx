import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {format} from 'date-fns'
import api from '../../../../../axios';


function SellerApplicationsScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [flowTitle, setFlowTitle] = useState("");
  const [isBeingRejected, setBeingRejected] = useState(false);
  const [shouldShowTheAfterProcessTitle, setAfterProcessTitleState] = useState(false);
  const [AfterProcessTitle, setAfterProcessTitle] = useState("");
  const [showFilters, setShowFiltersState] = useState(false);

  async function fetchSellerApplications(){
    try {
      const response = await api.get('/admin.api/get_all_seller_applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching seller status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerApplications();
  }, []);

  const showApplicationDetails = (application) => {
    setSelectedApplication(application);
    setFlowTitle(`> ${application.seller_store.store_name}`)
  };

  const backToList = () => {
    setSelectedApplication(null);
    setFlowTitle("");
  };

  function convert_date_time(date_from_backend){
    let date = new Date(date_from_backend);

    const formatted_date = format(date, 'MMMM do, yyyy');
    const formatted_time = format(date , 'hh:mm:ss a')

    return [formatted_date, formatted_time];
  }

  async function approve_seller_application(id_of_application) {

    try{

      const approval_response = await api.post('/admin.api/approve_reject_seller_application', JSON.stringify({application_id : id_of_application}));

      console.log(approval_response);

      setAfterProcessTitleState(true);
      setAfterProcessTitle("Seller Application Is Approved");

      setTimeout(() => {

        setSelectedApplication(null);

        fetchSellerApplications();
        
      }, 4000);

    } catch (error) {
      console.error('Error Fetching Results:', error);
    }
    
  }
  
  async function reject_seller_application(id_of_application) {

    try{

      let reject_reason = document.getElementById('rejection_reason').value;

      const rejection_response = await api.delete('/admin.api/approve_reject_seller_application',JSON.stringify({application_id : id_of_application,reason_to_reject : reject_reason,}));

      console.log(rejection_response);

      setAfterProcessTitleState(true);
      setAfterProcessTitle("Seller Application Is Rejected");

      setTimeout(() => {

        setSelectedApplication(null);

        fetchSellerApplications();
        
      }, 4000);

    } catch (error) {

      console.error('Error Fetching Results:', error);

    }
    
  }


  return (
    
    <div className="w-full h-full bg-transparent overflow-y-scroll no-scrollbar flex flex-col items-start px-12 py-6 justify-start relative">

      <div className='w-full flex items-center justify-between motion-preset-slide-down motion-duration-400'>
        <div className='flex items-center justify-center'>
          <button onClick={backToList} className="font-product text-xl font-semibold tracking-wider text-primary cursor-pointer">
            Seller Applications
          </button>

          <h2 className='font-product text-xl ml-2 font-semibold tracking-wider text-primary'>{flowTitle}</h2>
        </div>
        <p className="font-product text-xl font-semibold tracking-wider text-primary">Total : {applications.count}</p>
      </div>

      <div className='w-full h-12 mt-3 flex items-center justify-start'>

        <button onClick={() => showFilters ? setShowFiltersState(false) : setShowFiltersState(true)} className='flex items-center justify-center hover:scale-110 transition'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
              <path d="M3 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 17H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 17L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 7L21 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {
          showFilters ? (

            <div className='ml-6 flex items-center justify-center'>
              <button className='bg-ternary rounded-xl px-6 py-2 text-sm'>All</button>
              <button className='bg-ternary rounded-xl px-6 py-2 mx-2 text-sm'>Approved</button>
              <button className='bg-ternary rounded-xl px-6 py-2 text-sm'>Rejected</button>
            </div>

          ) : ""
        }

      </div>

      <div className="w-full h-full flex items-start justify-start py-5 relative">

        {loading ? (
          <p>Loading...</p>
        ) : selectedApplication ? (
          // Details View
          <div className="w-full h-full flex flex-col items-center overflow-y-scroll custom-scrollbar justify-start p-6 border border-gray-300 rounded-md bg-white shadow-md relative">

            <h3 className='font-product text-xl text-primary'>Store Details</h3>

            <div className='w-full h-full flex items-center justify-center mt-10 px-3'>

              <div className='w-1/4 h-full flex items-center'>

                <img className='object-cover object-center w-full h-full rounded-md' src={`${selectedApplication.seller_store.store_image}`} alt="" />

              </div>

                <hr className='h-3/4 border border-gray-300 mx-12'/>

              <div className='w-3/4 h-full py-1 flex items-center justify-start'>

                <div className='h-full flex flex-col items-start justify-around' style={{width : "30%"}}>
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Store Name</p>
                    <input className='p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_name}/>
                  </div>
                  
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Phone Number</p>
                    <input className='p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={`+92-${selectedApplication.seller_store.store_contact_number}`}/>
                  </div>
                </div>
                
                <div className='h-full flex flex-col items-start justify-around ml-5' style={{width : "30%"}}>
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Category</p>
                    <input className='capitalize p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_category}/>
                  </div>
                  
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Country</p>
                    <input className='capitalize p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_country}/>
                  </div>
                </div>
                
                <div className='h-full flex flex-col items-start justify-center ml-5' style={{width : "30%"}}>
                  
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Address</p>
                    <textarea className='p-3 h-36 w-full rounded-md bg-secondary outline-none resize-none' readOnly value={selectedApplication.seller_store.store_address}></textarea>
                  </div>
                </div>

              </div>
              
            </div>

            <hr className='w-3/4 border border-gray-300 my-12' />

            <h3 className='font-product text-xl text-primary'>ID Details</h3>

            <div className='w-full h-full flex items-center justify-center mt-10 px-3'>
              <div className='h-full flex items-center' style={{width : "25%"}}>

                <img className='object-cover object-center w-full h-full rounded-md' src={`http://127.0.0.1:8000${selectedApplication.seller_id_info.seller_id_images[0].image}`} alt="" />

              </div>
              <div className='h-full flex items-center ml-6' style={{width : "25%"}}>

                <img className='object-cover object-center w-full h-full rounded-md' src={`http://127.0.0.1:8000${selectedApplication.seller_id_info.seller_id_images[1].image}`} alt="" />

              </div>

              <hr className='border border-gray-300 h-3/4 mx-8' />

              <div className='h-full flex flex-col items-center justify-around' style={{width : "50%"}}>

                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>Owner's Name</p>
                    <input className='capitalize p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_id_info.id_card_name}/>
                  </div>
                  
                  <div className='w-full'>
                    <p className='font-product text-primary text-base mb-1 tracking-wider'>ID Number</p>
                    <input className='capitalize p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_id_info.store_id_card_number}/>
                  </div>


              </div>


            </div>
              
            <hr className='border border-gray-300 w-3/4 my-12' />

            <h3 className='font-product text-xl text-primary'>User Information</h3>

            <div className='w-full h-full flex items-center justify-center mt-10 px-3'>

              <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col items-start justify-start w-1/3'>
                  <p className='font-product text-primary text-base mb-1 tracking-wider'>Owner's Name</p>
                  <input className='p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_name}/>
                </div>
                <div className='flex flex-col items-start justify-start w-1/3 mx-4'>
                  <p className='font-product text-primary text-base mb-1 tracking-wider'>Owner's Name</p>
                  <input className='p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_name}/>
                </div>
                <div className='flex flex-col items-start justify-start w-1/3'>
                  <p className='font-product text-primary text-base mb-1 tracking-wider'>Owner's Name</p>
                  <input className='p-3 w-full rounded-md bg-secondary outline-none' readOnly type="text" value={selectedApplication.seller_store.store_name}/>
                </div>
              </div>

            </div>

            {
              shouldShowTheAfterProcessTitle ? (

                <h1 className='w-full text-center text-xl mt-14 mb-6 text-dull font-product tracking-wider motion-preset-slide-up motion-duration-400'>{AfterProcessTitle}</h1>

              ) : (
                
                !isBeingRejected ? (
  
                  <div className='w-full text-center flex items-center justify-center mt-16 mb-6 transition motion-preset-expand'>
  
                    <button onClick={() => approve_seller_application(selectedApplication.id)} className='w-48 h-14 bg-primary text-white rounded-sm font-product text-xl'>Approve</button>
                    <hr className='h-full mx-6 border border-gray-300'/>
                    <button className='w-48 h-14 bg-red-600 text-white rounded-sm font-product text-xl' onClick={() => setBeingRejected(true)}>Reject</button>
  
                  </div>
  
                ) : (
  
                  <div className='w-full flex flex-col items-center justify-center mt-12 mb-4 transition motion-preset-slide-up'>
                    <input id='rejection_reason' type="text" className='w-1/2 p-4 font-product outline-none rounded-md bg-secondary' placeholder='Give The Reason To Reject. . .' />
                    <div>
                      <button onClick={() => setBeingRejected(false)} type="submit" className='w-44 h-12 mt-6 rounded-sm bg-secondary text-dull'>Cancel</button>
                      <button type="submit" onClick={() => reject_seller_application(selectedApplication.id)} className='w-44 h-12 mt-6 rounded-sm bg-red-600 text-white ml-5'>Reject</button>
                    </div>
                  </div>
  
                )
                
              )
            }


          </div>
        ) : (
          // List View
          applications.results.map((application) => (
            <span
              key={application.seller_store.id}
              className={`w-96 p-4 bg-white relative rounded-md flex items-center justify-start cursor-pointer transition duration-300 border-2 motion-preset-slide-up ${application.is_rejected ? "border-red-500" : application.is_approved ? "border-primary" : "border-white hover:border-primary"}`}
              style={{ boxShadow: '2px 8px 10px 1px rgba(0,0,0,.1)' }}
              onClick={application.is_rejected || application.is_approved ? "" : () => showApplicationDetails(application)}
            >
              {
                application.is_rejected ? (
                  <svg className='absolute top-2 right-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} color={'#e82c1e'} fill={"none"}>
                      <path d="M15 9L9 14.9996M15 15L9 9.00039" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : application.is_approved ? (
                  <svg className='absolute top-2 right-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} color={"#006964"} fill={"none"}>
                      <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M8 12.5C8 12.5 9.5 12.5 11.5 16C11.5 16 17.0588 6.83333 22 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : ""
              }
              <img
                className={`w-24 h-24 rounded-full bg-less-primary p-2 object-cover object-center`}
                src={`http://127.0.0.1:8000${application.seller_store.store_image}`}
                alt=""
              />
              <hr className="h-14 mx-6 border border-primary" />
              <div className="flex flex-col items-start justify-start relative">
                <h3 className="font-product text-xl text-primary font-semibold tracking-wider">
                  {application.seller_store.store_name}
                </h3>
                <h3 className="font-product text-base mt-1">
                  {application.user.username}
                </h3>
                {/* <p className='text-xs'>{convert_date_time(application.created)[1]}</p> */}
                <p className='text-xs mt-2'>{convert_date_time(application.created)[0]}</p>
              </div>
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default SellerApplicationsScreen
