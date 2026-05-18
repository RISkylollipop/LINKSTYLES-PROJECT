import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

import logo from "../../assets/mainlogo.png";

// Declared Global Variable
import { ClothContext } from "../Context/ClothContext";
import { LoginContext } from "../UserLogin/LoginContext";

import styles from "./Header.module.css";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_APP_URL;

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useContext(ClothContext);
  const { user } = useContext(LoginContext);
  const [scrollY, setScrollY] = useState(0);
  const [profileMenu, setProfileMenu] = useState(false);
  const [expanded, setExpanded] = useState(false); // controls mobile menu

  function handleScrollY() {
    setScrollY(window.scrollY);
  }

  function handleNavClick() {
    setExpanded(false); 
  }

  const logout = async (user) => {
    const res = await fetch(`${URL}/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const logoutData = await res.json();
    toast.success(`Logout Successfully, See You Soon`);
    setTimeout(() => {
      localStorage.clear();
      window.location.href = "/login";
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);
    return () => window.removeEventListener("scroll", handleScrollY);
  }, []);

  return (
    <Navbar expand="lg" expanded={expanded} className={styles.HeaderNavbar}>
      <Container className={styles.navContainer}>
        <Navbar.Brand onClick={() => navigate("/")}>
          <h3 className={`${styles.logo} ${styles.navLinks}`}>LinkStyles</h3>
        </Navbar.Brand>

        {/* Cart & Profile always visible — outside collapse */}
        {/* <div className={styles.iconsWrapper}>
          <div
            className={styles.profile}
            
            onClick={() => setProfileMenu((p) => !p)}
          >
            {user?.profilepicture ? (
              <img
                src={user.profilepicture}
                alt=""
                width={28}
                height={28}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <FaUser size={22} color="gray" title="Profile" />
            )}

            {profileMenu && (
              <ul className={styles.profileDropdown}>
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={() => logout(user)}>Logout</li>
              </ul>
            )}
          </div>

          <div className={styles.cart}>
            <FaShoppingCart
              size={22}
              onClick={() => navigate("/product/cart")}
              color="gray"
              title="My Cart"
            />
            {cartCount > 0 && (
              <span className={styles.cartCount}>{cartCount}</span>
            )}
          </div>
        </div> */}

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((e) => !e)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {[
              { label: "Clothing", path: "/clothes" },
              { label: "Phones", path: "/phones" },
              { label: "Shoes", path: "/shoes" },
              { label: "Everyday Style", path: "/householditem" },
              { label: "Premium Collection", path: "/premium" },
              { label: "Summer Essential", path: "/summers" },
            ].map((link) => (
              <li key={link.path} className={styles.li}>
                <a
                  onClick={(e) => {navigate(link.path),
                    handleNavClick(e)
                  }}
                  className={styles.a}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

{
  /* <FaShoppingCart size={24} color="orange" />
<FaUser size={24} color="white" />
<FaBars size={24} /> */
}
