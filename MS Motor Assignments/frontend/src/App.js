import { ToastContainer } from 'react-toastify';
import {
  Routes,
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
const ProductLandingPage = lazy(() => import('./Components/LandingPage/ProductLandingPage'));
const RegisterForm = lazy(() => import('./Components/Admin/RegisterForm'));
const LoginForm = lazy(() => import('./Components/Admin/LoginForm'));
const AdminBoardTable = lazy(() => import('./Components/Admin/AdminBoardTable'));
const Navbar = lazy(() => import('./Components/Navbar'));
const ProductCardCars = lazy(() => import('./Components/Products/ProductCardCars'));
const ProductDescription = lazy(() => import('./Components/Products/ProductDescription'));

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductLandingPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/product-cars" element={<ProductCardCars />} />
            <Route path="/admin-page" element={<AdminBoardTable />} />
            <Route path="/cars/:carproduct" element={<ProductDescription />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
