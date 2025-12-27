// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import { LoginContext } from "../../Components/UserLogin/LoginContext";
import { ClothContext } from "../../Components/Context/ClothContext";
import { CountryContext } from "../../Components/Context/countryApi";
import StarRating from "../../Components/Context/StarRating";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import styles from "./PhoneDetail.module.css";

function Phonedetail() {
  const { mainData } = useContext(LoginContext);
  const { addToCart, symbol } = useContext(ClothContext);
  const { handleCountryChange, countries, states, formData, setFormData } =
    useContext(CountryContext);

  const { phoneID } = useParams();
  const [phonedata, setPhonedata] = useState(null);

  const URL = `http://localhost:3005`;

  useEffect(() => {
    let isMounted = true;

    fetch(`${URL}/phone/${phoneID}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setPhonedata(data[0]);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, [phoneID]);

  if (!phonedata) {
    return <PageLoading name="Loading Phone Details..." />;
  }

  // IMAGES
  const phoneimages = [];
  if (phonedata.image1) phoneimages.push(phonedata.image1);
  if (phonedata.image2) phoneimages.push(phonedata.image2);
  if (phonedata.image3) phoneimages.push(phonedata.image3);

  // PRICE CALC
  const newPrice = Number(phonedata.price);
  let originalPrice;

  if (newPrice < 1600000) {
    originalPrice = newPrice * 1.2;
  } else if (newPrice <= 1800000) {
    originalPrice = newPrice * 1.17;
  } else if (newPrice <= 1900000) {
    originalPrice = newPrice * 1.15;
  } else {
    originalPrice = newPrice * 1.1;
  }

  originalPrice = Number(originalPrice.toFixed(2));
  const discount = (originalPrice - newPrice).toFixed(2);
  const Pdiscount = ((discount / originalPrice) * 100).toFixed(0);
  const PdiscountPercent = `-${Pdiscount}%`;


  /* Delivery date specification */
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();
  const currentMonth = now.toLocaleString("default", { month: "long" })
  const weekDay = now.toLocaleString("default", { weekday: "long" })
  const newDate = new Date(now);
  newDate.setDate(now.getDate() + 4);
  const forDaysLater = newDate.toLocaleString("default", {weekday: 'long'})

  return (
    <>
      <main className={styles.container}>
        {/* IMAGE SECTION */}
        <div className={styles.imageSection}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation
            modules={[Navigation, Autoplay]}
          >
            {phoneimages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img src={img} alt={phonedata.productName} />
              </SwiperSlide>
            ))}
          </Swiper>

          <p className={styles.discountBadge}>{PdiscountPercent}</p>
        </div>

        {/* DETAILS SECTION */}
        <div className={styles.detailsSection}>
          <div className={styles.detailsubsection}>
            <h2 className={styles.title}>
              {phonedata.productName}
              {/* {phonedata.display}
              {phonedata.connectivity} - {phonedata.color} */}
            </h2>
            <hr />

            <div className={styles.priceBox}>
              <span className={styles.newPrice}>
                {symbol} {newPrice.toLocaleString()}
              </span>
              <span className={styles.oldPrice}>
                {symbol}
                {originalPrice.toLocaleString()}
              </span>
              <span className={styles.discountText}>{PdiscountPercent}</span>
            </div>

            <small>⚠️ {phonedata.stock} Unit left</small>
          </div>

          <StarRating rating={4.5} />
          <hr />

          <button
            onClick={() => addToCart(phonedata)}
            className={styles.addToCartBtn}
          >
            Add to Cart
          </button>

          <div className={styles.promoCard}>
            <h3>Promotion</h3>
            <p>
              <FaStar color="gold" /> Call <strong>07070000000</strong> to
              place order
            </p>
            <p>
              <FaStar color="gold" /> Enjoy cheaper shipping fees at{" "}
              <strong>PickUp Station</strong>
            </p>
          </div>
        </div>

        {/* DELIVERY SECTION */}
        <div className={styles.deliverySection}>
          {mainData ? (
            <div className={styles.deliveryCard}>
              <p>
                <strong>Full Name:</strong>
                <br />
                <input
                  type="text"
                  value={formData.full_name || mainData.full_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </p>

              <p>
                <strong>Email:</strong>
                <br />
                <input
                  type="email"
                  value={formData.email || mainData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </p>

              {/* COUNTRY SELECT */}
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
              >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* STATES SELECT */}
              {states.length > 0 && (
                <select
                  name="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                >
                  <option value="">Select State / Region</option>
                  {states.map((state, idx) => (
                    <option key={idx} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              )}

              {/* DELIVERY CARDS */}
              <div className="card" style={{ marginTop: 10 }}>
                <small>
                  Pickup Station — ₦950 <br /> Ready between 20–21 October
                </small>
              </div>

              <div className="card" style={{ marginTop: 10 }}>
                <small>
                  Door Delivery — ₦1,710 <br /> Delivery between 
                  <br />
                  {weekDay} {currentDay} – {currentDay + 4} {forDaysLater} {currentMonth} {currentYear}
                </small>
              </div>

              <div className="card" style={{ marginTop: 10 }}>
                <small>Return Policy — Free return within 7 days</small>
              </div>

              <p style={{ color: "palevioletred" }}>
                Update your delivery address below:
              </p>

              <button>Update Delivery Address</button>
            </div>
          ) : (
            <p>User details not available</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Phonedetail;
