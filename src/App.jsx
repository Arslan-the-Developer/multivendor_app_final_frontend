import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const HomeScreen = lazy(() => import('./Screens/HomeScreen/HomeScreen'));


function App() {

  return (
    <Router>

      <Suspense fallback={<div>Loading...</div>}>

        <Routes>

          <Route path="/" element={<HomeScreen />} />

        </Routes>

      </Suspense>
      
    </Router>
  )
}

export default App
