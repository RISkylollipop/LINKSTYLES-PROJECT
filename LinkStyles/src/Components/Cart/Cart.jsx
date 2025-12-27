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
            <h2 className={styles.h2}>Your Cart</h2>
            <h3 className={styles.h2} >You have <p
                style={{
                    backgroundColor: "grey",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "50%",
                    fontSize: "14px",
                    fontWeight: "bold",
                    minWidth: "24px",
                    textAlign: "center",
                    display: "inline-block"
                }}
            >{cartCount}</p>{cartCount > 1 ? " Items in your Cart" : " Item in your Cart"} </h3>


            {cart.length === 0 ? (
                <p className={styles.p}>Your cart is empty.</p>
            ) : (
                <ul className={styles.list}>
                    {cart.map((item, index) => (

                        <>
                            <li key={item.product_id ?? `cart-item-${index + 1}`} className={styles.cartItem}>

                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <img
                                        style={{ marginRight: "10px", marginBottom: "20px" }}
                                        src={item.image1} alt={item.productName} width="250" />
                                </div>

                                <div
                                    style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                                >
                                    <h4 className={styles.h4}>{item.productName || item.productName}</h4>
                                    <p className={styles.p}>Price:{symbol} {new Intl.NumberFormat("en-US").format(item.price)}</p>

                                    <h5 style={{ fontSize: "20px", fontWeight: "800" }}>
                                        Total Price : {item.price * item.quantity}
                                    </h5>
                                </div>
                                &nbsp;
                                <div className={styles.quantityControls}>
                                    <button className={styles.quantityBtn} onClick={() => removeQuantity(item.product_id)}>-</button>
                                    <span className={styles.quantityDisplay}>{item.quantity}</span>
                                    <button className={styles.quantityBtn} onClick={() => addQuantity(item.product_id)}>+</button>
                                    <br />

                                </div>

                                <button className={styles.cartBtn} onClick={() => removeFromCart(item.product_id)}>Remove</button>


                            </li>
                        </>

                    ))}
                </ul>
            )}

            <h3 className={styles.h3}

                style={cart.length > 0 ? { display: "block", } : { display: "none" }}

            >Total: {symbol} {new Intl.NumberFormat("en-US").format((totalCartPrice).toFixed(2))}</h3>



            <button
                style={cart.length > 0 ? {
                    display: "block", position: "absolute", color: "white", backgroundColor: "green", right: "20px"
                }

                    : { display: "none" }}

                onClick={handlePayment}>Proceed to Pay</button>
        </div>
    );
}

export default Cart;