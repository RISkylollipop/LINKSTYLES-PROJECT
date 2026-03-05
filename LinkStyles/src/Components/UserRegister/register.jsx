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

import styles from "./register.module.css";

const bgImage = [
  { id: 1, image: LatestTrendImage1 },
  { id: 2, image: LatestTrendImage2 },
  { id: 3, image: LatestTrendImage3 },
  { id: 4, image: LatestTrendImage4 },
];

export const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    first_name: "",
    lastname: "",
    middle_name: "",
    email: "",
    phone_number: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    nearest_landmark: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("white");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const redirectDelay = 6000; // 3s delay before redirect
  const toastDelay = 3000;

  //---------------------------------------------------------
  // Fetch countries
  //---------------------------------------------------------
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch(() => toast.error("Error loading countries"));
  }, []);

  //---------------------------------------------------------
  // Fetch states
  //---------------------------------------------------------
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

  //---------------------------------------------------------
  // Profile picture preview
  //---------------------------------------------------------
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

    setMessage("Profile Picture Added");
    setMessageColor("white");
  };

  //---------------------------------------------------------
  // Submit Registration
  //---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please Add a Profile Picture");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const dataForm = new FormData();
    dataForm.append("profilePicture", file);

    Object.entries(formData).forEach(([key, value]) => {
      dataForm.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:3005/register", {
        method: "POST",
        body: dataForm,
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);

        // 409 → email already exists
        if (response.status === 409) {
          toast.error(data.message || "Email already exists");
          return;
        }

        // 500 → server/database error
        if (response.status === 500) {
          toast.error(data.message || "Server error");
          return;
        }

        toast.error("Registration failed");
        return;
      }

      //---------------------------------------------------------
      // SUCCESS
      //---------------------------------------------------------
      setLoading(false);
      setSuccess(true);

      toast.success("Registration Successful!");

      setTimeout(() => {
        window.location.href = "/login";
      }, redirectDelay);

    } catch (error) {
      setLoading(false);
      toast.error("Network error. Try again!");
    }
  };

  //---------------------------------------------------------
  // JSX
  //---------------------------------------------------------
  return (
    <main>
      {/* <ToastContainer position="top-center" autoClose={toastDelay} /> */}

      {/* BG Swiper */}
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        speed={3000}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        modules={[Autoplay]}
      >
        {bgImage.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              style={{
                backgroundImage: `url(${image.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                width: "100%",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* SHOW LOADING OR SUCCESS */}
      {loading || success ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          {loading && <img src={loadingMark} alt="Loading..." width="200" />}
          {success && (
            <>
              <img src={successMark} alt="Success!" width="250" />
              <p>Registration Successful! Redirecting...</p>
            </>
          )}
        </div>
      ) : (
        //---------------------------------------------------------
        // SHOW FORM
        //---------------------------------------------------------
        <div
          className={styles.registerContainer}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <div className={styles.cardHeader}>
            <h3>Create an account</h3>
            <h3>Enter your information to continue</h3>
          </div>

          <form className={styles.FormStyle} onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className={styles.mainPreviewImageContainer}>
              <div className={styles.previewImageContainer}>
                {preview ? <img src={preview} alt="Preview" /> : "PROFILE PICTURE"}
              </div>

              {message && <p style={{ color: messageColor }}>{message}</p>}

              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            {/* Inputs */}
            <div className={styles.textDivContainer}>
              {[
                ["Firstname:", "first_name", "text", "First Name"],
                ["Lastname:", "lastname", "text", "Last Name"],
                ["Middle Name:", "middle_name", "text", "Middle Name"],
                ["Email:", "email", "email", "Email Address"],
                ["Phone Number:", "phone_number", "tel", "Phone Number"],
                ["Password:", "password", "password", "Secure Password"],
                ["City:", "city", "text", "City"],
                ["Nearest Landmark:", "nearest_landmark", "text", "Nearest Landmark"],
                ["Delivery Home Address:", "address", "text", "Home Address"],
              ].map(([label, key, type, placeholder]) => (
                <div key={key} className={styles.inputgroup}>
                  <label className={styles.labelling}>{label}</label>
                  <input
                    type={type}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}

              {/* Country */}
              <select
                style={{ height: "40px", borderRadius: "10px", padding: "10px" }}
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* State */}
              {states.length > 0 && (
                <select
                  style={{ height: "40px", borderRadius: "10px", padding: "10px" }}
                  name="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state, idx) => (
                    <option key={idx} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              )}

              <div className={styles.buttonDivStyles}>
                <button type="submit" disabled={loading}>
                Register
              </button> 
              <p>Already have an account</p>
              <button type="submit" disabled={loading}
              onClick={() => navigate(`/login`)}
              >
                Login
              </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default UserRegister;
