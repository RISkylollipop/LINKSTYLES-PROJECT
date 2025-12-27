import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import PageLoading from "../../Components/PageLoading/PageLoading";
import { ClothContext } from "../../Components/Context/ClothContext";

import styles from "./shoeDetails.module.css";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

function ShoeDetails() {
  const { addToCart, cart, symbol } = useContext(ClothContext);

  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  const URL = `http://localhost:3005`;

  useEffect(() => {
    let isMounted = true;

    fetch(`${URL}/api/v1/shoes/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setProduct(data[0]);
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

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.detailDeliveryCard}>
          {product ? (
            <div className={styles.detailCard}>
              <div className={styles.ImageCard}>
                <img src={product.image1} alt={product.productName} />
              </div>

              <div className={styles.detailCard}>
                <span className={styles.payOndel}>Pay On Delivery</span>
              </div>
            </div>
          ) : (
            <h2>No Product Found</h2>
          )}

          <div className={styles.deliveryCard}>
            <h1>Delivery Detail</h1>
          </div>
        </div>

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
      </div>
    </>
  );
}

export default ShoeDetails;
