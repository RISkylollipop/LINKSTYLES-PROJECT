import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";




// Declared Global Variable
import { ClothContext } from '../Context/ClothContext';
import { LoginContext } from '../UserLogin/LoginContext';

import DigitalClock from '../DigitalClock/DigitalClock'

import styles from './Header.module.css';

function Header() {
    const navigate = useNavigate();
    const { cartCount } = useContext(ClothContext)
    const { user } = useContext(LoginContext);
    const [scrollY, setScrollY] = useState(0);

    function handleScrollY() {
        setScrollY(window.scrollY)
    }

    function HandleRegister(user) {
        user === undefined ? navigate(`/register`) : navigate(`/login`)
    }

    function HandleCountStyle() {
        return {
            color: "#FF8C00",
            marginLeft: "2px",
            padding: "5px 10px",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "center",
            position: "absolute",
            top: "5px",
            right: "-15px"
        }
    }

    useEffect(() => {

        window.addEventListener(`scroll`, handleScrollY)

        return () => {
            window.removeEventListener(`scroll`, handleScrollY)
        }
    }, [])
    function fixhead() {
        return {
            position: 'sticky',
        };
    }

    return (
        <>
            <Navbar expand="lg" className={`${styles.HeaderNavbar} "bg-body-tertiary"`} style={scrollY > 200 ? fixhead() : null}>

                <Container className={styles.navContainer}>

                    <Navbar.Brand href="" onClick={() => navigate(`/`)}>
                        <h3
                            style={{ cursor: 'pointer' }}
                            className={`${styles.logo} ${styles.navLinks}`}>Link Styles
                            <DigitalClock name={user} />
                        </h3>
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={styles.sidebar}>
                        <Nav className="me-auto">

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/clothes`)} className={styles.a}>Clothing</a>
                            </li>

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/phones`)} className={styles.a}>Phones</a>
                            </li>

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/shoes`)} className={styles.a}>Shoes</a>
                            </li>

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/clothes`)} className={styles.a}>EveryDay Style</a>
                            </li>

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/clothes`)} className={styles.a}>Premium Collection</a>
                            </li>

                            <li className={styles.li}>
                                <a href="" onClick={() => navigate(`/clothes`)} className={styles.a}>Summer Essential</a>
                            </li>

                            <li onClick={() => HandleRegister(user)}
                                className={`${styles.headerlink} ${styles.navLinks} ${styles.profile} ${styles.li}`}>
                                
                                   <FaUser size={24} color="gray" 
                                   title='Profile'/>
                                    
                                


                               
                            </li>


                            <li className={`${styles.headerlink} ${styles.navLinks} ${styles.cart} ${styles.li}`}>
                                <FaShoppingCart size={24} 
                                onClick={() => navigate("product/cart")}
                                color="gray" 
                                title='My Cart'/>
                                
                                <span

                                    style={HandleCountStyle()}>{cartCount}</span>
                            </li>

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>

        </>
    );
}

export default Header;




{/* <FaShoppingCart size={24} color="orange" />
<FaUser size={24} color="white" />
<FaBars size={24} /> */}