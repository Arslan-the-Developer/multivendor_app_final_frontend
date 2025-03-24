import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const HomeScreen = lazy(() => import('./Screens/HomeScreen/HomeScreen'));
const UserRegistrationScreen = lazy(() => import('./Screens/AuthScreens/UserRegistrationScreen/UserRegistrationScreen'));
const UserOTPVerifyScreen = lazy(() => import('./Screens/AuthScreens/UserOTPVerifyScreen/UserOTPVerifyScreen'));
const UserLoginScreen = lazy(() => import('./Screens/AuthScreens/UserLoginScreen/UserLoginScreen'));


function App() {

  return (
    <Router>

      <Suspense fallback={<div>Loading...</div>}>

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
