import { useContext, useState, useEffect } from "react";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Components/UserLogin/LoginContext";
import { ClothContext } from "../../Components/Context/ClothContext";
import StarRating from "../../Components/Context/StarRating";
import styles from "./Phone.module.css";
import image1 from "./images/image1.png";


export const FilterPhone = () => {
  return(
    <></>
  )
}
function Phones() {
  const { user } = useContext(LoginContext);
  const { addToCart, symbol } = useContext(ClothContext);
  const [phones, setPhones] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_APP_URL;


  const monthName = (d) =>
    d.toLocaleString("en-US", { month: "short" }).toUpperCase();

  const dealDateRange = `${formatDay(today)} — ${formatDay(endDate)} ${monthName(endDate)}`;

  const fetchPhone = async ()=> {

    // const res = await
  }
  useEffect(() => {
    fetch(`${URL}/api/v1/phones`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPhones(data);
        else console.log("Invalid Data Format", data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: 50, behavior: "auto" });
  };

  return (
    <main className={styles.main}>

      {/* ── BANNER ── */}
      {/* <header className={styles.banner}>
        <div className={styles.bannerLeft}>
          <span className={styles.brandName}>Link Styles</span>
          <div className={styles.festivalBadge}>
            <span>BRAND FESTIVAL</span>
          </div>
          <div className={styles.datePill}>{dealDateRange}</div>
        </div>

        <div className={styles.bannerCenter}>
          <p className={styles.dealTag}>🔥 Limited Time Deal</p>
          <h1 className={styles.dealTitle}>PHONE<br />DEALS</h1>
          <div className={styles.discountRow}>
            <span className={styles.upTo}>UP TO</span>
            <span className={styles.percent}>10%</span>
            <span className={styles.off}>OFF</span>
          </div>
          <p className={styles.dealSub}>Best phones, best prices</p>
        </div>

        <div className={styles.bannerRight}>
          <img src={image1} alt="Phone deal" className={styles.bannerImg} />
        </div>
      </header> */}

      {/* ── HEADINGS ── */}
      <h2 className={styles.pageHeading}>Phones & Tablets</h2>
      <p className={styles.callToOrder}>📞 CALL TO ORDER — 08140470626</p>
      <p className={styles.limitedStock}>⚠️ Limited Stock Available</p>

      {/* ── PRODUCT GRID ── */}
      {phones && phones.length > 0 ? (
        <div className={styles.grid}>
          {phones.map((phone) => {
            const newPrice = Number(phone?.price);
            let originalPrice;

            if (newPrice < 1600000) originalPrice = newPrice * 1.2;
            else if (newPrice <= 1800000) originalPrice = newPrice * 1.17;
            else if (newPrice <= 1900000) originalPrice = newPrice * 1.15;
            else originalPrice = newPrice * 1.1;

            const discount = originalPrice - newPrice;
            const Pdiscount = Math.round((discount / originalPrice) * 100);

            return (
              <div key={phone.product_id} className={styles.card}>
                {/* Discount Badge */}
                <span className={styles.discountBadge}>-{Pdiscount}%</span>

                {/* Image */}
                <div className={styles.imageWrap}>
                  <img
                    src={phone.image2}
                    alt={phone.productName}
                    className={styles.cardImage}
                    onClick={() => { navigate(`/phone/${phone.product_id}`); handleScroll(); }}
                  />
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <h3 className={styles.productName}>{phone.productName}</h3>

                  <div className={styles.priceSection}>
                    <span className={styles.price}>
                      {symbol || "₦"}{new Intl.NumberFormat("en-US").format(newPrice)}
                    </span>
                    <span className={styles.oldPrice}>
                      {symbol || "₦"}{new Intl.NumberFormat("en-US").format(Math.round(originalPrice))}
                    </span>
                  </div>

                  <StarRating rating={phone?.rating} />

                  <div className={styles.btnGroup}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => { navigate(`/phone/${phone.product_id}`); handleScroll(); }}
                    >
                      View More
                    </button>
                    <button
                      className={styles.cartBtn}
                      onClick={() => addToCart(phone)}
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
        <PageLoading name="Phones and Tablets" />
      )}
    </main>
  );
}

export default Phones;