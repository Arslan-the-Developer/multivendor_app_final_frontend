import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import useCheckAuthentication from "./Hooks/useCheckAuthentication";
import { BarLoader } from "react-spinners";
import useRefreshTokens from "./Hooks/useRefreshTokens";



function Navbar() {

  useRefreshTokens();

  const navigate = useNavigate();

  const { isAuthenticated, isSeller, isApprovedSeller, isStoreBasicInfoAdded, isStoreIDInfoAdded, isStoreRejected, loading } = useCheckAuthentication();

  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isResponsiveMenuOpen, setResponsiveMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSubCategoriesFor, setShowCategoriesFor] = useState('');
  const [SearchBarUxText, setSearchBarUxText] = useState('Shift + S');
  const [selectedResponsiveCategory, setSelectedResponsiveCategory] = useState('');


  const keyRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
        keyRef.current = event.keyCode;

        if (event.shiftKey && keyRef.current === 83) {
            
            event.preventDefault();
            
            event.stopPropagation();

            document.getElementById("search_box").focus();

            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
        window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


  useEffect(() => {

    const handleScroll = () => {
      
      setAccountMenuOpen(false);

    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  async function HandleSearch(e) {

    e.preventDefault();

    navigate(`/user-search/${searchText}`);
    
  }


  function getSubCategories(parent_category) {

    switch (parent_category) {

      case 'electronics':

        return [{show_name : 'Accessories', link : 'Accessories & Supplies'},{show_name : 'Camera & Photo', link : 'Camera & Photo'},{show_name : 'Vehicle Electronics', link : 'Car & Vehicle Electronics'},{show_name : 'Cell Phones', link : 'Cell Phones & Accessories'},{show_name : 'Computer Electronics', link : 'Computer Accessories'},{show_name : 'GPS & Navigation', link : 'GPS & Navigation'},{show_name : 'Headphones', link : 'Headphones'},{show_name : 'Home Audio', link : 'Home Audio'},{show_name : 'Office Electronics', link : 'Office Electronics'},{show_name : 'Portable Electronics', link : 'Portable Audio & Video'},{show_name : 'Security', link : 'Security & Survelliance'},{show_name : 'TV & Audio', link : 'Television & Audio'}]
        break;
        
      case 'beauty & care':

        return [{show_name : 'Makeup', link : 'Makeup'},{show_name : 'Skin Care', link : 'Skin Care'},{show_name : 'Hair Care', link : 'Hair Care'},{show_name : "Men's Fragrance", link : 'Fragrance - Men'},{show_name : "Women's Fragrance", link : 'Fragrance - Women'},{show_name : 'Beauty Tools', link : 'Beauty Tools'},{show_name : 'Hair Removal', link : 'Shave & Hair Removal'},{show_name : 'Baby Care', link : 'Baby Care'},{show_name : 'Oral Care', link : 'Oral Care'},{show_name : "Men's Care", link : 'Personal Care - Men'},{show_name : "Women's Care", link : 'Personal Care - Women'}]
        break;
      
      case 'fashion & clothing':

        return [{show_name : "Women's Clothes", link : 'Clothes - Women'},{show_name : "Women's Handbags", link : 'Handbags - Women'},{show_name : "Women's Shoes", link : 'Shoes - Women'},{show_name : "Women's Watches", link : 'Watches - Women'},{show_name : "Men's Clothing", link : 'Clothing - Men'},{show_name : "Men's Watches", link : 'Watches - Men'},{show_name : "Men's Shoes", link : 'Shoes - Men'},{show_name : "Children's Clothes", link : 'Clothes - Children'},{show_name : "Children's Shoes", link : 'Shoes - Children'}]
        break;
      
      case 'home & kitchen':

        return [{show_name : "Kitchen & Dining", link : 'Kitchen & Dining'},{show_name : "Bedding", link : 'Bedding'},{show_name : "Bath", link : 'Bath'},{show_name : "Event & Party", link : 'Event & Party'},{show_name : "Air Quality", link : 'Heating, Cooling & Air Quality'},{show_name : "Irons & Steamers", link : 'Irons & Steamers'},{show_name : "Floor Care", link : 'Vaccums & Floor Care'},{show_name : "Storage", link : 'Storage & Organization'},{show_name : "Cleaning Supplies", link : 'Cleaning Supplies'},{show_name : "Kitchen", link : 'Kitchen Accessories'},{show_name : "Cutlery", link : 'Cutlery'}]
        break;
      
      case 'health & wellness':

        return [{show_name : "Health Care", link : 'Health Care'},{show_name : "Vision Care", link : 'Vision Care'},{show_name : "Vitamins", link : 'Vitamins'},{show_name : "Medical Supplies", link : 'Medical Supplies'},{show_name : "First Aid", link : 'First Aid Accessories'},{show_name : "Nutrition", link : 'Nutrition'},{show_name : "Wellness", link : 'Wellness'},{show_name : "Dietry Supplies", link : 'Dietry Suppliments'},{show_name : "Relaxation", link : 'Relaxation'},{show_name : "Medical Equipments", link : 'Medical Accessories'}]
        break;
      
      case 'toys & games':

        return [{show_name : "Figures & Statues", link : 'Action Figures & Statues'},{show_name : "Arts & Crafts", link : 'Arts & Crafts'},{show_name : "Baby & Toddler Toys", link : 'Baby & Toddler Toys'},{show_name : "Dolls & Equipments", link : 'Dolls & Accessories'},{show_name : "Cosplay", link : 'Dress Up & Pretend Play'},{show_name : "Kids Electronics", link : 'Kids Electronics'},{show_name : "Games", link : 'Games'},{show_name : "Grown-Up Toys", link : 'Grown-Up Toys'},{show_name : "Puzzles", link : 'Puzzles'},{show_name : "Cycels & Scooters", link : 'Tricycles, Scooters & Wagons'},{show_name : "Video Games", link : 'Video Games'},{show_name : "RC Toys", link : 'RC Toys'}]
        break;
      
      case 'automotive':

        return [{show_name : "Car Care", link : 'Car Care'},{show_name : "Car Equipments", link : 'Car Electronics & Accessories'},{show_name : "Car Exterior", link : 'Exterior Accessories'},{show_name : "Car Interior", link : 'Interior Accessories'},{show_name : "Lightning Equipments", link : 'Lights & Lighting Accessories'},{show_name : "Motorcycle", link : 'Motorcycle & Powersports'},{show_name : "Oils & Fluids", link : 'Oils & Fluids'},{show_name : "Paint Supplies", link : 'Paint & Paint Supplies'},{show_name : "Replacement Parts", link : 'Replacement Parts'},{show_name : "Tires & Wheels", link : 'Tires & Wheels'},{show_name : "Tools & Equipment", link : 'Tools & Equipment'},{show_name : "RV Parts", link : 'RV Parts & Accessories'}]
        break;
      
      case 'office supplies':

        return [{show_name : "Files & Organization", link : 'Files & Organization'},{show_name : "General Supplies", link : 'General Office Supplies'},{show_name : "Office Equipment", link : 'Office Equipment'},{show_name : "Presentation Supplies", link : 'Presentation Supplies'},{show_name : "Paper Handling", link : 'Paper Handling'},{show_name : "Name Plates", link : 'Name Plates'},{show_name : "Shipping Supplies", link : 'Shipping Supplies'},{show_name : "Office Instruments", link : 'Office Instruments'},{show_name : "Impulse Sealers", link : 'Impulse Sealers'},{show_name : "Book Accessories", link : 'Book Accessories'},{show_name : "Office Stamps", link : 'Office Stamps'}]
        break;
    
      default:
        break;
    }
    
  }


  return (
    <nav className="flex items-center justify-between w-full h-18 relative" onMouseLeave={() => setShowCategoriesFor('')} style={{zIndex : '20'}}>
      {/* Logo Section */}
      <div className="w-1/4 flex items-center justify-center h-full max-[900px]:hidden" onMouseEnter={() => setShowCategoriesFor('')}>
        <Link to="/" className="text-3xl font-lilita">
          <motion.h2 initial={{x : -20, opacity : 0}} animate={{x : 0, opacity : 1}}>Vend<span className="text-primary">ezy</span></motion.h2>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="w-1/2 max-[900px]:w-full relative flex items-center justify-center h-full mb-2" onMouseEnter={() => setShowCategoriesFor('')}>
        <motion.button initial={{opacity : 0, scale : 0}} animate={{opacity : 1, scale : 1}} className="absolute left-3 hidden max-[900px]:flex" onClick={() => setResponsiveMenuOpen(!isResponsiveMenuOpen)}>
          {
            isResponsiveMenuOpen ? (
              <motion.svg initial={{opacity : 0, scale : 0}} animate={{opacity : 1, scale : 1}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                <path d="M4 8.5L20 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 15.5L20 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )
          }
        </motion.button>
        <div className={`w-full flex-col bg-secondary items-center justify-start font-product hidden max-[900px]:flex p-3 absolute ${isResponsiveMenuOpen ? isAuthenticated ? 'h-110 -bottom-110' : 'h-100 -bottom-100' : 'h-0 bottom-0 opacity-0'} shadow-md transition-all`}>

          {
            isResponsiveMenuOpen ? (
          
              <div className="w-full h-full flex items-center justify-start bg-secondary">

                {
                  loading ? "loading..." : isAuthenticated ? "Authenticated" : "Not Authen"
                }

                  <div className="w-full flex flex-col items-center justify-start h-full">

                    {
                      loading ? (

                        <BarLoader color="#006964" />
                      
                      ) : (

                        isAuthenticated ? (
      
                          <div className="w-full flex items-center justify-center h-1/9">
                            <Link className="w-1/4 bg-less-primary flex items-center justify-center py-3 transition-all border-b-2 border-transparent hover:border-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <path d="M7.78256 17.1112C6.68218 17.743 3.79706 19.0331 5.55429 20.6474C6.41269 21.436 7.36872 22 8.57068 22H15.4293C16.6313 22 17.5873 21.436 18.4457 20.6474C20.2029 19.0331 17.3178 17.743 16.2174 17.1112C13.6371 15.6296 10.3629 15.6296 7.78256 17.1112Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10Z" stroke="currentColor" strokeWidth="1.5" />
                                  <path d="M2.854 16C2.30501 14.7664 2 13.401 2 11.9646C2 6.46129 6.47715 2 12 2C17.5228 2 22 6.46129 22 11.9646C22 13.401 21.695 14.7664 21.146 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </Link>
                            
                            <Link className="w-1/4 bg-less-primary flex items-center justify-center py-3 transition-all border-b-2 border-transparent hover:border-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <path d="M8 16L16.7201 15.2733C19.4486 15.046 20.0611 14.45 20.3635 11.7289L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M6 6H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <circle cx="6" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
                                  <circle cx="17" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
                                  <path d="M8 20L15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M2 2H2.966C3.91068 2 4.73414 2.62459 4.96326 3.51493L7.93852 15.0765C8.08887 15.6608 7.9602 16.2797 7.58824 16.7616L6.63213 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </Link>
                            <Link className="w-1/4 bg-less-primary flex items-center justify-center py-3 transition-all border-b-2 border-transparent hover:border-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <path d="M2 13.4286V8H22V13.4286C22 17.4692 22 19.4895 20.6983 20.7447C19.3965 22 17.3014 22 13.1111 22H10.8889C6.69863 22 4.6035 22 3.30175 20.7447C2 19.4895 2 17.4692 2 13.4286Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M2 8L2.96154 5.69231C3.70726 3.90257 4.08013 3.0077 4.8359 2.50385C5.59167 2 6.56112 2 8.5 2H15.5C17.4389 2 18.4083 2 19.1641 2.50385C19.9199 3.0077 20.2927 3.90257 21.0385 5.69231L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M12 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  <path d="M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </Link>
                            <Link className="w-1/4 bg-less-primary flex items-center justify-center py-3 transition-all border-b-2 border-transparent hover:border-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <path d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </Link>
                          </div>

                        ) : (

                          <div className="w-full flex items-center justify-between h-1/9">

                            <Link className="font-lilita text-dull text-2xl" to={`/`}>
                              Vend<span className="text-primary">ezy</span>
                            </Link>

                            <Link to={'/user-login'} className="py-2 w-1/4 transition-all hover:bg-[#007d77] flex items-center justify-center rounded-sm bg-primary text-secondary">
                              Login
                            </Link>

                          
                          </div>

                        )
                    )
                    }

                    <hr className="my-3 border border-less-primary w-full"/>

                    {
                      selectedResponsiveCategory === '' ? (

                        <div className="w-full h-6/10 flex flex-wrap items-start justify-between">

                          <div className="w-1/2 h-full flex flex-col items-center justify-around">

                            <button onClick={() => setSelectedResponsiveCategory('electronics')} type='button' className="flex w-40 pl-2 items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Electronics</button>
                            <button onClick={() => setSelectedResponsiveCategory('fashion & clothing')} type='button' className="flex w-40 pl-2 items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Fashion & Clothing</button>
                            <button onClick={() => setSelectedResponsiveCategory('beauty & care')} type='button' className="flex w-40 pl-2 items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Beauty & Care</button>
                            <button onClick={() => setSelectedResponsiveCategory('home & kitchen')} type='button' className="flex w-40 pl-2 items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Home & Kitchen</button>

                          </div>

                          <div className="w-1/2 h-full flex flex-col items-center justify-around">

                            <button onClick={() => setSelectedResponsiveCategory('health & wellness')} type='button' className="w-40 pl-2 flex items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Health & Wellness</button>
                            <button onClick={() => setSelectedResponsiveCategory('toys & games')} type='button' className="w-40 pl-2 flex items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Toys & Games</button>
                            <button onClick={() => setSelectedResponsiveCategory('automotive')} type='button' className="w-40 pl-2 flex items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Automotive</button>
                            <button onClick={() => setSelectedResponsiveCategory('office supplies')} type='button' className="w-40 pl-2 flex items-center justify-start border-s-2 border-transparent hover:border-primary transition-all hover:text-primary duration-300 px-2">Office Supplies</button>

                          </div>

                          <div className={`w-full flex items-center justify-between ${isAuthenticated ? 'mt-2' : 'mt-6'}`}>
                            <Link to={'/product-categories'} className="py-3 flex items-center justify-center text-primary bg-less-primary" style={{width : "49%"}}>All Categories</Link>
                            <Link to={'/product-categories'} className="py-3 flex items-center justify-center text-primary bg-less-primary" style={{width : "49%"}}>Top Selling</Link>
                          </div>

                          {
                            isAuthenticated ? (

                              <p className="text-xl font-lilita w-full flex items-center justify-center py-2 mt-1">Vend<span className="text-primary">ezy</span><span className="font-product text-sm ml-1 font-semibold tracking-wider"> - All Rights Reserved</span></p>

                            ) : ''
                          }


                        </div>

                      ) : (

                        <motion.div initial={{opacity : 0, y : 10}} animate={{opacity : 1, y : 0}} className="w-full h-9/10 flex flex-col items-center justify-start overflow-hidden">

                          <div className="w-full h-1/10 flex items-center justify-center relative">
                            <button className="absolute left-2" onClick={() => setSelectedResponsiveCategory('')}>
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#006964"} fill={"none"}>
                                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                  <path d="M8 12L16 12M8 12C8 11.2998 9.9943 9.99153 10.5 9.5M8 12C8 12.7002 9.9943 14.0085 10.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                            <h2 className="capitalize text-xl text-primary">{selectedResponsiveCategory}</h2>
                          </div>

                          <div className="w-full px-3 pb-3 flex flex-col flex-wrap items-start justify-start" style={{maxHeight : "90%"}}>

                            {
                              getSubCategories(selectedResponsiveCategory).map((sub_cat) => (
                                <Link className="mt-5 pl-2 border-s-2 border-transparent transition-all hover:border-primary hover:text-primary text-dull duration-300" to={`/products/${sub_cat.link}`}>
                                  {sub_cat.show_name}
                                </Link>
                              ))
                            }

                          </div>


                        </motion.div>
                      )

                    }

                  </div>

              </div>

            ) : ''
          }

        </div>
        <motion.form initial={{y : 20, opacity : 0}} animate={{y : 0, opacity : 1}} className="w-9/12 flex items-center justify-center relative" onSubmit={HandleSearch}>
          <input
            id="search_box"
            type="text"
            placeholder="Search Products . . . ."
            className="py-2 px-3 mt-2 max-[900px]:mt-0 w-full rounded-sm placeholder:text-dull bg-gray-200 text-dull outline-none font-product max-w-full"
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value); e.target.value === '' ? setSearchBarUxText('Shift + S') : setSearchBarUxText(' Enter ');}}
          />
          <button type="button" className="absolute right-0 bg-less-primary mr-2 rounded-sm mt-2 px-2 py-1 font-semibold text-center text-xs flex items-center justify-center outline-none max-[900px]:hidden" aria-label="Search">
            {SearchBarUxText}
          </button>
          <button type="submit" className="absolute right-0 mr-2 rounded-sm px-2 py-1 font-semibold text-center text-xs items-center justify-center outline-none hidden max-[900px]:flex" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#006964"} fill={"none"}>
                <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.form>
      </div>

      {/* User Section */}
      <div className="w-1/4 flex items-center justify-center h-full max-[900px]:hidden" onMouseEnter={() => setShowCategoriesFor('')}>
        {
          loading ? (
            <BarLoader color="#006964" />
          ) : (

            !isAuthenticated ? (
              // Display Login Button if not authenticated
              <Link to="/user-login">
                <motion.button initial={{x : 20, opacity : 0}} animate={{x : 0, opacity : 1}} className="px-7 rounded-sm py-2 bg-primary text-secondary font-product tracking-wide transition-all hover:tracking-widest cursor-pointer">
                  Login
                </motion.button>
              </Link>
            ) : (
              // Display other options if authenticated
              <div className="flex items-center">
                
                {!isSeller ? (
                  <Link to="/seller-registration" className="py-2 px-3 rounded-sm mr-2 text-primary transition hover:scale-105 flex items-center font-product">
                    Sell on{" "}
                    <p className="font-lilita ml-1 text-xl">
                      <span className="text-dull">Vend</span>ezy
                    </p>
                  </Link>
                ) : (
    
                  isApprovedSeller ? (<Link className="mr-4 text-primary transition hover:scale-105 font-product tracking-wider font-semibold" to="/seller-dashboard">Switch To Selling</Link>) : (<Link className="mr-4 px-3 py-2 hover:scale-105 text-primary outline-none transition focus:scale-105 font-product tracking-wider font-semibold" to={"/seller-status"}>Seller Status</Link>)
                  
                )}
                <div title="Account" className="outline-none relative flex items-center justify-center">
    
                  <button onClick={() => {isAccountMenuOpen ? setAccountMenuOpen(false) : setAccountMenuOpen(true)}} className="transition-all hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" className="injected-svg" data-src="https://cdn.hugeicons.com/icons/user-circle-02-solid-standard.svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" color="#1a1a1a">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12Z" fill="#1a1a1a"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.40917 17.6473C6.43291 15.8558 8.33814 14.7501 10.4016 14.7501H13.5983C15.6618 14.7501 17.567 15.8558 18.5907 17.6473L18.5936 17.6523L19.3725 19.0398C19.5437 19.3447 19.4815 19.7274 19.2226 19.9623C17.3147 21.6939 14.7798 22.75 12 22.75C9.22021 22.75 6.68531 21.6939 4.77744 19.9623C4.51856 19.7274 4.45636 19.3447 4.62748 19.0399L5.40917 17.6473Z" fill="#1a1a1a"></path>
                      <path d="M8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10Z" fill="#1a1a1a"></path>
                    </svg>
                  </button>
    
                  {
                    isAccountMenuOpen ? (
    
                      <div className={`w-40 h-36 absolute -bottom-40`} style={{zIndex : "11"}}>
                        <span className={`w-full h-full flex items-center justify-center relative transition`}>
    
                          <span className="w-4 rotate-45 h-4 absolute -top-2 bg-white shadow-lg" style={{zIndex : "1"}}></span>
    
                          <span className="w-full h-full flex flex-col items-start justify-start bg-white shadow-md rounded-sm font-product tracking-wider font-semibold" style={{zIndex : "2"}}>
    
                            <Link title="" to={"/user-profile"} className="w-full text-sm text-center py-2 border-white border-x-2 hover:border-primary hover:text-primary transition-all duration-300">Profile</Link>
                            <Link title="" to={"/user-cart"} className="w-full text-sm text-center py-2 border-white border-x-2 hover:border-primary hover:text-primary transition-all duration-300">Cart</Link>
                            <Link title="" to={"/user-wishlist"} className="w-full text-sm text-center py-2 border-white border-x-2 hover:border-primary hover:text-primary transition-all duration-300">Wishlist</Link>
                            <Link title="" to={"/user-orders"} className="w-full text-sm text-center py-2 border-white border-x-2 hover:border-primary hover:text-primary transition-all duration-300">Orders</Link>
    
                          </span>
    
                        </span>
                      </div>
    
                    ) : ""
                  }
    
    
                </div>
              </div>
            )

          )
        }
      </div>
      <div className="w-full h-10 absolute -bottom-10 flex flex-col items-start justify-between px-35 font-product bg-gray-200 border-t border-gray-400 max-[1030px]:hidden" style={{zIndex : "10"}}>

        <span className="w-35 h-full absolute left-0" onMouseEnter={() => setShowCategoriesFor('')}></span>
        <span className="w-35 h-full absolute right-0" onMouseEnter={() => setShowCategoriesFor('')}></span>

        <div className="w-full h-full flex items-center justify-around flex-wrap">
          <p style={{fontSize : '1rem'}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'electronics' ? 'border-primary' : ''} flex items-center justify-center min-w-fit`} onMouseEnter={() => setShowCategoriesFor('electronics')}>Electronics</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'fashion-clothing' ? 'border-primary' : ''} flex items-center justify-center min-w-fit`} onMouseEnter={() => setShowCategoriesFor('fashion-clothing')}>Fashion & Clothing</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'beauty-care' ? 'border-primary' : ''} flex items-center justify-center min-w-fit`} onMouseEnter={() => setShowCategoriesFor('beauty-care')}>Beauty & Personal Care</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'home-kitchen' ? 'border-primary' : ''} flex items-center justify-center min-w-fit`} onMouseEnter={() => setShowCategoriesFor('home-kitchen')}>Home & Kitchen</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'health-wellness' ? 'border-primary' : ''} flex items-center justify-center min-w-fit`} onMouseEnter={() => setShowCategoriesFor('health-wellness')}>Health & Wellness</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'toys-games' ? 'border-primary' : ''} flex items-center justify-center min-w-fit max-[1250px]:hidden`} onMouseEnter={() => setShowCategoriesFor('toys-games')}>Toys & Games</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'automotive' ? 'border-primary' : ''} flex items-center justify-center min-w-fit max-[1450px]:hidden`} onMouseEnter={() => setShowCategoriesFor('automotive')}>Automotive</p>
          <p style={{fontSize : "1rem"}} className={`cursor-pointer h-full mx-2 border-b-2 transition-all duration-200 border-gray-200 ${showSubCategoriesFor === 'office' ? 'border-primary' : ''} flex items-center justify-center min-w-fit max-[1500px]:hidden`} onMouseEnter={() => setShowCategoriesFor('office')}>Office Supplies</p>
          <Link style={{fontSize : "1rem"}} onMouseEnter={() => setShowCategoriesFor('')} className=" h-full border-b-2 transition-all duration-200 border-gray-200 hover:border-primary flex items-center justify-center min-w-fit" to={`/product-categories`}>See All</Link>
        </div>

        <div className="w-full items-center justify-start relative">

          <motion.div className={`w-full absolute bg-gray-200 p-2 ${showSubCategoriesFor === '' ? 'scale-0' : ''}`} onMouseLeave={() => setShowCategoriesFor('')}>

            {
              showSubCategoriesFor === 'electronics' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Accessories & Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Accessories & Supplies</Link>
                  <Link to={'/products/Camera & Photo'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Camera & Photo</Link>
                  <Link to={'/products/Car & Vehicle Electronics'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Car & Vehicle Electronics</Link>
                  <Link to={'/products/Cell Phones & Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Cell Phones & Accessories</Link>
                  <Link to={'/products/Computer Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Computer Accessories</Link>
                  <Link to={'/products/GPS & Navigation'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">GPS & Navigation</Link>
                  <Link to={'/products/Headphones'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Headphones</Link>
                  <Link to={'/products/Home Audio'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Home Audio</Link>
                  <Link to={'/products/Office Electronics'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Office Electronics</Link>
                  <Link to={'/products/Portable Video & Audio'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Portable Video & Audio</Link>
                  <Link to={'/products/Security & Survelliance'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Security & Survelliance</Link>
                  <Link to={'/products/Television & Audio'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Television & Audio</Link>
                </div>

              ) : showSubCategoriesFor === 'fashion-clothing' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Clothes - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Clothes - Women</Link>
                  <Link to={'/products/Handbags - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Handbags - Women</Link>
                  <Link to={'/products/Shoes - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Shoes - Women</Link>
                  <Link to={'/products/Watches - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Watches - Women</Link>
                  <Link to={'/products/Accessories - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Accessories - Women</Link>
                  <Link to={'/products/Clothing - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Clothing - Men</Link>
                  <Link to={'/products/Watches - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Watches - Men</Link>
                  <Link to={'/products/Shoes - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Shoes - Men</Link>
                  <Link to={'/products/Accessories - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Accessories - Men</Link>
                  <Link to={'/products/Clothes - Children'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Clothes - Children</Link>
                  <Link to={'/products/Accessories - Children'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Accessories - Children</Link>
                  <Link to={'/products/Shoes - Children'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Shoes - Children</Link>
                </div>

              ) : showSubCategoriesFor === 'beauty-care' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Makeup'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Makeup</Link>
                  <Link to={'/products/Skin Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Skin Care</Link>
                  <Link to={'/products/Hair Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Hair Care</Link>
                  <Link to={'/products/Fragrance - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Fragrance - Men</Link>
                  <Link to={'/products/Fragrance - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Fragrance - Women</Link>
                  <Link to={'/products/Foot, Hand & Nail Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Foot, Hand & Nail Care</Link>
                  <Link to={'/products/Beauty Tools'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Beauty Tools</Link>
                  <Link to={'/products/Shave & Hair Removal'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Shave & Hair Removal</Link>
                  <Link to={'/products/Personal Care - Men'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Personal Care - Men</Link>
                  <Link to={'/products/Personal Care - Women'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Personal Care - Women</Link>
                  <Link to={'/products/Baby Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Baby Care</Link>
                  <Link to={'/products/Oral Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Oral Care</Link>
                </div>

              ) : showSubCategoriesFor === 'home-kitchen' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Kitchen & Dining'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Kitchen & Dining</Link>
                  <Link to={'/products/Bedding'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Bedding</Link>
                  <Link to={'/products/Bath'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Bath</Link>
                  <Link to={'/products/Event & Party'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Event & Party</Link>
                  <Link to={'/products/Heating, Cooling & Air Quality'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Heating, Cooling & Air Quality</Link>
                  <Link to={'/products/Irons & Steamers'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Irons & Steamers</Link>
                  <Link to={'/products/Vaccums & Floor Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Vaccums & Floor Care</Link>
                  <Link to={'/products/Storage & Organization'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Storage & Organization</Link>
                  <Link to={'/products/Cleaning Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Cleaning Supplies</Link>
                  <Link to={'/products/Kitchen Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Kitchen Accessories</Link>
                  <Link to={'/products/Cutlery'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Cutlery</Link>
                </div>

              ) : showSubCategoriesFor === 'health-wellness' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Health Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Health Care</Link>
                  <Link to={'/products/Medical Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Medical Accessories</Link>
                  <Link to={'/products/Medial Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Medial Supplies</Link>
                  <Link to={'/products/First Aid Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">First Aid Accessories</Link>
                  <Link to={'/products/Nutrition'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Nutrition</Link>
                  <Link to={'/products/Vision Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Vision Care</Link>
                  <Link to={'/products/Vitamns'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Vitamns</Link>
                  <Link to={'/products/Dietry Suppliments'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Dietry Suppliments</Link>
                  <Link to={'/products/Wellness'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Wellness</Link>
                  <Link to={'/products/Relaxation'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Relaxation</Link>
                  <Link to={'/products/Exercise Equipments'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Exercise Equipments</Link>
                </div>

              ) : showSubCategoriesFor === 'toys-games' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Action Figures & Statues'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Action Figures & Statues</Link>
                  <Link to={'/products/Arts & Crafts'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Arts & Crafts</Link>
                  <Link to={'/products/Baby & Toddler Toys'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Baby & Toddler Toys</Link>
                  <Link to={'/products/Building Toys'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Building Toys</Link>
                  <Link to={'/products/Dolls & Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Dolls & Accessories</Link>
                  <Link to={'/products/Dress Up & Pretend Play'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Dress Up & Pretend Play</Link>
                  <Link to={'/products/Kids Electronics'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Kids Electronics</Link>
                  <Link to={'/products/Games'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Games</Link>
                  <Link to={'/products/Grown-Up Toys'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Grown-Up Toys</Link>
                  <Link to={'/products/Hobbies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Hobbies</Link>
                  <Link to={'/products/Puzzles'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Puzzles</Link>
                  <Link to={'/products/Tricycles, Scooters & Wagons'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Tricycles, Scooters & Wagons</Link>
                  <Link to={'/products/Video Games'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Video Games</Link>
                  <Link to={'/products/RC Toys'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">RC Toys</Link>
                </div>

              ) : showSubCategoriesFor === 'automotive' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Car Care'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Car Care</Link>
                  <Link to={'/products/Car Electronics & Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Car Electronics & Accessories</Link>
                  <Link to={'/products/Exterior Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Exterior Accessories</Link>
                  <Link to={'/products/Interior Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Interior Accessories</Link>
                  <Link to={'/products/Lights & Lighting Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Lights & Lighting Accessories</Link>
                  <Link to={'/products/Motorcycle & Powersports'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Motorcycle & Powersports</Link>
                  <Link to={'/products/Oils & Fluids'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Oils & Fluids</Link>
                  <Link to={'/products/Paint & Paint Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Paint & Paint Supplies</Link>
                  <Link to={'/products/Performane Parts & Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Performane Parts & Accessories</Link>
                  <Link to={'/products/Replacement Parts'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Replacement Parts</Link>
                  <Link to={'/products/RV Parts & Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">RV Parts & Accessories</Link>
                  <Link to={'/products/Tires & Wheels'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Tires & Wheels</Link>
                  <Link to={'/products/Tools & Equipment'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Tools & Equipment</Link>
                </div>

              ) : showSubCategoriesFor === 'office' ? (

                <div className="w-full flex flex-col flex-wrap items-start justify-start max-h-70">
                  <Link to={'/products/Filing & Organization'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Filing & Organization</Link>
                  <Link to={'/products/General Office Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">General Office Supplies</Link>
                  <Link to={'/products/Office Equipment'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Office Equipment</Link>
                  <Link to={'/products/Presentation Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Presentation Supplies</Link>
                  <Link to={'/products/Paper Handling'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Paper Handling</Link>
                  <Link to={'/products/Name Plates'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Name Plates</Link>
                  <Link to={'/products/Shipping Supplies'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Shipping Supplies</Link>
                  <Link to={'/products/Office Instruments'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Office Instruments</Link>
                  <Link to={'/products/Impulse Sealers'} className="px-6 py-1 my-3 duration- 300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Impulse Sealers</Link>
                  <Link to={'/products/Book Accessories'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Book Accessories</Link>
                  <Link to={'/products/Office Stamps'} className="px-6 py-1 my-3 duration-300 border-l-2 transition-all border-gray-200 hover:border-primary hover:text-primary">Office Stamps</Link>
                  
                </div>

              ) : ''
            }

          </motion.div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
