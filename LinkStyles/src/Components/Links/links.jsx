import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClothContext } from '../Context/ClothContext';
import { LoginContext } from "../UserLogin/LoginContext";


import styles from './links.module.css'
import './digitalClock.css' /* to override digital clock parent css*/

import profile from './public/profile.jpg'
import image1 from './public/image1.png'
import image2 from './public/imagee.png'
import image3 from './public/image2.png'
import image4 from './public/image4.png'
import image5 from './public/image5.png'
import image6 from './public/image6.png'

import arrowIcon from './public/arrow.png'
import arrowIcon2 from './public/up-arrow.png'


function Links() {
    const navigate = useNavigate()
    const { user, setUser, isVerify } = useContext(LoginContext);
    const [menu, setMenu] = useState(true)
    const [catalogMenu, setCatalogMenu] = useState(false)
    const [customerMenu, setCustomerMenu] = useState(false)
    const [orderMenu, setOrderMenu] = useState(false)
    const [inboxMenu, setInboxMenu] = useState(false)
    const [filemanagerMenu, setFilemanagerMenu] = useState(false)



    const [adminMail, setAdminMail] = useState("");
    const [produceProductCount, setProduceProductCount] = useState(null);
    const [userCount, setUserCount] = useState(null);

    const URL = import.meta.env.VITE_APP_URL;

    isVerify()


    const states = [
        { name: "Lagos", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        { name: "Abuja", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        { name: "Enugu", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        { name: "Kano", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        { name: "Ekiti", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        { name: "Kwara", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Rivers", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Kaduna", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Oyo", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Osun", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Ondo", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Delta", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Cross River", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Akwa Ibom", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Bayelsa", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Edo", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Plateau", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Nasarawa", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Taraba", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Adamawa", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Yobe", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Borno", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Gombe", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Bauchi", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Jigawa", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Kebbi", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Sokoto", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Zamfara", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Niger", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Katsina", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Kogi", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Benue", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Imo", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Anambra", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Ebonyi", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
        // { name: "Abia", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
    ];


    const Countries = [
        { name: "Qatar", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        { name: "Ecuador", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        { name: "Senegal", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        { name: "Netherlands", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        { name: "England", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        { name: "Iran", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "United States", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Wales", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Argentina", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Saudi Arabia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Mexico", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Poland", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "France", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Australia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Denmark", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Tunisia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Spain", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Germany", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Japan", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Costa Rica", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Belgium", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Canada", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Morocco", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Croatia", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Brazil", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Serbia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Switzerland", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Cameroon", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Portugal", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Uruguay", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "South Korea", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Ghana", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Italy", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Greece", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Thailand", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Turkey", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Malaysia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Indonesia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Philippines", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Vietnam", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "China", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "India", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Russia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "South Africa", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Egypt", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Kenya", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Singapore", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Hong Kong", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "New Zealand", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Pakistan", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
        // { name: "Bangladesh", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
    ];



    useEffect(() => {
        fetch(`${URL}/api/v1/getusers`)
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("usercounts", JSON.stringify(data));
                setUserCount(data.length);
            })
            .catch((err) => console.error(err));

        const productLength = localStorage.getItem("productlength");
        setProduceProductCount(productLength);

        const userDetail = localStorage.getItem("data");
        if (userDetail) {
            setUser(JSON.parse(userDetail));
        }
    }, [setUser]);

    useEffect(() => {
        if (user?.role_name) {
            setAdminMail(user.role_name.toUpperCase());
        }
    }, [user]);



    const now = new Date();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();
    const currentMonth = now.toLocaleString("default", { month: "long" });
    const weekday = now.toLocaleString("default", { weekday: "long" });


    return (

        <>
            <div className={styles.bodyContainer}> {/* the main Dashboard with sub dashboard and navbar*/}

                <div className={styles.subBodyContainer}>
                    <div className={styles.navbar}> {/*The Side Navbar for the Navigation to different pages*/}
                        <h3 className={`${styles.logo} ${styles.navLinks}`}>Link Styles</h3>
                        <div className={styles.navbar}>
                            <h3
                                onClick={() => setMenu(!menu)}
                                className={styles.menuStyle}
                            >
                                Menu
                            </h3>

                            <nav className={menu ? styles.open : styles.close}>
                                <ul >
                                    <li onClick={() => {
                                        setCatalogMenu(!catalogMenu),
                                            setCustomerMenu(false),
                                            setFilemanagerMenu(false),
                                            setInboxMenu(false)
                                        setOrderMenu(false)


                                    }}>
                                        Catalog {catalogMenu ? "✖️" : "➡️"}
                                        <ul className={`${catalogMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
                                            <li>Product List</li>
                                            <li>Product</li>
                                            <li>Categories list</li>
                                            <li>Category</li>
                                        </ul>
                                    </li>

                                    <li onClick={() => {
                                        setCustomerMenu(!customerMenu),
                                            setCatalogMenu(false),
                                            setFilemanagerMenu(false),
                                            setInboxMenu(false),
                                            setOrderMenu(false)



                                    }}>
                                        Customers {customerMenu ? "✖️" : "➡️"}
                                        <ul className={`${customerMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
                                            <li>Customer List
                                                &nbsp;  <small style={{ color: "green" }}>{produceProductCount}</small> {/*TO be Adjusted later*/}
                                            </li>
                                            <li>Customers

                                            </li>
                                            <li>Partners
                                                &nbsp;  <small style={{ color: "green" }}>{userCount}</small> {/*TO be Adjusted later*/}
                                            </li>

                                        </ul>
                                    </li>
                                    <li onClick={() => {
                                        setOrderMenu(!orderMenu),
                                            setCustomerMenu(false),
                                            setCatalogMenu(false),
                                            setFilemanagerMenu(false),
                                            setInboxMenu(false)


                                    }

                                    }>
                                        Order {orderMenu ? "✖️" : "➡️"}
                                        <ul className={`${orderMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
                                            <li>Order List
                                                &nbsp;   <small style={{ color: "green" }}>7846</small>
                                            </li>
                                            <li>Pending Orders
                                                &nbsp; <small style={{ color: "green" }}>58</small>
                                            </li>
                                            <li>Completed ✅
                                                <small style={{ color: "green", }}>7486</small>
                                            </li>
                                            <li>Cancelled
                                                &nbsp; <small style={{ color: "red" }}>320</small></li>
                                            <li>Orders Detail</li>
                                        </ul>
                                    </li>


                                    <li onClick={() => {
                                        setInboxMenu(!inboxMenu),
                                            setOrderMenu(false),
                                            setCustomerMenu(false),
                                            setCatalogMenu(false),
                                            setFilemanagerMenu(false)


                                    }

                                    }>
                                        Inbox {inboxMenu ? "✖️" : "➡️"}
                                        <ul className={`${inboxMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
                                            <li>Notification
                                                &nbsp;  <small style={{ color: "green" }}>12</small>
                                            </li>
                                            <li>Pending Message
                                                &nbsp;   <small style={{ color: "green" }}>2</small>
                                            </li>

                                        </ul>
                                    </li>

                                    <li onClick={() => {
                                        setFilemanagerMenu(!filemanagerMenu),
                                            setInboxMenu(false),
                                            setOrderMenu(false),
                                            setCustomerMenu(false),
                                            setCatalogMenu(false)
                                    }
                                    }>
                                        File Manager {filemanagerMenu ? "✖️" : "➡️"}
                                        <ul className={`${filemanagerMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
                                            <li onClick={() => navigate(`/link/admin/addproduct`)}>Add Product</li>
                                            <li>Remove Product</li>
                                            <li>Edit Product</li>
                                            <li>Create New Category</li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className={styles.moreSetting}>
                            Settings
                        </div>
                    </div>

                    <div className={styles.mainDashboard}>


                        <div className={styles.headerDiv1}> {/* the header horizontal navbar*/}
                            <div className={styles.headerMenu}>
                                <li>Home</li> <b></b> <li>Store</li> <b></b> <li>Private</li>

                            </div>

                            <div style={{ width: "200px", height: "60px" }}>

                                <img src={image1} width="100%" height="100%" alt="" />
                            </div>
                            <div style={{ width: "200px", height: "60px" }}>

                                <img src={image2} width="100%" height="100%" alt="" />
                            </div>
                            <div style={{ width: "200px", height: "60px" }}>

                                <img src={image1} width="100%" height="100%" alt="" />
                            </div>

                            {user ?

                                <div className={styles.profileClockContainer}>


                                    <h5 >
                                        🗓️ {currentDay} {weekday} {currentMonth}, {currentYear}
                                    </h5>
                                    &nbsp; <img src={user.profilepicture} width="100px" height="auto"
                                        style={{ borderRadius: "50%" }}
                                        alt="" />

                                    <div className={styles.admindetail}>
                                        <h5>{user ? <>{user.first_name}.{user.middle_name}</> : "Yunus Oluwadamilare"}</h5>
                                        <h5 >{adminMail}</h5>

                                    </div>


                                </div>

                                :

                                <div className={styles.profileClockContainer}>


                                    <h5 >
                                        🗓️ {currentDay} {weekday} {currentMonth}, {currentYear}
                                    </h5>
                                    &nbsp; <img src={profile} width="100px" height="auto"
                                        style={{ borderRadius: "50%" }}
                                        alt="" />

                                    <div className={styles.admindetail}>
                                        <h5>Yunus Oluwadamilare</h5>
                                        <h5>Acting Manager</h5>

                                    </div>


                                </div>
                            }

                        </div>




                        <hr />


                        <div className={styles.headerDiv2}> {/* for no of users, store overview and refresh botton on the website*/}


                            <div className={styles.card}>
                                <div className={styles.cardbody}>
                                    <img src={image1} alt="" /> &nbsp; <b>Orders Provided</b>
                                </div>

                                <hr />

                                <div className={styles.cardDetail}>
                                    <div>
                                        <h3>210</h3> <p>Processing</p>
                                    </div>
                                    <div>
                                        <h3>174</h3> <p>Processed</p>
                                    </div>
                                </div>
                            </div>


                            <div className={styles.card}>
                                <div className={styles.cardbody}>
                                    <img

                                        src={image1} alt="" /> &nbsp; <b>Store Products</b>
                                </div>

                                <hr />

                                <div className={styles.cardDetail}>
                                    <div>
                                        <h3>{produceProductCount}k</h3> <p>Total</p>
                                    </div>
                                    <div>
                                        <h3>1654</h3> <p>Sold Out</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardbody}>
                                    <img src={image1} alt="" /> &nbsp; <b>Orders Imported</b>
                                </div>

                                <hr />

                                <div className={styles.cardDetail}>
                                    <div>
                                        <h3>439</h3> <p>New</p>
                                    </div>
                                    <div>
                                        <h3>174</h3> <p>Total</p>
                                    </div>
                                </div>
                            </div>


                            <div className={styles.card}>
                                <div className={styles.cardbody}>
                                    <img src={image1} alt="" /> &nbsp; <b>Orders Dispatched</b>
                                </div>

                                <hr />

                                <div className={styles.cardDetail}>
                                    <div>
                                        <h3>734</h3> <p>Total</p>
                                    </div>
                                    <div>
                                        <h3>31</h3><p>Returned</p>
                                    </div>
                                </div>
                            </div>


                        </div>



                        <hr />
                        <div className={styles.headerDiv3}>


                            <div

                                className={styles.EachSubHeaderCard}>

                                <div
                                    className={styles.cardTitle}>
                                    <h3>Sales by States</h3> <h5 style={{ textDecoration: "underline" }}>View All</h5>
                                </div>
                                <hr />

                                <div className={styles.cardcontainer}>

                                    {states && states.map((state, i) =>

                                    (
                                        <div key={i} className={styles.card}>
                                            <div className={styles.cardbody}>
                                                <img src={state.image} alt={state.name + `logo`} />
                                                <h5>{state.name}</h5>
                                                <h5>{state.salesUnit} &nbsp; <small>Products</small></h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </div>

                            <div className={styles.EachSubHeaderCard}>
                                <div
                                    className={styles.cardTitle}>
                                    <h3>Sales by Country</h3> <h5 style={{ textDecoration: "underline" }}>View All</h5>
                                </div>

                                <hr />

                                <div className={styles.cardcontainer}>

                                    {Countries && Countries.map((country, i) =>

                                    (
                                        <div key={i} className={styles.card}>
                                            <div className={styles.cardbody}>
                                                <img src={country.image} alt="" />
                                                <h5>{country.name}</h5>
                                                <h5>{country.salesUnit} &nbsp; <small>Products</small></h5>
                                            </div>
                                        </div>
                                    ))}

                                </div>


                            </div>




                        </div>
                        <div className={styles.headerDiv4}> {/* for no of users, store overview and refresh botton on the website*/}

                            <div className={styles.EachSubHeaderCard}>

                            </div>

                            <div className={styles.EachSubHeaderCard}>

                            </div>

                        </div>
                        <div className={styles.headerDiv5}> {/* for no of users, store overview and refresh botton on the website*/}

                            <div className={styles.EachSubHeaderCard}>

                            </div>

                            <div className={styles.EachSubHeaderCard}>

                            </div>
                            <div className={styles.EachSubHeaderCard}>

                            </div>

                            <div className={styles.EachSubHeaderCard}>

                            </div>
                        </div>





                    </div>
                </div>

            </div>

        </>

    )
}

export default Links