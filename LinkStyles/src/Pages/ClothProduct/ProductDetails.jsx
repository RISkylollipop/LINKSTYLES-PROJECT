import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import StarRating from "../../Components/Context/StarRating";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import PageLoading from "../../Components/PageLoading/PageLoading";
import { LoginContext } from "../../Components/UserLogin/LoginContext";
import { ClothContext } from "../../Components/Context/ClothContext";
import { CountryContext } from "../../Components/Context/countryApi";

import styles from "./css/ProductDetails.module.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

function CustomerSearch({ relatedProducts, symbol }) {
  const URL = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();

  const handlescroll = () => {
    if (window.scrollY > 300) {
      window.scrollTo({
        top: 50,
        behavior: "auto",
      });
    }

    return;
  };
  return (
    <div style={{ background: "#f1f1f1" }}>
      <div className={styles.searchAlso}>
        <h2>Customers Also Search</h2>
      </div>
      <div>
        <Swiper
          spaceBetween={5}
          slidesPerGroup={1}
          loop={relatedProducts.length > 1}
          autoplay={{ delay: 3000 }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            300: { slidesPerView: 1 },
            650: { slidesPerView: 2 },
            800: { slidesPerView: 3 },
          }}
        >
          <div className={styles.cardContainer}>
            {relatedProducts.length > 0 ? (
              relatedProducts.map((related) => (
                <SwiperSlide
                  style={{ background: "#f1f1f1" }}
                  key={related.product_id}
                >
                  <div
                    className={styles.card}
                    onClick={() => {
                      (navigate(`/clothes/${related.product_id}`),
                        handlescroll());
                    }}
                  >
                    <img src={related.image1} alt={related.productName} />
                    <h3>{related.productName}</h3>
                    <p>
                      Price: {symbol}{" "}
                      {new Intl.NumberFormat("en-Us").format(related.price)}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                <PageLoading name="Product Loading" />
              </div>
            )}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

// function DeliverySection({ mainData }) {
//   const { handleCountryChange, countries, states, formData, setFormData } =
//     useContext(CountryContext);

//   /* Delivery date specification */
//   const now = new Date();
//   const currentYear = now.getFullYear();
//   const currentDay = now.getDate();
//   const currentMonth = now.toLocaleString("default", { month: "long" });
//   const weekDay = now.toLocaleString("default", { weekday: "long" });
//   const newDate = new Date(now);
//   newDate.setDate(now.getDate() + 4);
//   const forDaysLater = newDate.toLocaleString("default", { weekday: "long" });
//   const today = new Date();

//   /* ---------------- PICKUP (4 days) ---------------- */
//   const pickupStart = new Date(today);
//   const pickupEnd = new Date(today);
//   pickupEnd.setDate(today.getDate() + 4);

//   /* ---------------- DOOR DELIVERY (10 days) ---------------- */
//   const deliveryStart = new Date(today);
//   const deliveryEnd = new Date(today);
//   deliveryEnd.setDate(today.getDate() + 10);

//   /* ---------------- FORMATTERS ---------------- */
//   const format = (date, option) => date.toLocaleString("default", option);

//   /* Pickup display */
//   const pickup = {
//     startDay: pickupStart.getDate(),
//     startWeekday: format(pickupStart, { weekday: "long" }),
//     endDay: pickupEnd.getDate(),
//     endWeekday: format(pickupEnd, { weekday: "long" }),
//     endMonth: format(pickupEnd, { month: "long" }),
//     endYear: pickupEnd.getFullYear(),
//   };

//   /* Delivery display */
//   const delivery = {
//     startDay: deliveryStart.getDate(),
//     startWeekday: format(deliveryStart, { weekday: "long" }),
//     endDay: deliveryEnd.getDate(),
//     endWeekday: format(deliveryEnd, { weekday: "long" }),
//     endMonth: format(deliveryEnd, { month: "long" }),
//     endYear: deliveryEnd.getFullYear(),
//   };

//   const fullName = `${mainData.first_name} ${mainData.lastname}`;
//   return (
//     <div className={styles.deliverySection}>
//       {mainData ? (
//         <div className={styles.deliveryCard}>
//           <p>
//             <strong>Full Name:</strong>
//             <br />
//             <input
//               type="text"
//               value={formData.full_name || fullName || " "}
//               onChange={(e) =>
//                 setFormData({ ...formData, full_name: e.target.value })
//               }
//             />
//           </p>

//           <p>
//             <strong>Email:</strong>
//             <br />
//             <input
//               type="email"
//               value={formData.email || mainData.email || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />
//           </p>

//           {/* COUNTRY SELECT */}
//           <select
//             name="country"
//             value={formData.country}
//             onChange={handleCountryChange}
//           >
//             <option value="">Select Country</option>
//             {countries.map((country, idx) => (
//               <option key={idx} value={country.name}>
//                 {country.name}
//               </option>
//             ))}
//           </select>

//           {/* STATES SELECT */}
//           {states.length > 0 && (
//             <select
//               name="state"
//               value={formData.state}
//               onChange={(e) =>
//                 setFormData({ ...formData, state: e.target.value })
//               }
//             >
//               <option value="">Select State / Region</option>
//               {states.map((state, idx) => (
//                 <option key={idx} value={state.name}>
//                   {state.name}
//                 </option>
//               ))}
//             </select>
//           )}

//           {/* DELIVERY CARDS */}
//           <div
//             className={styles.deliveryOptionCard}
//             style={{ marginTop: 10, padding: "10px" }}
//           >
//             <small>
//               Pickup Station — ₦950
//               <br />
//               {pickup.startWeekday} {pickup.startDay} – {pickup.endDay}{" "}
//               {pickup.endWeekday} {pickup.endMonth} {pickup.endYear}
//             </small>
//           </div>

//           <div
//             className={styles.deliveryOptionCard}
//             style={{ marginTop: 10, padding: "10px" }}
//           >
//             <small>
//               Door Delivery — ₦2,710
//               <br />
//               {delivery.startWeekday} {delivery.startDay} – {delivery.endDay}{" "}
//               {delivery.endWeekday} {delivery.endMonth} {delivery.endYear}
//             </small>
//           </div>

//           <div
//             className={styles.deliveryOptionCard}
//             style={{ marginTop: 10, padding: "10px" }}
//           >
//             <small>Return Policy — Free return within 7 days</small>
//           </div>

//           <div className={styles.deliveryOptionCard}>
//             <p style={{ color: "" }}>Update your delivery address below:</p>

//             <button>Update Delivery Address</button>
//           </div>
//         </div>
//       ) : (
//         <p>User details not available</p>
//       )}
//     </div>
//   );
// }

function ProductDetails() {
  const URL = import.meta.env.VITE_APP_URL;
  const { mainData } = useContext(LoginContext);

  const { addToCart, cart, symbol } = useContext(ClothContext);

  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showdetail, setShowdetail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    fetch(`${URL}/api/v1/clothes/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setProduct(data[0]);
          // console.log(data);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));

    return () => {
      isMounted = false;
    };
  }, [productID]);

  useEffect(() => {
    if (product?.category) {
      fetch(
        `${URL}/api/v1/clothes?name=${encodeURIComponent(product.productName)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const limitedData = data.slice(0, 40);
          // console.log(`limited Data`, limitedData);

          setRelatedProducts(limitedData);
        })
        .catch((error) =>
          console.error("Error fetching related products:", error),
        );
    }
  }, [product?.category]);

  if (!product) {
    return <PageLoading name="Loading Clothes Details..." />;
  }

  const productImages = [product?.image1, product?.image2, product?.image3];

  const newPrice = Number(product?.price);
  let originalPrice;

  if (newPrice >= 15000) originalPrice = newPrice * 1.5;
  else if (newPrice > 12000) originalPrice = newPrice * 1.4;
  else if (newPrice > 7000) originalPrice = newPrice * 1.3;
  else if (newPrice > 3000) originalPrice = newPrice * 1.2;
  else originalPrice = newPrice * 1.1;

  originalPrice = Number(originalPrice.toFixed(2));
  let discount = originalPrice - newPrice;
  let percentDiscount = ((discount / originalPrice) * 100).toFixed(0);
  let Pdiscount = `-${percentDiscount}%`;

  const stockCount = Number(product?.stock);

  return (
    <div style={{ background: "#f1f1f1" }}>
      <main className={styles.container}>
        <div className={styles.productDetailSections}>
          {/* IMAGE SECTION */}
          <div className={styles.imageSection}>
            <Swiper
              spaceBetween={5}
              slidesPerView={1}
              slidesPerGroup={1}
              autoplay={{ delay: 2000 }}
              loop={productImages.length > 1}
              modules={[Autoplay]}
            >
              {productImages?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={product?.productName} />
                </SwiperSlide>
              ))}
              <div className={styles.title}>
                <h5>{product?.productName}</h5>
              </div>
              <p className={styles.discountBadge}>{Pdiscount}</p>
            </Swiper>
          </div>

          {/* DETAILS SECTION */}
          <div className={styles.detailsSection}>
            <div className={styles.detailsubsection}>
              <div className={styles.priceBox}>
                <span className={styles.newPrice}>
                  {symbol}
                  {newPrice.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  {symbol}
                  {originalPrice.toLocaleString()}
                </span>
                <span className={styles.discountText}>{Pdiscount}</span>
              </div>

              <small
                style={stockCount <= 20 ? { color: "red" } : { color: "green" }}
              >
                {" "}
                ⚠️ {stockCount} Unit left
              </small>
            </div>

            <StarRating rating={product?.rating} />

            <button
              onClick={() => addToCart(product)}
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
        {product?.description && (
          <div className={styles.descriptionBox}>
            <h4 className={styles.descriptionTitle}>Product Description</h4>

            <p className={styles.descriptionText}>
              {showdetail || product.description.length <= 100
                ? product.description
                : `${product.description.slice(0, 100)}...`}
            </p>

            {product.description.length > 100 && (
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
      {/* <DeliverySection mainData={mainData} /> */}
      <CustomerSearch relatedProducts={relatedProducts} symbol={symbol} />
    </div>
  );
}

export default ProductDetails;
