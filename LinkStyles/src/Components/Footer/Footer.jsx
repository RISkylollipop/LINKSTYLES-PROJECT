import React, { useState } from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

import { FaWhatsapp, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import PatnerLogo1 from "./FooterImages/PatnerLogo1.png";
import PatnerLogo2 from "./FooterImages/PatnerLogo2.png";
import PatnerLogo3 from "./FooterImages/PatnerLogo3.png";
import PatnerLogo4 from "./FooterImages/PatnerLogo4.png";
import PatnerLogo5 from "./FooterImages/PatnerLogo5.png";
import PatnerLogo6 from "./FooterImages/PatnerLogo6.png";
import PatnerLogo7 from "./FooterImages/PatnerLogo7.png";

import FooterBillBoard from "./FooterImages/FooterBillBoard.png";

const BASE_URL = import.meta.env.VITE_APP_URL;

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
  { id: 20, name: "ChANEL", image: PatnerLogo6 },
];

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

function FooterCards() {
  const navigate = useNavigate();
  const handlescroll = () => {
    if (window.scrollY > 300) {
      window.scrollTo({
        top: 50,
        behavior: "auto",
      });
    }
  };
  const FooterData = [
    {
      id: "shop",
      label: "Shop",
      childs: [
        { label: "Clothing", path: "/clothes" },
        { label: "Shoes", path: "/shoes" },
        { label: "Accessories", path: "/accessories" },
        { label: "Premium Collection", path: "/premium" },
        { label: "Summer Essentials", path: "/summers" },
        { label: "Everyday Style", path: "/householditem" },
      ],
    },
    {
      id: "company",
      label: "Company",
      childs: [
        { label: "About Us", path: "/about" },
        { label: "Contact Us", path: "/contact" },
        { label: "FAQs", path: "/faqs" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
      ],
    },
  ];

  const SocialMedia = [
    { id: "linkedin", icon: <FaLinkedin /> },
    { id: "twitter", icon: <FaXTwitter /> },
    { id: "facebook", icon: <FaFacebook /> },
    { id: "whatsapp", icon: <FaWhatsapp /> },
  ];

  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);

  const handleSubscribeNewsLetter = async () => {
    try {
      setActive(true);
      const res = await fetch(`${BASE_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const sendEmailRes = await res.json();
      if (sendEmailRes?.error) {
        setError(sendEmailRes.error);
        setActive(false);
      } else if (res.status === 403) {
        setMessage(sendEmailRes.message);
        setActive(false);
      } else if (sendEmailRes.message) {
        setMessage(sendEmailRes.message);
      }
    } catch (error) {
      setActive(false)
      console.log(error);
      console.error(error);
    }
  };

  const now = new Date();
  const currentYear = now.getFullYear();
  return (
    <div className={styles.footer}>
      <div className={styles.FooterCardContainer}>
        <div className={styles.footerCardLogo}>
          <h3 className={styles.logo}>Linkstyles</h3>

          <p>Fashion for every style, delivered across Nigeria.</p>

          <button>🛒 Sell on Linkstyles</button>

          <div className={styles.socialHandles}>
            {SocialMedia &&
              SocialMedia.map((handles) => (
                <span key={handles.id}>{handles.icon}</span>
              ))}
          </div>
        </div>

        <div className={styles.footerCardMiniConttainer}>
          {FooterData &&
            FooterData.map((footer) => (
              <div key={footer.id} className={styles.footerCard}>
                <h1>{footer.label}</h1>
                <ul>
                  {footer.childs.map((items, idx) => (
                    <li key={idx}>
                      <a
                        onClick={() => {
                          navigate(items.path);
                          handlescroll();
                        }}
                      >
                        {items.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <div className={styles.footerCardNews}>
          <small style={{ color: "green" }}>{message}</small>
          <h1>stay updated</h1>
          <p>Get the latest deals and new arrivals straight to your inbox.</p>
          <div className={styles.newsLetter}>
            <input
              type="email"
              name="email"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value;
                setFormData({ ...formData, email: value });
                if (!value) {
                  setError(`Please input an valid Email`);
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                  setError("Please Use a Valid Email");
                } else {
                  setError("");
                }
              }}
            />
            <small style={{ color: "red" }}>{error}</small>
            <button
              disabled={active}
              onClick={() => {
                handleSubscribeNewsLetter();
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className={styles.downFooter}>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <p >
            &copy; {currentYear} <span>Linkstyles.</span> All rights reserved.
          </p>
        </div>
        <div>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms</li>
            <li>Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  
  
  return (
    <>
      <div className={styles.patnerBrand}>
        <h2 className={styles.cardName}>Our Partner Brand</h2>
      </div>
      <Swiper
        spaceBetween={0}
        slidesPerView="auto"
        loop={true}
        speed={1800} 
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        freeMode={true}
        modules={[Autoplay]}
        breakpoints={{
          300: { slidesPerView: 2 },
          500: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 6 },
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
            <img src={FooterBillBoard} alt="" />
          </a>
        </div>
      </div>

      <FooterCards />
    </>
  );
}

export default Footer;
