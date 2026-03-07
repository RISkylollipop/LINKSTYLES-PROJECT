import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate} from 'react-router-dom'
// Import Swiper style
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import styles from  './BrandKit.module.css';



// import BrandA1 from './BrandKitImages/BrandA1.png';
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
    { id: 1, name: "Accessories", image: BrandA1, Category: "Accessories" },
    { id: 2, name: "Winter Clothes", image: BrandA2, Category: "Winter Clothes" },
    { id: 3, name: "Gold Ring", image: BrandA3, Category: "Gold Ring" },
    { id: 4, name: "Women's Accessories", image: BrandA4, Category: "Women's Accessories" },
    { id: 5, name: "Bracelets", image: Bracelets, Category: "Bracelets" },
    { id: 6, name: "Apparels", image: apparel, Category: "Apparels" },
    { id: 7, name: "Mens Hat", image: mensHat, Category: "Mens Hat" },
    { id: 8, name: "Shoes", image: shoe, Category: "Shoes" },
    { id: 9, name: "Mens Shirt", image: mensShirt, Category: "Mens Shirt" },
    { id: 10, name: "Children Shoe", image: childrenShoe, Category: "Children Shoe" },
    { id: 11, name: "Mens Watch", image: mensWatch, Category: "Mens Watch" },
    { id: 12, name: "Shoes", image: Shoes, Category: "Shoes" },
    { id: 13, name: "Women Bags", image: womenBags, Category: "Women Bags" },
    { id: 14, name: "Accessories", image: BrandA1, Category: "Accessories" },
    { id: 15, name: "Winter Clothes", image: BrandA2, Category: "Winter Clothes" },
    { id: 16, name: "Gold Ring", image: BrandA3, Category: "Gold Ring" },
    { id: 17, name: "Women's Accessories", image: BrandA4, Category: "Women's Accessories" },
    { id: 18, name: "Bracelets", image: Bracelets, Category: "Bracelets" },
    { id: 19, name: "Apparels", image: apparel, Category: "Apparels" },
    { id: 20, name: "Mens Hat", image: mensHat, Category: "Mens Hat" }
];

function Brandkit() {

    const navigate = useNavigate()
    return (
        <div className={styles.brandkitContainer}>
            <Swiper
                spaceBetween={0}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 5000 }}
                navigation
                modules={[Autoplay, Navigation]}


                breakpoints={{
                    0: {
                        slidesPerView: 0,
                        spaceBetween: 0,
                    },
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    650: {
                        slidesPerView: 2,
                        spaceBetween: 0,
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 0
                    }

                }}
            >
                {brands.map((brand) => (
                    <SwiperSlide key={brand.id}>
                        <div className={styles.brandcontainer}>
                            <img src={brand.image} alt={brand.name} />
                            <h3 className={styles.brandText}>{brand.Category}</h3>

                            <Button
                                onClick={() => navigate(`/clothes`)}
                                variant="primary"
                                className={styles.brandkitButton}>
                                Shop Now
                            </Button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}




export default Brandkit;



