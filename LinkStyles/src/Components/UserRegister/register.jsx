import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import LatestTrendImage1 from "../LatestTrend/LatestTrendImages/trend1.png";
import LatestTrendImage2 from "../LatestTrend/LatestTrendImages/trend2.png";
import LatestTrendImage3 from "../LatestTrend/LatestTrendImages/trend3.png";
import LatestTrendImage4 from "../LatestTrend/LatestTrendImages/trend4.png";
import backgroundImage from "../LatestTrend/LatestTrendImages/trend5.png";

import loadingMark from "./gifs/loadingmark.gif";
import successMark from "./gifs/successmark.gif";

import RegisterFooter from './registerfooter'
import styles from "./register.module.css";

const bgImage = [
  { id: 1, image: LatestTrendImage1 },
  { id: 2, image: LatestTrendImage2 },
  { id: 3, image: LatestTrendImage3 },
  { id: 4, image: LatestTrendImage4 },
];

export const UserRegister = () => {
  const BASE_URL = import.meta.env.VITE_APP_URL;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    lastname: "",
    middle_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmpassword: "",
    functions: "",
    address: "",
    city: "",
    state: "",
    country: "",
    nearest_landmark: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const redirectDelay = 6000;

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch(() => toast.error("Error loading countries"));
  }, []);

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setFormData({ ...formData, country: selected, state: "" });
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selected }),
    })
      .then((res) => res.json())
      .then((data) => setStates(data.data.states || []))
      .catch(() => toast.error("Error loading states"));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      setMessage("Please add a profile picture");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
    setMessage("Profile picture added ✓");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please add a profile picture");
      return;
    }
    setLoading(true);
    setSuccess(false);

    const dataForm = new FormData();
    dataForm.append("profilePicture", file);
    Object.entries(formData).forEach(([key, value]) => dataForm.append(key, value));

    try {
      const response = await fetch(`${BASE_URL}/api/v1//register`, {
        method: "POST",
        body: dataForm,
      });
      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        if (response.status === 409) return toast.error(data.message || "Email already exists");
        if (response.status === 500) return toast.error(data.message || "Server error");
        return toast.error("Registration failed");
      }

      setLoading(false);
      setSuccess(true);
      toast.success("Registration Successful!");
      setTimeout(() => { window.location.href = "/login"; }, redirectDelay);
    } catch {
      setLoading(false);
      toast.error("Network error. Try again!");
    }
  };

  if (loading || success) {
    return (
      <div className={styles.statusScreen}>
        <div className={styles.statusLogo}>LINK<span>STYLES</span></div>
        {loading && (
          <div className={styles.statusContent}>
            <img src={loadingMark} alt="Loading..." width="120" />
            <p>Creating your account...</p>
          </div>
        )}
        {success && (
          <div className={styles.statusContent}>
            <img src={successMark} alt="Success!" width="140" />
            <h2>Welcome to Linkstyles</h2>
            <p>Redirecting you to login...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <main className={styles.pageRoot}>
        <ToastContainer theme="dark" position="top-right" />

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
              Dress Like<br />
              <em>You Mean It</em>
            </h1>
            <p className={styles.heroSub}>Join thousands of Nigerians shopping the latest fashion trends.</p>
          </div>
        </div>

        {/* Right — Form Panel */}
        <div className={styles.rightPanel}>
          <div className={styles.formInner}>

            <div className={styles.formHeader}>
              <div className={styles.formLogo}>LINK<span>STYLES</span></div>
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {/* Avatar Upload */}
            <div className={styles.avatarSection}>
              <label className={styles.avatarLabel} htmlFor="avatarInput">
                <div className={styles.avatarRing}>
                  {preview
                    ? <img src={preview} alt="Preview" className={styles.avatarImg} />
                    : <div className={styles.avatarPlaceholder}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>Add Photo</span>
                    </div>
                  }
                </div>
              </label>
              <input id="avatarInput" type="file" accept="image/*" onChange={handleFileChange} className={styles.hiddenInput} />
              {message && <p className={styles.avatarMessage}>{message}</p>}
            </div>

            <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">


              {/* Name Row */}
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>First Name</label>

                  <input type="text" placeholder="First Name" value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label>Last Name</label>
                  <input type="text" placeholder="Surname" value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} required />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label>Middle Name</label>
                <input type="text" placeholder="Optional" value={formData.middle_name}
                  onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })} />
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>Email Address</label>

                  <input type="email" placeholder="you@email.com" value={formData.email}

                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label>Phone Number</label>
                  <input type="tel" placeholder="080123456789" value={formData.phone_number}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} required />
                </div>


              </div>
              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>Password</label>
                  <input type="password"
                    placeholder="Password"
                    value={formData.password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, password: value });
                      if (!value) {
                        setError("Please input password")
                      } else {
                        setError("")
                      }
                    }} 
                    style={{
                      outline: error?.toLowerCase().includes("not") ? "1px solid red" : ""
                    }}
                    required />
                </div>
                <div className={styles.fieldGroup}>
                  <label>Confirm Password</label>
                  <input type="password"
                    placeholder="Confirm password"
                    value={formData.confirmpassword}
                    autoComplete="new-password"
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, confirmpassword: value });
                      if (formData.password !== value) {
                        setError("Password Not Match!!!")
                      } else {
                        setError("Password Match")
                      }
                    }}
                    style={{
                      outline: error?.toLowerCase().includes("not") ? "2px solid red" : ""
                    }}
                    required />
                </div>
                <small style={{ textAlign: "center", color: error?.toLowerCase().includes("not") ? "red " : "green" }}>{error}</small>

              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>Select Category</label>
                  <select
                    value={formData.functions}
                    onChange={(e) => setFormData({ ...formData, functions: e.target.value })}

                    required
                  >
                    <option value="">Select Category</option>
                    <option value="user">User</option>
                    <option value="merchant">Merchant</option>
                  </select>
                </div>
              </div>


              <div className={styles.divider}><span>Delivery Information</span></div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>Country</label>
                  <select value={formData.country} onChange={handleCountryChange} required>
                    <option value="">Select Country</option>
                    {countries.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                {states.length > 0 && (
                  <div className={styles.fieldGroup}>
                    <label>State</label>
                    <select value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })} required>
                      <option value="">Select State</option>
                      {states.map((s, i) => <option key={i} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className={styles.row}>
                <div className={styles.fieldGroup}>
                  <label>City</label>
                  <input type="text" placeholder="Your city" value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />
                </div>
                <div className={styles.fieldGroup}>
                  <label>Nearest Landmark</label>
                  <input type="text" placeholder="e.g. Near GTBank" value={formData.nearest_landmark}
                    onChange={(e) => setFormData({ ...formData, nearest_landmark: e.target.value })} required />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label>Delivery Address</label>
                <input type="text" placeholder="Full home address" value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? "Creating Account..." : "Create My Account →"}
              </button>

              <p className={styles.loginPrompt}>
                Already have an account?{" "}
                <span onClick={() => navigate("/login")}>Sign In</span>
              </p>

            </form>
          </div>

        </div>
      </main>
      <RegisterFooter />

    </>
  );
};

export default UserRegister;