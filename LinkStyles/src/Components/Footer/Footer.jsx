
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js'
import styles from './Footer.module.css'
import { useNavigate } from 'react-router-dom'




import PatnerLogo1 from './FooterImages/PatnerLogo1.png'
import PatnerLogo2 from './FooterImages/PatnerLogo2.png';
import PatnerLogo3 from './FooterImages/PatnerLogo3.png';
import PatnerLogo4 from './FooterImages/PatnerLogo4.png';
import PatnerLogo5 from './FooterImages/PatnerLogo5.png';
import PatnerLogo6 from './FooterImages/PatnerLogo6.png';
import PatnerLogo7 from './FooterImages/PatnerLogo7.png';


import FooterBillBoard from './FooterImages/FooterBillBoard.png';

const PartnerBrands = [
    { id: 1, name: "ALL BRAND", image: PatnerLogo1 },
    { id: 2, name: "ALL BRAND", image: PatnerLogo2 },
    { id: 3, name: "NIKE", image: PatnerLogo3 },
    { id: 4, name: "FENDI", image: PatnerLogo4 },
    { id: 5, name: "GIVENCHY", image: PatnerLogo5 },
    { id: 6, name: "ChANEL", image: PatnerLogo6 },
    { id: 7, name: "GUCCI", image: PatnerLogo7 },
    { id: 8, name: "ALL BRAND", image: PatnerLogo1 },
    { id: 9, name: "ALL BRAND", image: PatnerLogo2 },
    { id: 10, name: "NIKE", image: PatnerLogo3 },
    { id: 11, name: "FENDI", image: PatnerLogo4 },
    { id: 12, name: "GIVENCHY", image: PatnerLogo5 },
    { id: 13, name: "ChANEL", image: PatnerLogo6 },
    { id: 14, name: "GUCCI", image: PatnerLogo7 },
    { id: 15, name: "ALL BRAND", image: PatnerLogo1 },
    { id: 16, name: "ALL BRAND", image: PatnerLogo2 },
    { id: 17, name: "NIKE", image: PatnerLogo3 },
    { id: 18, name: "FENDI", image: PatnerLogo4 },
    { id: 19, name: "GIVENCHY", image: PatnerLogo5 },
    { id: 20, name: "ChANEL", image: PatnerLogo6 }
]




import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/autoplay";


function Footer() {

    const navigate = useNavigate()
    const [newsletter, setNewsletter] = useState({ email: "" });
    const [errors, setErrors] = useState({});

    const validateLetter = () => {
        let newErrors = {};

        if (!newsletter.email) {
            newErrors.email = "Please input your email";
        } else if (!/\S+@\S+\.\S+/.test(newsletter.email)) {
            newErrors.email = "Invalid email";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateLetter();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        fetch(`http://localhost:3002/api/v1/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newsletter)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data);
                    alert(`${data.error}`)
                } else {
                    alert(`${data.message}`);
                    setNewsletter({ email: "" });

                }
            })
    };

    return (
        <>
            <div className={styles.patnerBrand}>
                <h2 className={styles.cardName}>Our Partner Brand</h2>

            </div>
            <Swiper
                spaceBetween={0}
                slidesPerView="auto"
                loop={true}
                speed={1800} // Adjust for smoothness (lower = slower, smoother)
                autoplay={{
                    delay: 0, // No delay
                    disableOnInteraction: false
                }}
                freeMode={true} // Allow natural movement
                // centeredSlides={true} // Center slides smoothly
                modules={[Autoplay]}
                breakpoints={{
                    300: { slidesPerView: 2 },
                    500: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 4 },
                    1200: { slidesPerView: 6 }
                }}
            >




                {PartnerBrands.map((PartnerBrand) => (
                    <SwiperSlide key={PartnerBrand.id}>
                        <div className={`${styles.card} ${styles.cardex}`}>
                            <img src={PartnerBrand.image} alt={PartnerBrand.name} />
                        </div>
                    </SwiperSlide>

                ))}

            </Swiper>




            <div className={styles.billBoardContainer}>
                <div className={styles.billBoard}>
                    <a>
                        <img src={FooterBillBoard} alt="" /></a>
                </div>
            </div>

            <div className={styles.footerFastLinkContainer}>
                <div className={styles.footerFastLink}>
                    <h2>Shop</h2>
                    <ul className={styles.footerUl}>
                        <li
                            className={styles.footerLi}
                            onClick={() => navigate(`/clothes`)}>
                            <a> Everyday Style</a>
                        </li>
                        <li
                            className={styles.footerLi}
                            onClick={() => navigate(`/clothes`)}>
                            <a> Premium Collection</a>
                        </li>
                        <li
                            className={styles.footerLi}
                            onClick={() => navigate(`/clothes`)}>
                            <a> Summer Essentials</a>
                        </li>
                        <li
                            className={styles.footerLi}
                            onClick={() => navigate(`/clothes`)}>
                            <a> Winter Essential</a>
                        </li>
                    </ul>
                </div>

                <div className={styles.footerFastLink}>
                    <h2>Categories</h2>
                    <ul>
                        <li
                            className={styles.footerLi}
                            onClick={() => navigate(`/clothes`)}><a>  Clothing</a></li>
                        <li
                            className={styles.footerLi}
                        ><a> Accessories</a></li>
                        <li
                            className={styles.footerLi}
                        ><a> Shoes</a></li>
                        <li
                            className={styles.footerLi}
                        ><a> Bags</a></li>


                    </ul>
                </div>

                <div className={styles.footerFastLink}>
                    <h2>About Us</h2>
                    <ul>
                        <li
                            className={styles.footerLi}
                        >
                            <a onClick={() => window.open(`/`, '_blank')}
                                style={{ cursor: "pointer" }}
                            > Home</a></li>



                        <li
                            className={styles.footerLi}
                        >
                            <a
                                onClick={() => window.open('/contact', '_blank')}
                                style={{ cursor: 'pointer' }}
                            >
                                Contact Us
                            </a>

                        </li>
                        <li
                            className={styles.footerLi}
                        ><a> Shop All</a></li>

                        <li
                            className={styles.footerLi}
                        ><a onClick={() => navigate(`/faqs`)}> FAQs</a>
                        </li>

                    </ul>
                </div>

                <div className={`${styles.footerFastLink} ${styles.Newsletter}`}>

                    <div className='newsLetterContainer'>

                        <div className={styles.newsLetterText}>
                            <h2>Stay Updated</h2>
                            <p>Subscribe to our newsletter for the latest
                                fashion trends and  exclusive offers.</p>
                        </div>


                        <form onSubmit={handleSubmit}>
                            <div className={styles.newsLetterFormGroup}>

                                <div className={styles.formGrp}>
                                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        value={newsletter.email}
                                        onChange={(e) => setNewsletter({ ...newsletter, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGrp}>
                                    <button type="submit" style={{ marginTop: '20px' }}>
                                        Subscribe
                                    </button>

                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Footer