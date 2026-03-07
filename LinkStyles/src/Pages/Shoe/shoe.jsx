import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "../../Components/ScrollToTop";

import styles from "./shoe.module.css";
import PageLoading from "../../Components/PageLoading/PageLoading";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { ClothContext } from "../../Components/Context/ClothContext";

function Shoes() {
    const { addToCart, symbol } = useContext(ClothContext);

    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [value, setValue] = useState(2000);

    const URL = "http://linkstyles-project-production.up.railway.app";

    useEffect(() => {
        fetch(`${URL}/api/v1/shoes`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    console.log(`the data`,typeof data);
                    setProduct(data);
                } else {
                    console.error("Invalid data format", typeof data);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        if (product.length > 0) {
            console.log("✅ Products loaded:", product);
        }
    }, [product]);


    function handleSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    function handleValueChange(e) {
        setValue(parseFloat(e.target.value));
    }

    function refreshValue() {
        setValue(100);
    }

    return (
        <main className={styles.productContainer}>
            <div>
                <h3 className={styles.headings}>
                    Fashion Unleashed - Trendy Looks for Every Occasion!
                </h3>

                <h3 className={styles.headings}>Call to order 070000000000</h3>

                <div className={styles.seachdiv}>
                    <input
                        type="text"
                        placeholder="Search"
                        name="searchQuery"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        style={{ borderRadius: "10px", width: "100%", padding: "10px" }}
                    />

                    <br />

                    <input
                        type="range"
                        min="100"
                        name="priceRange"
                        id="range"
                        max="15000"
                        step="1"
                        value={value}
                        onChange={handleValueChange}
                        style={{ width: "100%", marginTop: "10px" }}
                    />

                    <br />

                    <span>
                        <label htmlFor="range">Filter With Price: {value}</label>
                        <p>
                            Reset{" "}
                            <i
                                className="bi bi-arrow-clockwise"
                                onClick={refreshValue}
                            ></i>
                        </p>
                    </span>
                </div>

                <div className={styles.cardContainer}>
                    {product.length > 0 ? (
                        product
                            .filter((prod) => {
                                const matchesPrice = Number(prod.price) >= value;

                                if (!searchQuery.trim()) return matchesPrice;

                                const words = searchQuery.toLowerCase().split(" ");

                                const matchesSearch = words.some(
                                    (word) =>
                                        prod.productName.toLowerCase().includes(word) ||
                                        prod.description.toLowerCase().includes(word) ||
                                        prod.category.toLowerCase().includes(word)
                                );

                                return matchesPrice && matchesSearch;
                            })
                            .map((prod) => {
                                let newPrice = Number(prod.price);
                                let originalPrice = 0;

                                if (newPrice >= 15000) originalPrice = newPrice * 1.5;
                                else if (newPrice > 12000) originalPrice = newPrice * 1.4;
                                else if (newPrice > 7000) originalPrice = newPrice * 1.3;
                                else if (newPrice > 3000) originalPrice = newPrice * 1.2;
                                else originalPrice = newPrice * 1.1;

                                originalPrice = Number(originalPrice.toFixed(2));
                                let discount = originalPrice - newPrice;
                                let percentDiscount = ((discount / originalPrice) * 100).toFixed(0);
                                let Pdiscount = `-${percentDiscount}%`;

                                return (
                                    <div key={prod.product_id} className={styles.card}>
                                        {prod.image1 ? (
                                            <div className={styles.imageWrapper}>
                                                <span className={styles.discount}>{Pdiscount}</span>
                                                <img
                                                    src={prod.image1}
                                                    alt={prod.productName}
                                                    onClick={() =>
                                                        navigate(`/shoes/${prod.product_id}`)
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: "center" }}>
                                                <PageLoading name="Product Loading..." />
                                            </div>
                                        )}

                                        <div className={styles.cardBody}>
                                            <h3>{prod.productName}</h3>

                                            <p className={styles.priceWrapper}>
                                                <span className={styles.newPrice}>
                                                    {symbol}{" "}
                                                    {new Intl.NumberFormat("en-US").format(newPrice)}
                                                </span>
                                                <br />
                                                <span className={styles.originalPrice}>
                                                    {symbol}{" "}
                                                    {new Intl.NumberFormat("en-US").format(originalPrice)}
                                                </span>
                                            </p>

                                            <div className={styles.btnGroup}>
                                                <button
                                                    onClick={() =>
                                                        navigate(`/shoes/${prod.product_id}`)
                                                    }
                                                    className={styles.detailbtn}
                                                >
                                                    View More
                                                </button>
                                                <button
                                                    onClick={() => addToCart(prod)}
                                                    className={styles.addtocartbtn}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            <PageLoading name="Product Loading..." />
                        </div>
                    )}
                </div>
            </div>

            <ScrollToTop />
            <Footer />
        </main>
    );
}

export default Shoes;
