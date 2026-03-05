import { useContext, useState, useEffect } from "react";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { useNavigate } from "react-router-dom";

import { LoginContext } from "../../Components/UserLogin/LoginContext";
import { ClothContext } from "../../Components/Context/ClothContext";

import StarRating from "../../Components/Context/StarRating";

import styles from "./Phone.module.css";
import image1 from "./images/image1.png";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Phones() {
  const { user, setUser, mainData, setMaindata } = useContext(LoginContext);
  const { addToCart, symbol } = useContext(ClothContext);
  const [phones, setPhones] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3005/api/v1/phones")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPhones(data);
        } else {
          console.log("Invalid Data Format", data);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.headings}>Phones & Tablets</h2>
        <h3 className={styles.callToOrder}>CALL TO ORDER 07000000000</h3>

        {/* HEADER SECTION */}
        <header className={styles.header}>
          <div className={styles.headerSection}>
            <h3 style={{ cursor: "pointer" }} className={styles.logo}>
              Link Styles
            </h3>
            <h1>Brand Festival</h1>
            <h3 className={styles.festiveTime}>1ST - 14th NOV</h3>
          </div>

          <div className={styles.headerSection}>
            <h1 style={{ fontSize: "30px" }}>Phone Deal</h1>
            <h3 style={{ fontSize: "35px" }}>
              <small style={{ fontSize: "10px" }}>UP TO</small>&nbsp;10% OFF
            </h3>
            <h3 style={{ fontSize: "20px" }}>Correct phones for you</h3>
          </div>

          <div className={styles.headerSection}>
            <img src={image1} alt="advert image" />
          </div>
        </header>

        <h1>Limited Stock Available</h1>

        {phones && phones.length > 0 ? (
          <div className={styles.cardContainers}>
            {phones.map((phone) => {
              // BUILD IMAGE ARRAY
              const phoneImages = [];
              if (phone.image1) phoneImages.push(phone.image1);
              if (phone.image2) phoneImages.push(phone.image2);
              if (phone.image3) phoneImages.push(phone.image3);

              // PRICE CALC LOGIC
              const newPrice = Number(phone.price);
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

              originalPrice = originalPrice.toFixed(2);

              const discount = Number(originalPrice - newPrice).toFixed(2);
              const Pdiscount = Number((discount / originalPrice) * 100).toFixed(0);
              const PdiscountPercent = `-${Pdiscount}%`;

              return (
                <div key={phone.product_id} className={styles.cards}>
                  <div className={styles.cardBody}>
                    <span className={styles.discount}>{PdiscountPercent}</span>

                    {/* 🔥 SWIPER SLIDER HERE */}
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      // navigation = {{clickable : true}}
                      // pagination={{ clickable: true }}
                      autoplay={{ delay: 2500 }}
                      loop={true}
                      className={styles.slider}
                    >
                      {phoneImages.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img
                            onClick={() =>
                              navigate(`/phone/${phone.product_id}`)
                            }
                            src={img}
                            alt={phone.productName}
                            className={styles.cardImage}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <h3>{phone.productName}</h3>

                    <div className={styles.priceSection}>
                      <span className={styles.price}>
                        {symbol || "₦"}
                        {phone.price}
                      </span>
                      <br />
                      <span className={styles.oldPrice}>
                        {symbol || "₦"}
                        {originalPrice}
                      </span>
                    </div>

                    <StarRating rating={phone.rating} />

                    <div className={styles.btnGroup}>
                      <button
                        onClick={() =>
                          navigate(`/phone/${phone.product_id}`)
                        }
                        className={styles.detailbtn}
                      >
                        View More
                      </button>

                      <button
                        onClick={() => addToCart(phone)}
                        className={styles.addtocartbtn}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <PageLoading name="Phone and Tablets" />
        )}
      </main>
    </>
  );
}

export default Phones;
