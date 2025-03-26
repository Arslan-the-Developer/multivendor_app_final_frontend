import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BarLoader, PuffLoader } from "react-spinners";


const HomeScreen = lazy(() => import('./Screens/HomeScreen/HomeScreen'));
const UserRegistrationScreen = lazy(() => import('./Screens/AuthScreens/UserRegistrationScreen/UserRegistrationScreen'));
const UserOTPVerifyScreen = lazy(() => import('./Screens/AuthScreens/UserOTPVerifyScreen/UserOTPVerifyScreen'));
const UserLoginScreen = lazy(() => import('./Screens/AuthScreens/UserLoginScreen/UserLoginScreen'));


function App() {

  return (
    <Router>

      <Suspense fallback={
        <section className="w-full h-screen flex items-center justify-center">

          <PuffLoader color="#006964" />

        </section>
        }>

        <Routes>

          <Route path="/" element={<HomeScreen />} />
          
          <Route path="/user-register" element={<UserRegistrationScreen />} />
          
          <Route path="/user-otp-verify" element={<UserOTPVerifyScreen />} />
          
          <Route path="/user-login" element={<UserLoginScreen />} />

        </Routes>

      </Suspense>
      
    </Router>
  )
}

export default App
