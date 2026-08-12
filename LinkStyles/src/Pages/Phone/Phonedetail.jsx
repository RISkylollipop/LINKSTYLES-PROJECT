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
  const [showdetail, setShowdetail] = useState(false);

  const URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    let isMounted = true;

    const fetchPhone = async () => {
      try {
        const res = await fetch(`${URL}/api/v1/phone/${phoneID}`);
        const data = await res.json();
        if (isMounted) {
          setPhonedata(data[0]);
        }
      } catch (error) {
        console.error(`Unable to Fetch Phone Datails`);
      }
    };

    fetchPhone();

    return () => {
      isMounted = false;
    };
  }, [phoneID]);

  if (!phonedata) {
    return <PageLoading name="Loading Phone Details..." />;
  }

  // IMAGES
  const phoneimages = [phonedata?.image1, phonedata?.image2, phonedata?.image3];
  if (phoneimages.length > 1 && phoneimages.length < 3) {
    phoneimages.push(...phoneimages);
  }

  // PRICE CALC
  const newPrice = Number(phonedata?.price);
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

  // /* Delivery date specification */
  // const now = new Date();
  // const currentYear = now.getFullYear();
  // const currentDay = now.getDate();
  // const currentMonth = now.toLocaleString("default", { month: "long" })
  // const weekDay = now.toLocaleString("default", { weekday: "long" })
  // const newDate = new Date(now);
  // newDate.setDate(now.getDate() + 4);
  // const forDaysLater = newDate.toLocaleString("default", { weekday: 'long' })

  return (
    <>
      <main className={styles.container}>
        <div className={styles.productDetailSections}>
          {/* IMAGE SECTION */}
          <div className={styles.imageSection}>
            <Swiper
              spaceBetween={5}
              slidesPerView={1}
              slidesPerGroup={1}
              autoplay={{ delay: 2000 }}
              loop={phoneimages.length > 1}
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
                  {symbol} {new Intl.NumberFormat("en-Us").format(newPrice)}
                </span>
                <span className={styles.oldPrice}>
                  {symbol}
                  {new Intl.NumberFormat("en-Us").format(originalPrice)}
                </span>
                <span className={styles.discountText}>{PdiscountPercent}</span>
              </div>

              <small
                style={
                  phonedata?.stock < 15 ? { color: "red" } : { color: "green" }
                }
              >
                ⚠️ {phonedata.stock} Unit left
              </small>
            </div>

            <StarRating rating={phonedata.rating} />
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
                <FaStar color="gold" /> Call <strong>08140470626</strong> to
                place order
              </p>
              <p>
                <FaStar color="gold" /> Enjoy cheaper shipping fees at{" "}
                <strong>PickUp Station</strong>
              </p>
            </div>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION SECTION*/}
        {phonedata?.description && (
          <div className={styles.descriptionBox}>
            <h4 className={styles.descriptionTitle}>Product Description</h4>

            <p className={styles.descriptionText}>
              {showdetail || phonedata.description.length <= 100
                ? phonedata.description
                : `${phonedata.description.slice(0, 100)}...`}
            </p>

            {phonedata.description.length > 100 && (
              <small
                onClick={() => setShowdetail(!showdetail)}
                style={{ color: "black", cursor: "pointer" }}
              >
                {showdetail ? "Show less" : "Show more"}
              </small>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Phonedetail;
