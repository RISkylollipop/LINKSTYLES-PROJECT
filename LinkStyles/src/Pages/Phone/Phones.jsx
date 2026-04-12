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

  const URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    fetch(`${URL}/api/v1/phones`)
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

  const handlescroll = () => {
    if (window.scrollY > 300) {
      window.scrollTo({
        top: 50,
        behavior: "auto"
      })
    }
  }
  return (
    <>
      <main className={styles.main}>
        <h2 className={styles.headings}>Phones & Tablets</h2>
        <h3 className={styles.callToOrder}>CALL TO ORDER 08140470626</h3>

        {/* HEADER SECTION */}
        <header className={styles.header}>
          {/* Left */}
          <div className={styles.headerSection}>
            <span className={styles.logo}>Link Styles</span>
            <div className={styles.festivalBadge}>
              <span className={styles.festivalLabel}>Brand Festival</span>
            </div>
            <div className={styles.datePill}>1ST — 14TH NOV</div>
          </div>

          {/* Center */}
          <div className={`${styles.headerSection} ${styles.centerSection}`}>
            <p className={styles.dealTag}>🔥 Limited Time</p>
            <h1 className={styles.dealTitle}>PHONE<br />DEAL</h1>
            <div className={styles.discountRow}>
              <span className={styles.upTo}>UP TO</span>
              <span className={styles.percent}>10%</span>
              <span className={styles.off}>OFF</span>
            </div>
            <p className={styles.dealSub}>Correct phones for you</p>
          </div>

          {/* Right */}
          <div className={`${styles.headerSection} ${styles.imageSection}`}>
            <img src={image1} alt="advert image" className={styles.bannerImg} />
          </div>
        </header>

        <h1 style={{fontFamily: "c"}}>Limited Stock Available</h1>

        {phones && phones.length > 0 ? (
          <div className={styles.cardContainers}>
            {phones.map((phone) => {
              // BUILD IMAGE ARRAY FIRst to make Slide Easy
              const phoneImages = [phone?.image1, phone?.image2 , phone?.image3];
              if (phoneImages > 1 && phoneImages <= 3){
                phoneImages.push(...phoneImages)
              }

              let starRating = phone?.rating
              // PRICE CALC LOGIC
              const newPrice = Number(phone?.price);
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

                    
                    {/* <Swiper
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
                            onClick={() => {

                              navigate(`/phone/${phone.product_id}`),
                                handlescroll()
                            }

                            }
                            src={img}
                            alt={phone.productName}
                            className={styles.cardImage}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper> */}

                    <img
                            onClick={() => {

                              navigate(`/phone/${phone.product_id}`),
                                handlescroll()
                            }

                            }
                            src={phone.image2}
                            alt={phone.productName}
                            className={styles.cardImage}
                          />

                    <h3>{phone.productName}</h3>

                    <div className={styles.priceSection}>
                      <span className={styles.price}>
                        {symbol || "₦"}
                        {new Intl.NumberFormat("en-US").format(newPrice)}
                        
                      </span>
                      <br />
                      <span className={styles.oldPrice}>
                        {symbol || "₦"}
                        {new Intl.NumberFormat("en-US").format(originalPrice)}
                      </span>
                    </div>
                    <StarRating rating={starRating} />

                    <div className={styles.btnGroup}>
                      <button
                        onClick={() => {

                          navigate(`/phone/${phone.product_id}`),
                            handlescroll()
                        }
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
