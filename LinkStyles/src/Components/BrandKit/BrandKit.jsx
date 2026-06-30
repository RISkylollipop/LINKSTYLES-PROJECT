import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import styles from './BrandKit.module.css';

import BrandA2 from './BrandKitImages/BrandA2.png';
import BrandA3 from './BrandKitImages/BrandA3.png';
import BrandA4 from './BrandKitImages/BrandA6.png';
import Bracelets from './BrandKitImages/Bracelets.png';
import apparel from './BrandKitImages/apparelBoutique.png';
import mensHat from './BrandKitImages/mensHat.png';
import mensShirt from './BrandKitImages/mensShirt.png';
import childrenShoe from './BrandKitImages/childrenShoe.png';
import mensWatch from './BrandKitImages/mensWatch.png';
import Shoes from './BrandKitImages/Shoes.png';
import shoe from './BrandKitImages/shoe.png';
import womenBags from './BrandKitImages/womenBags.png';

const brands = [
  { id: 2,  name: "Winter Clothes",       image: BrandA2,      category: "Winter Clothes" },
  { id: 3,  name: "Gold Ring",             image: BrandA3,      category: "Gold Ring" },
  { id: 4,  name: "Women's Accessories",   image: BrandA4,      category: "Women's Accessories" },
  { id: 5,  name: "Bracelets",             image: Bracelets,    category: "Bracelets" },
  { id: 6,  name: "Apparels",              image: apparel,      category: "Apparels" },
  { id: 7,  name: "Mens Hat",              image: mensHat,      category: "Mens Hat" },
  { id: 8,  name: "Shoes",                 image: shoe,         category: "Shoes" },
  { id: 9,  name: "Mens Shirt",            image: mensShirt,    category: "Mens Shirt" },
  { id: 10, name: "Children Shoe",         image: childrenShoe, category: "Children Shoe" },
  { id: 11, name: "Mens Watch",            image: mensWatch,    category: "Mens Watch" },
  { id: 12, name: "Shoes",                 image: Shoes,        category: "Shoes" },
  { id: 13, name: "Women Bags",            image: womenBags,    category: "Women Bags" },
  { id: 15, name: "Winter Clothes",        image: BrandA2,      category: "Winter Clothes" },
  { id: 16, name: "Gold Ring",             image: BrandA3,      category: "Gold Ring" },
  { id: 17, name: "Women's Accessories",   image: BrandA4,      category: "Women's Accessories" },
  { id: 18, name: "Bracelets",             image: Bracelets,    category: "Bracelets" },
  { id: 19, name: "Apparels",              image: apparel,      category: "Apparels" },
  { id: 20, name: "Mens Hat",              image: mensHat,      category: "Mens Hat" },
];

function Brandkit() {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.tag}>Shop by Category</span>
        <h2 className={styles.title}>Explore Our Collections</h2>
      </div>

      <div className={styles.swiperWrapper}>
        <Swiper
          spaceBetween={2}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          modules={[Autoplay, Navigation]}
          breakpoints={{
            0:   { slidesPerView: 1, spaceBetween: 2 },
            480: { slidesPerView: 2, spaceBetween: 2 },
            768: { slidesPerView: 3, spaceBetween: 2 },
            1024:{ slidesPerView: 4, spaceBetween: 2 },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div
                className={styles.card}
                onClick={() => navigate('/clothes')}
                role="button"
                tabIndex={0}
              >
                <img src={brand.image} alt={brand.name} className={styles.image} />
                <div className={styles.overlay}>
                  <div className={styles.cardContent}>
                    <h3 className={styles.categoryName}>{brand.category}</h3>
                    <span className={styles.shopLink}>Shop Now →</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Brandkit;