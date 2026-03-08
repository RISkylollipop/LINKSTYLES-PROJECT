import React, { useContext, useMemo } from "react";
import { ClothContext } from "../Context/ClothContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'


import styles from './Cart.module.css'


function Cart() {

    
    const navigate = useNavigate();
    const { cart, cartCount, removeFromCart, addQuantity, removeQuantity, symbol, totalCartPrice } = useContext(ClothContext);



    function handlePayment() {
        
        navigate(`/payment`)
    }

    return (
        <div className={styles.cartContainer}>
            {/* <ToastContainer position="top-center"/> */}
            <div className={styles.cardHead}>

                <h2 >Your Cart</h2>
                <h3 >You have <p>{cartCount}</p>{cartCount > 1 ? " Items in your Cart" : " Item in your Cart"} </h3>

            </div>
            <hr />
            {cart.length === 0 ? (
                <p className={styles.cardHead}>Your cart is empty.</p>
            ) : (
                <ul className={styles.list}>
                    {cart.map((item) => {
                        const totalPrice = item.price * item.quantity;

                        return (
                            <li
                                key={item.product_id}
                                className={styles.cartItem}
                            >
                                {/* Image */}
                                <div
                                    className={styles.cartCard}>
                                    <img
                                        src={item.image1}
                                        alt={item.productName}
                                    />
                                </div>


                                <div className={styles.cartCardBody}>

                                    <h4>{item.productName}</h4>

                                    <p>
                                        Price: {symbol}{""}
                                        {new Intl.NumberFormat("en-NG", {style: "currency", currency: "NGN"}).format(item.price)}
                                    </p>

                                    <p>
                                        Total Price: {symbol}{""}
                                        {new Intl.NumberFormat("en-NG", {style: "currency", currency: "NGN"}).format(totalPrice)}
                                    </p>
                                </div>


                                <div className={styles.quantityControls}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => removeQuantity(item.product_id)}
                                    >
                                        -
                                    </button>

                                    <span className={styles.quantityDisplay}>
                                        {item.quantity}
                                    </span>

                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => addQuantity(item.product_id)}
                                    >
                                        +
                                    </button>
                                </div>


                                <button
                                    className={styles.cartBtn}
                                    onClick={() => removeFromCart(item.product_id)}
                                >
                                    Remove
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className={styles.cardPaySec}>

                <h3 style={cart.length > 0
                    ? { display: "block", }
                    : { display: "none" }}

                >Total: {symbol}{new Intl.NumberFormat("en-NG", { style : "currency", currency: "NGN"}).format((totalCartPrice).toFixed(2))}
                </h3>

                <button
                    style={cart.length > 0
                        ? { display: "block" }
                        : { display: "none" }}
                    onClick={handlePayment}>Proceed To Checkout
                </button>
            </div>





        </div>
    );
}

export default Cart;