import React, { useContext, useEffect, useState } from "react";
import styles from "./css/product.module.css";
import PageLoading from "../../Components/PageLoading/PageLoading";
import Footer from "../../Components/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop";
import { useNavigate } from "react-router-dom";
import { ClothContext } from "../../Components/Context/ClothContext";

function Productlunch() {
  const { addToCart, symbol } = useContext(ClothContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [value, setValue] = useState(100);
  const URL = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    fetch(`${URL}/api/v1/clothes`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProduct(data);
        else console.error("Invalid data format", data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleScroll = () => window.scrollTo({ top: 50, behavior: "auto" });

  const filtered = product.filter((prod) => {
    const matchesPrice = Number(prod.price) >= value;
    if (!searchQuery.trim()) return matchesPrice;
    const words = searchQuery.toLowerCase().split(" ");
    const matchesSearch = words.some(
      (word) =>
        prod.productName.toLowerCase().includes(word) ||
        prod.description?.toLowerCase().includes(word) ||
        prod.category?.toLowerCase().includes(word)
    );
    return matchesPrice && matchesSearch;
  });

  return (
    <main className={styles.main}>

      {/* ── PAGE HEADER ── */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Clothing & Fashion</h2>
        <p className={styles.callToOrder}>📞 CALL TO ORDER — 08140470626</p>
      </div>

      {/* ── FILTER BAR ── */}
      <div className={styles.filterBar}>
        <div className={styles.searchWrap}>
          <i className="bi bi-search" style={{ color: "#aaa", fontSize: 14 }}></i>
          <input
            type="text"
            placeholder="Search clothes, styles, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <i
              className="bi bi-x"
              onClick={() => setSearchQuery("")}
              style={{ color: "#aaa", fontSize: 16, cursor: "pointer" }}
            ></i>
          )}
        </div>

        <div className={styles.rangeWrap}>
          <div className={styles.rangeHeader}>
            <span className={styles.rangeLabel}>Min. Price</span>
            <span className={styles.rangeValue}>
              {symbol || "₦"}{new Intl.NumberFormat("en-US").format(value)}
            </span>
            <button className={styles.resetBtn} onClick={() => setValue(100)}>
              Reset
            </button>
          </div>
          <input
            type="range"
            min="100"
            max="15000"
            step="100"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            className={styles.rangeInput}
          />
        </div>
      </div>

      {/* ── RESULTS COUNT ── */}
      {product.length > 0 && (
        <p className={styles.resultCount}>
          Showing <strong>{filtered.length}</strong> of {product.length} products
        </p>
      )}

      {/* ── PRODUCT GRID ── */}
      {product.length > 0 ? (
        filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((prod) => {
              const newPrice = Number(prod.price);
              let originalPrice;

              if (newPrice >= 15000) originalPrice = newPrice * 1.5;
              else if (newPrice > 12000) originalPrice = newPrice * 1.4;
              else if (newPrice > 7000) originalPrice = newPrice * 1.3;
              else if (newPrice > 3000) originalPrice = newPrice * 1.2;
              else originalPrice = newPrice * 1.1;

              originalPrice = Math.round(originalPrice);
              const discount = originalPrice - newPrice;
              const percentDiscount = Math.round((discount / originalPrice) * 100);

              return (
                <div key={prod.product_id} className={styles.card}>
                  <span className={styles.discountBadge}>-{percentDiscount}%</span>

                  <div
                    className={styles.imageWrap}
                    onClick={() => { navigate(`/clothes/${prod.product_id}`); handleScroll(); }}
                  >
                    {prod.image1 ? (
                      <img
                        src={prod.image1}
                        alt={prod.productName}
                        className={styles.cardImage}
                      />
                    ) : (
                      <PageLoading name="Loading..." />
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.productName}>{prod.productName}</h3>

                    <div className={styles.priceSection}>
                      <span className={styles.price}>
                        {symbol || "₦"}{new Intl.NumberFormat("en-US").format(newPrice)}
                      </span>
                      <span className={styles.oldPrice}>
                        {symbol || "₦"}{new Intl.NumberFormat("en-US").format(originalPrice)}
                      </span>
                    </div>

                    <div className={styles.btnGroup}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => { navigate(`/clothes/${prod.product_id}`); handleScroll(); }}
                      >
                        View More
                      </button>
                      <button
                        className={styles.cartBtn}
                        onClick={() => addToCart(prod)}
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
          <div className={styles.noResults}>
            <p>No products match your search or filter.</p>
            <button onClick={() => { setSearchQuery(""); setValue(100); }}>
              Clear Filters
            </button>
          </div>
        )
      ) : (
        <PageLoading name="Clothing & Fashion" />
      )}

      <ScrollToTop />
      <Footer />
    </main>
  );
}

export default Productlunch;