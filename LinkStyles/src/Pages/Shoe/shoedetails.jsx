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




import styles from "./shoeDetails.module.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";


function ShoeDetails() {
  const { addToCart, cart, symbol } = useContext(ClothContext);
  const { mainData } = useContext(LoginContext);

  const { handleCountryChange, countries, states, formData, setFormData } =
    useContext(CountryContext);

  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${URL}/api/v1/shoes/${productID}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProduct(data[0]);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching product:", error);
        }
      });

    return () => {
      controller.abort(); //cancels fetch
    };
  }, [productID]);


  useEffect(() => {
    if (product?.category) {
      fetch(
        `${URL}/api/v1/shoes?name=${encodeURIComponent(
          product.productName
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const limitedData = data.slice(0, 40);
          setRelatedProducts(limitedData);
        })
        .catch((error) =>
          console.error("Error fetching related products:", error)
        );
    }
  }, [product?.category]);




  const shoeImages = [];
  if (product?.image1) shoeImages.push(product.image1)
  if (product?.image2) shoeImages.push(product.image2)
  if (product?.image3) shoeImages.push(product.image3)




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





  /* Delivery date specification */
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentDay = now.getDate();
  const currentMonth = now.toLocaleString("default", { month: "long" })
  const weekDay = now.toLocaleString("default", { weekday: "long" })
  const newDate = new Date(now);
  newDate.setDate(now.getDate() + 4);
  const forDaysLater = newDate.toLocaleString("default", { weekday: 'long' })
  const today = new Date();

  /* ---------------- PICKUP (4 days) ---------------- */
  const pickupStart = new Date(today);
  const pickupEnd = new Date(today);
  pickupEnd.setDate(today.getDate() + 4);

  /* ---------------- DOOR DELIVERY (10 days) ---------------- */
  const deliveryStart = new Date(today);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 10);

  /* ---------------- FORMATTERS ---------------- */
  const format = (date, option) =>
    date.toLocaleString("default", option);

  /* Pickup display */
  const pickup = {
    startDay: pickupStart.getDate(),
    startWeekday: format(pickupStart, { weekday: "long" }),
    endDay: pickupEnd.getDate(),
    endWeekday: format(pickupEnd, { weekday: "long" }),
    endMonth: format(pickupEnd, { month: "long" }),
    endYear: pickupEnd.getFullYear(),
  };

  /* Delivery display */
  const delivery = {
    startDay: deliveryStart.getDate(),
    startWeekday: format(deliveryStart, { weekday: "long" }),
    endDay: deliveryEnd.getDate(),
    endWeekday: format(deliveryEnd, { weekday: "long" }),
    endMonth: format(deliveryEnd, { month: "long" }),
    endYear: deliveryEnd.getFullYear(),
  };



  return (
    <>


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
              {shoeImages?.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={product?.productName} />
                </SwiperSlide>
              ))}
            </Swiper>

            <p className={styles.discountBadge}>{Pdiscount}</p>
          </div>

          {/* DETAILS SECTION */}
          <div className={styles.detailsSection}>
            <div className={styles.detailsubsection}>
              <h2 className={styles.title}>
                {product?.productName}
                {/* {product.display}
                   {product.connectivity} - {product.color} */}
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
                <span className={styles.discountText}>{Pdiscount}</span>
              </div>

              {/* <small>⚠️ {product.stock} Unit left</small> */}
            </div>

            <StarRating rating={4.5} />
            <hr />

            <button
              onClick={() => addToCart(product)}
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
                    Pickup Station — ₦950
                    <br />
                    {pickup.startWeekday} {pickup.startDay} –{" "}
                    {pickup.endDay} {pickup.endWeekday}{" "}
                    {pickup.endMonth} {pickup.endYear}
                  </small>
                </div>

                <div className="card" style={{ marginTop: 10 }}>
                  <small>
                    Door Delivery — ₦1,710
                    <br />
                    {delivery.startWeekday} {delivery.startDay} –{" "}
                    {delivery.endDay} {delivery.endWeekday}{" "}
                    {delivery.endMonth} {delivery.endYear}
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



      <h2>Customers Also Search</h2>

      <Swiper
        spaceBetween={5}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        modules={[Autoplay, Navigation]}
        breakpoints={{
          300: { slidesPerView: 1 },
          650: { slidesPerView: 3 },
          800: { slidesPerView: 3 },
        }}
      >
        {relatedProducts.length > 0 ? (
          relatedProducts.map((related) => (
            <SwiperSlide key={related.product_id}>
              <div
                className={styles.card}
                onClick={() =>
                  navigate(`/shoes/${related.product_id}`)
                }
              >
                <img
                  src={related.image1}
                  alt={related.productName}
                />
                <h3>{related.productName}</h3>
                <p>
                  Price: {symbol} {related.price}
                </p>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <PageLoading name="Product Loading" />
          </div>
        )}
      </Swiper>
    </>
  );
}

export default ShoeDetails;
