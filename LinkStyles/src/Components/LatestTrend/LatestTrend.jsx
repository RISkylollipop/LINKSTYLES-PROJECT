import React, { useContext } from "react";
import styles from './LatestTrend.module.css';
import { useNavigate } from 'react-router-dom';

import LatestTrendImage1 from './LatestTrendImages/latesttrend1.png';
import LatestTrendImage2 from './LatestTrendImages/latesttrend2.png';
import LatestTrendImage3 from './LatestTrendImages/latesttrend3.png';
import trend1 from './LatestTrendImages/trend1.png'

import { ClothContext } from "../Context/ClothContext";

const latesttrends = [
  { id: 1, image: LatestTrendImage1, name: "Stylish Ankle Boot",        price: "20,999" },
  { id: 2, image: LatestTrendImage2, name: "Comfortable Sneakers",      price: "4,999" },
  { id: 3, image: LatestTrendImage3, name: "Colorful Beaded Bracelet",  price: "4,599" },
  { id: 3, image: trend1, name: "Short Stylish Gown",  price: "14,799" },
];

function LatestTrend() {
  const { symbol } = useContext(ClothContext);
  const navigate = useNavigate();

  return (
    <section className={styles.section}>

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.tag}>New In</span>
          <h2 className={styles.title}>Latest Trends</h2>
          <p className={styles.subtitle}>Discover the freshest styles just for you</p>
        </div>
        <button className={styles.shopAllBtn} onClick={() => navigate('/clothes')}>
          Shop All →
        </button>
      </div>

      <div className={styles.grid}>
        {latesttrends.map((item, index) => (
          <div className={styles.card} key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} className={styles.image} />
              <div className={styles.imageOverlay}>
                <button className={styles.addToCart}>Add to Cart</button>
              </div>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.productName}>{item.name}</h3>
              <p className={styles.price}>{symbol} {item.price}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default LatestTrend;