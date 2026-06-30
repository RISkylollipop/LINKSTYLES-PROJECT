import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { ClothContext } from "../Context/ClothContext";
import { LoginContext } from "../UserLogin/LoginContext";
import { toast } from "react-toastify";
import logo from "../../assets/mainlogo.png";
import styles from "./Header.module.css";

const URL = import.meta.env.VITE_APP_URL;

const navLinks = [
  { label: "Clothing",        path: "/clothes" },
  { label: "Phones",          path: "/phones" },
  { label: "Shoes",           path: "/shoes" },
  { label: "Everyday Style",  path: "/householditem" },
  { label: "Premium",         path: "/premium" },
  { label: "Summer Essentials", path: "/summers" },
];

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useContext(ClothContext);
  const { user } = useContext(LoginContext);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const logout = async () => {
    await fetch(`${URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    toast.success("Logged out. See you soon!");
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* Logo */}
          <div className={styles.logo} onClick={() => navigate("/")}>
            LinkStyles
          </div>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <button
                key={link.path}
                className={styles.navLink}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div className={styles.icons}>
            {/* Cart */}
            <button
              className={styles.iconBtn}
              onClick={() => navigate("/product/cart")}
              aria-label="Cart"
            >
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className={styles.badge}>{cartCount}</span>
              )}
            </button>

            {/* Profile */}
            <div className={styles.profileWrap} ref={dropdownRef}>
              <button
                className={styles.iconBtn}
                onClick={() => setProfileMenu(p => !p)}
                aria-label="Profile"
              >
                {user?.profilepicture ? (
                  <img src={user.profilepicture} alt="" className={styles.avatar} />
                ) : (
                  <FaUser size={17} />
                )}
              </button>

              {profileMenu && (
                <ul className={styles.dropdown}>
                  <li onClick={() => { navigate('/profile'); setProfileMenu(false); }}>Profile</li>
                  <li onClick={() => { navigate('/settings'); setProfileMenu(false); }}>Settings</li>
                  <li className={styles.logoutItem} onClick={logout}>Logout</li>
                </ul>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.path}
            className={styles.mobileLink}
            onClick={() => { navigate(link.path); setMobileOpen(false); }}
          >
            {link.label}
          </button>
        ))}
        <div className={styles.mobileDivider} />
        <button className={styles.mobileLink} onClick={() => { navigate('/product/cart'); setMobileOpen(false); }}>
          Cart {cartCount > 0 && <span className={styles.mobileCartCount}>{cartCount}</span>}
        </button>
        <button className={styles.mobileLink} onClick={logout}>Logout</button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}

export default Header;