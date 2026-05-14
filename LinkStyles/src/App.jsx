import { useState, useEffect, } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PageLoading from "./Components/PageLoading/PageLoading";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";

// Admin Pages
import Links from "./Components/Links/links.jsx";
import AddProduct from './Components/Links/Product/AddProduct.jsx'
// 

//
import Merchant from "./Components/Links/merchant/merchant.jsx"
//
// Users Pages
import Phones from "./Pages/Phone/Phones";
import Productlunch from "./Pages/ClothProduct/product.jsx";
import Phonedetail from "./Pages/Phone/Phonedetail.jsx";
import ProductDetails from "./Pages/ClothProduct/ProductDetails";
import Shoes from "./Pages/Shoe/shoe.jsx";
import ShoeDetails from "./Pages/Shoe/shoedetails.jsx";



import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import { Faqs } from "./Components/FAQS/Faqs";
import AboutUs from "./Pages/About.jsx"
import Checkout from "./Components/Checkout/Checkout";
import UserRegister from "./Components/UserRegister/register";
import { Login } from "./Components/UserLogin/login";
import Contact from "./Pages/contact/contact.jsx";

// Global Context Page
// Contexts
import LoginContextProvider from "./Components/UserLogin/LoginContext.jsx";
import CountryContextProvider from "./Components/Context/countryApi.jsx";
import ClothContextProvider from "./Components/Context/ClothContext";

import NotFound from "./Components/NOTFound/notFound.jsx";

import './index.css'

function App() {
  const [isLoading, setIsloading] = useState(true);

  const location = useLocation()

  // const isAdminRoute = location.pathname(`/admin`)
  // const isAdminRoute = location.pathname.includes(`/admin`)
  const isAdminRoute = location.pathname.startsWith(`/link`)
  const isMerchantRoute = location.pathname.startsWith(`/me`)


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsloading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ping = () => {
      fetch(`${URL}/`)
        .then(() => console.log("Server pinged"))
        .catch((err) => console.error("Ping failed:", err));
    };

    ping(); 
    const interval = setInterval(ping, 60000); // every 60 seconds ping to keep my site alive because of renderhost

    return () => clearInterval(interval); // cleanup on unmount
  }, []);


  return (
    <>
      {isAdminRoute ?
        <LoginContextProvider>
          <ClothContextProvider>
            <CountryContextProvider>
      
              <Routes>
                <Route path="/link/admin" element={<Links />} />
                <Route path="/link/admin/addproduct" element={<AddProduct />} />

              </Routes>
              
            </CountryContextProvider>
          </ClothContextProvider>
        </LoginContextProvider>

        : isMerchantRoute ? (

          <>

            <LoginContextProvider>
              <ClothContextProvider>
               
                <Routes>

                  <Route path="/me/dashboard" element={<Merchant/>} />
                  
                </Routes>
                
              </ClothContextProvider>
            </LoginContextProvider>

          </>

        ) : (


          <>
            <LoginContextProvider>
              <ClothContextProvider>
                <CountryContextProvider>
                  {isLoading ? (
                    <PageLoading name="Links Style" />
                  ) : (
                    <>
                      <Header />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/clothes" element={<Productlunch />} />
                        <Route path="/phones" element={<Phones />} />
                        <Route
                          path="/clothes/:productID"
                          element={<ProductDetails />}
                        />
                        <Route path="/phone/:phoneID" element={<Phonedetail />} />


                        <Route path="/shoes" element={<Shoes />} />
                        <Route path="/shoes/:productID" element={<ShoeDetails />} />
                        <Route path="/product/cart" element={<Cart />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/faqs" element={<Faqs />} />
                        <Route path="/register" element={<UserRegister />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        {/* <Route path="*" element={<Navigate to="/404" />} /> */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </>
                  )}
                  <ToastContainer
                    className="ToastContainer"
                    position="top-center" autoClose={3000} />
                </CountryContextProvider>
              </ClothContextProvider>
            </LoginContextProvider>


          </>)}



    </>
  );
}

export default App;
