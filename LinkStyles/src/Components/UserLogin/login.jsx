/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

import LatestTrendImage1 from "../LatestTrend/LatestTrendImages/trend1.png";
import LatestTrendImage2 from "../LatestTrend/LatestTrendImages/trend2.png";
import LatestTrendImage3 from "../LatestTrend/LatestTrendImages/trend3.png";
import LatestTrendImage4 from "../LatestTrend/LatestTrendImages/trend4.png";

const bgImage = [
  { id: 1, image: LatestTrendImage1 },
  { id: 2, image: LatestTrendImage2 },
  { id: 3, image: LatestTrendImage3 },
  { id: 4, image: LatestTrendImage4 },
];

  


// 3. Login Component
export function Login() {

const { user, setUser, mainData, setMainData, productlenght,
    setProductlenght, merchantData, setMerchantData } = useContext(LoginContext);
    const navigate = useNavigate();
  
  const BASE_URL = import.meta.env.VITE_APP_URL;
  


  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${BASE_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        data.status = res.status;
        return data;
      })
      .then((data) => {
        setLoading(false);
        const messages = data.messages

        if (data.status === 200 && data.token) {
          setUser(data.MainData);
          setMainData(data.MainData);
          localStorage.setItem("token", data.token);
          localStorage.setItem("data", JSON.stringify(data.MainData));

          
          
          if (data.message === "Admin Login successfully") {
            localStorage.setItem("productlength", data.productLenght)
            toast.success(data.Admingreeting)

            setTimeout(() => {
              navigate("/link/admin");
              setProductlenght(localStorage.getItem("productlength"));
            }, 5000);
          } 
          else if(data.message && data.message.toLowerCase().includes('merchant')  && data.role === 'merchant'){
            localStorage.setItem('merchantProduct', JSON.stringify(data.merchantProduct))
            localStorage.setItem('merchantname' , data.merchantName)
            localStorage.setItem('medata', JSON.stringify(data.merchantData))  
            toast.success(data.message)
                  setTimeout(() => {
                navigate('/me/dashboard')
                
              }, 5000);
          }
          
          else {
            toast.success(data.message);
            setTimeout(() => navigate("/clothes"), 3500);
          }
        } else if (data.status === 404) {
          toast.info(data.message || "Email not found, please register first.");
          setTimeout(() => navigate("/register"), 2500);
        } else if (data.status === 401) {
          toast.error(data.message || "Incorrect password.");
        } else if (data.status === 429) {
          toast.error(`${data.statusmsg?.toUpperCase()}!!! ${data.msg}, Remaining attempts: ${data.remainingAttempt}`);
        } else {
          toast.warn("Something went wrong. Please try again.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error:", err);
        toast.error("Server error, please try again later.");
      });
  };

  
  return (
    <main className={styles.pageRoot}>
      <ToastContainer theme="dark" position="top-center" />

      {/* Left — Swiper Panel */}
      <div className={styles.leftPanel}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          speed={1500}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className={styles.swiperFull}
        >
          {bgImage.map((image) => (
            <SwiperSlide key={image.id}>
              <div
                className={styles.slideImage}
                style={{ backgroundImage: `url(${image.image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.leftOverlay}>
          <div className={styles.brandMark}>
            <div className={styles.brandLine} />
            <span>LINKSTYLES</span>
            <div className={styles.brandLine} />
          </div>
          <h1 className={styles.heroText}>
            Welcome<br />
            <em>Back</em>
          </h1>
          <p className={styles.heroSub}>
            Sign in to continue your fashion journey with us.
          </p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formInner}>

          <div className={styles.formHeader}>
            <div className={styles.formLogo}>
              LINK<span>STYLES</span>
            </div>
            <h2>Sign In</h2>
            <p>Enter your details to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.fieldGroup}>
              <label>First Name</label>
              <input
                type="text"
                placeholder="Your first name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.fieldGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Signing In..." : "Sign In →"}
            </button>

            <p className={styles.registerPrompt}>
              Don't have an account?{" "}
              <span onClick={() => navigate("/register")}>Create one</span>
            </p>

          </form>
        </div>
      </div>
    </main>
  );
}