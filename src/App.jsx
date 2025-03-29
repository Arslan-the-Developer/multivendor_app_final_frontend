import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BarLoader, PuffLoader } from "react-spinners";



// Auth Screens
const UserRegistrationScreen = lazy(() => import('./Screens/AuthScreens/UserRegistrationScreen/UserRegistrationScreen'));
const UserOTPVerifyScreen = lazy(() => import('./Screens/AuthScreens/UserOTPVerifyScreen/UserOTPVerifyScreen'));
const UserLoginScreen = lazy(() => import('./Screens/AuthScreens/UserLoginScreen/UserLoginScreen'));
const GoogleRegistrationRedirect = lazy(() => import('./Screens/AuthScreens/GoogleRegistrationRedirect/GoogleRegistrationRedirect'));
const SellerRegistrationScreen = lazy(() => import('./Screens/AuthScreens/SellerRegistrationScreen/SellerRegistrationScreen'));
const SellerStatusScreen = lazy(() => import('./Screens/AuthScreens/SellerStatusScreen/SellerStatusScreen'));
const AddStoreBasicDetailsScreen = lazy(() => import('./Screens/AuthScreens/AddStoreBasicDetailsScreen/AddStoreBasicDetailsScreen'));
const AddStoreIDInfoScreen = lazy(() => import('./Screens/AuthScreens/AddStoreIDInfoScreen/AddStoreIDInfoScreen'));
const AdminHomeScreen = lazy(() => import('./Screens/AuthScreens/AdminPanel/AdminHomeScreen/AdminHomeScreen'));


// Basic Site Screens
const HomeScreen = lazy(() => import('./Screens/HomeScreen/HomeScreen'));
const CategoryProductsScreen = lazy(() => import('./Screens/CategoryProductsScreen/CategoryProductsScreen'));
const UserOrdersScreen = lazy(() => import('./Screens/UserOrdersScreen/UserOrdersScreen'));
const OrderDetailsScreen = lazy(() => import('./Screens/OrderDetailsScreen/OrderDetailsScreen'));
const ProductDetailsScreen = lazy(() => import('./Screens/ProductDetailsScreen/ProductDetailsScreen'));
const PaymentScreen = lazy(() => import('./Screens/PaymentScreen/PaymentScreen'));
const PaymentSuccessScreen = lazy(() => import('./Screens/PaymentScreen/PaymentSuccessScreen'));
const UserCartScreen = lazy(() => import('./Screens/UserCartScreen/UserCartScreen'));
const UserProfileScreen = lazy(() => import('./Screens/UserProfileScreen/UserProfileScreen'));
const ManageUserShippingAddressScreen = lazy(() => import('./Screens/UserProfileScreen/ManageUserShippingAddressScreen'));
const UserSearchScreen = lazy(() => import('./Screens/UserSearchScreen/UserSearchScreen'));
const UserWishlistScreen = lazy(() => import('./Screens/UserWishlistScreen/UserWishlistScreen'));


// Seller Screen
const SellerHomeScreen = lazy(() => import('./Screens/SellerScreens/SellerHomeScreen'));



function App() {

  return (
    <Router>

      <Suspense fallback={
        <section className="w-full h-screen flex items-center justify-center">

          <PuffLoader color="#006964" />

        </section>
        }>

        <Routes>

          {/* Basic Site Screens */}

          <Route path="/" element={<HomeScreen />} />

          <Route path='/user-profile' element={<UserProfileScreen />}/>

          <Route path='/user-cart' element={<UserCartScreen />}/>

          <Route path='/user-orders' element={<UserOrdersScreen />}/>

          <Route path='/user-wishlist' element={<UserWishlistScreen />}/>

          <Route path='/products/:productSubCategory' element={<CategoryProductsScreen />}/>

          <Route path='/product-details/:productID' element={<ProductDetailsScreen />}/>

          <Route path='/order/:orderID/payment' element={<PaymentScreen />}/>

          <Route path='/order/:orderID/payment-success' element={<PaymentSuccessScreen />}/>

          <Route path='/order/order-details/:orderID' element={<OrderDetailsScreen />}/>

          <Route path='/user-search/:keyword' element={<UserSearchScreen />}/>

          <Route path='/user-profile/manage-shipping-addresses' element={<ManageUserShippingAddressScreen />}/>


          {/* Auth Screens */}
          
          <Route path="/user-register" element={<UserRegistrationScreen />} />
          
          <Route path="/user-login" element={<UserLoginScreen />} />
          
          <Route path="/user-otp-verify" element={<UserOTPVerifyScreen />} />

          <Route path='/auth/google-registration-callback' element={<GoogleRegistrationRedirect />}/>


          {/* Seller Screens */}

          <Route path='/seller-registration' element={<SellerRegistrationScreen />}/>

          <Route path='/store-basic-details' element={<AddStoreBasicDetailsScreen />}/>
          
          <Route path='/store-id-details' element={<AddStoreIDInfoScreen />}/>
          
          <Route path='/seller-status' element={<SellerStatusScreen />}/>
          
          <Route path='/seller-dashboard' element={<SellerHomeScreen />}/>


          {/* Admin Site URL */}

          <Route path="/site-management" element={<AdminHomeScreen />} />


        </Routes>

      </Suspense>
      
    </Router>
  )
}

export default App
