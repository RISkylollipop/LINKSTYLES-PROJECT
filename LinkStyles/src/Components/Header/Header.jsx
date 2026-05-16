import React, { useContext, useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import { FaShoppingCart, FaUser, FaBars } from "react-icons/fa";

import logo from '../../assets/mainlogo.png'




// Declared Global Variable
import { ClothContext } from '../Context/ClothContext';
import { LoginContext } from '../UserLogin/LoginContext';

import DigitalClock from '../DigitalClock/DigitalClock'

import styles from './Header.module.css';
import { toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate();
    const { cartCount } = useContext(ClothContext)
    const { user } = useContext(LoginContext);
    const [scrollY, setScrollY] = useState(0);
    const [profileMenu, setProfileMenu] = useState(false)
    const URL = import.meta.env.VITE_APP_URL


    function handleScrollY() {
        setScrollY(window.scrollY)
    }

    function HandleRegister(user) {
        user === undefined ? navigate(`/register`) : navigate(`/login`)
    }


    const logout = async (user) => {
        const res = await fetch(`${URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const logoutData = await res.json()
        toast.success(`Logout Successfully See You Soon` || logoutData.message)
        setTimeout(() => {
            localStorage.clear()
            window.location.href = '/login'
        }, 5000);
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

                    <Navbar.Brand  onClick={() => navigate(`/`)}>
                        <h3
                            style={{ cursor: 'pointer' }}
                            className={`${styles.logo} ${styles.navLinks}`}> LinkStyles
                            <DigitalClock name={user.first_name} />
                        </h3>
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className={styles.sidebar}>
                        <Nav className="me-auto">

                            <li className={styles.li}>
                                <a  onClick={() => navigate(`/clothes`)} className={styles.a}>Clothing</a>
                            </li>

                            <li className={styles.li}>
                                <a onClick={() => navigate(`/phones`)} className={styles.a}>Phones</a>
                            </li>

                            <li className={styles.li}>
                                <a onClick={() => navigate(`/shoes`)} className={styles.a}>Shoes</a>
                            </li>

                            <li className={styles.li}>
                                <a onClick={() => navigate(`/householditem`)} className={styles.a}>Everyday Style</a>
                            </li>

                            <li className={styles.li}>
                                <a onClick={() => navigate(`/premium`)} className={styles.a}>Premium Collection</a>
                            </li>

                            <li className={styles.li}>
                                <a onClick={() => navigate(`/summers`)} className={styles.a}>Summer Essential</a>
                            </li>


                            <li
                                onMouseEnter={() => setProfileMenu(true)}
                                onMouseLeave={() => setProfileMenu(false)}
                                onClick={() => setProfileMenu(p => !p)}

                                className={`${styles.headerlink} ${styles.navLinks} ${styles.profile} ${styles.li}`}>

                                {user?.profilepicture ? <img
                                    onClick={() => HandleRegister(user)}
                                    src={user.profilepicture} alt="" width={20} height={20} /> : <FaUser onClick={() => HandleRegister(user)} size={24} color="gray"
                                        title='Profile' />}

                                {profileMenu &&

                                    <ul style={
                                        {
                                            listStyle: "none",
                                            padding: 0,
                                            margin: 0,
                                            textAlign: 'left'

                                        }
                                    }>
                                        <li title='Edit Profile'>Profile</li>
                                        <li title='settings'>Setting</li>
                                        <li 
                                        onClick={()=> logout( user )}
                                        title='LogOut'>Logout</li>
                                    </ul>
                                }



                            </li>




                            <li className={`${styles.headerlink} ${styles.navLinks} ${styles.cart} ${styles.li}`}>
                                <FaShoppingCart size={24}
                                    onClick={() => navigate("/product/cart")}
                                    color="gray"
                                    title='My Cart' />

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