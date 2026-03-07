import React, { useState, useContext, useEffect, Fragment } from 'react';
import styles from './Payment.module.css';
import { ClothContext } from '../Context/ClothContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useRef } from "react";


import bankTransfergif from './public/BankTransfer.gif'
import Network from './public/Network.gif'

import monnifyLogo from './public/image1.png'
import OpayLogo from './public/image.png'

const Payment = () => {

  // let minuteWants * 60 secs // Minute Want to set for Account to expire
  const [timeLeft, setTimeLeft] = useState(600);


  // Count Down Timer 
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate(`/product/cart`);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);

          return 0;
        }
        return t - 1
      });
    }, 1000);

    return () => clearInterval(timer)

  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const displaySeconds = seconds.toString().padStart(2, "0")




  const URL = `https://linkstyles-project-production.up.railway.app`
  const navigate = useNavigate();
  const { cart, cartCount, symbol, totalCartPrice } = useContext(ClothContext);
  const [paymenttype, setPaymenttype] = useState('Card Payment');
  const [checkoutloading, setCheckoutloading] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [opayData, setOpayData] = useState({});
  const [transactionReference, setTransactionReference] = useState(null); // Tracking transaction ref
  const [buttonClick, setButtonClick] = useState(false)
  const [manualConfirmation, setManualConfirmation] = useState(false)
  const [cancelPayment, setCancelPayment] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    deliveryNote: '',
  });


  const handleAuthError = (errormessage) => {
    toast.error(errormessage);
    setTimeout(() => navigate(`/login`), 6000);
  }

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const CartTotal = new Intl.NumberFormat("en-US").format(totalCartPrice.toFixed(2));
  const TotalCart = totalCartPrice.toFixed(2);

  const amount = new Intl.NumberFormat("en-US").format(cart.totalCartPrice)
  const accountNumber = 9090124745

  // Country Api Calling
  useEffect(() => {
    setCheckoutloading(true);
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then(res => res.json())
      .then(data => {
        setCountries(data.data);
        setCheckoutloading(false);
      })
      .catch(err => {
        console.error("Error fetching countries:", err);
        setCheckoutloading(false);
      });
  }, []);

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setFormData({ ...formData, country: selected, state: '' });

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selected })
    })
      .then(res => res.json())
      .then(data => setStates(data.data.states || []))
      .catch(err => console.error("Error fetching states:", err));
  };

  // Submit button for home delivery detail confirmation


  const handleSubmit = async (e) => {
    const token = localStorage.getItem(`token`)

    setButtonClick(true)
    e.preventDefault();

    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      toast.warning('Please enter a valid 11-digit phone number.');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }

    if (!token || token === "") {
      toast(`Please Login To proceed`)
      setTimeout(() => {
        setButtonClick(false)
        navigate(`/register`)
      }, 6000);
      return
    }

    const filterCartGoods = cart.map((item) => (
      {
        goodsName: item.productName,
        goodsImage: item.image1,
        goodsPrice: item.price,
        goodsQuantity: item.quantity,
      }
    ))

    const filterCartAndPayload = {
      Items: filterCartGoods,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      streetAddress: formData.email,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      deliveryNote: formData.deliveryNote,
      paymentMode: "Payment On Delivery"

    }
    console.log(filterCartAndPayload);
    try {

      const response = await fetch(`${URL}/deliverydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(filterCartAndPayload),
      })

      if (!response.ok) {
        // console.log(`main response`, response);
        const data = await response.json()
        // console.log(`Response json Data: `, data.error);
        const tokenErrors = ['no access', 'session expired', 'invalid token'];
        if (data.error && tokenErrors.some(err => data.error.toLowerCase().includes(err))) {
          handleAuthError(data.error)
          return;
        }

        return
      }
      const data = await response.json()
      const deliveryCheckError = ["register"]

      if (data.error && deliveryCheckError.some(err => data.error.toLowerCase().includes(err))) {
        toast.error(data.error)
        setButtonClick(false)
        navigate(`/register`)
        return
      }
      else {
        if (data.message && data.message.toLowerCase().includes(`delivery detail sent to company`)) {
          setTimeout(() => {

            toast.success(`Cart and Delivery details has been sent to your Registered Email`)
            localStorage.removeItem('cart')

          }, 2500);
        }
      }
    } catch (error) {
      console.log(error);

    } finally {
      setButtonClick(false)
    }


  };

  // Proceed to payment button to initialize and generate account number



  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const payload = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      amount: Number(TotalCart),
    };

    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      toast.warning("Please enter a valid 11-digit phone number.");
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning("Please enter a valid email address.");
      return;
    }
    const token = localStorage.getItem(`token`)

    if (!token || token === "") {
      toast(`Please Login To proceed`)
      setTimeout(() => {
        setButtonClick(false)
        navigate(`/register`)
      }, 6000);
      return
    }

    try {



      const filterCartGoods = cart.map((item) => (
        {
          goodsName: item.productName,
          goodsImage: item.image1,
          goodsPrice: item.price,
          goodsQuantity: item.quantity,
        }
      ))
      const filterCartAndPayload = {
        Items: filterCartGoods,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        streetAddress: formData.email,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        deliveryNote: formData.deliveryNote,
        paymentMode: "Monnify Checkout"

      }

      // Send delivery details and validate it

      const deliveryRes = await fetch(`${URL}/deliverydetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(filterCartAndPayload),
      });


      if (!deliveryRes.ok) {
        const data = await deliveryRes.json()
        const tokenErrors = ["expired", "no access", "invalid token"]
        if (data.error && tokenErrors.some(err => data.error.toLowerCase().includes(err))) {
          handleAuthError(data.error)
          return
        }
        return
      }
      else {
        const data = await deliveryRes.json()
        const deliveryCheckError = ["register"]

        if (data.error && deliveryCheckError.some(err => data.error.toLowerCase().includes(err))) {
          toast.error(data.error)
          navigate(`/register`)
          //  Check and Update Profile Logic that i want to use will come later here
          return
        }
        else {
          if (data.message && data.message.toLowerCase().includes(`delivery detail sent to company`)) {
            toast.success(`Delivery Detail saved and cart processed for Payment`)
            setShowPaymentCard(true);
            setCheckoutloading(true);

            // Initialization of transaction started if delivery detail 
            // is sent successfully and after showing Payment Card

            const initRes = await fetch(`${URL}/api/v1/init-transaction`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const initData = await initRes.json();

            if (initData.status !== "success") {
              toast.error("Failed to initialize transaction.");
              return;
            }

            toast.success("Account generated successfully");


            const transactionRef = initData.transactionReference;
            setTransactionReference(transactionRef);


            // Preparing details to be sent to generate payment account details

            const filtercart = cart.map((item) => ({
              goodsName: item.productName,
              goodsImage: item.image1,
              goodsPrice: item.price,
              goodsQuantity: item.quantity,
            }));

            const payloadCartRef = {
              customerName: formData.fullName,
              customerEmail: formData.email,
              amount: Number(TotalCart),
              CartItem: filtercart,
              transactionReference: transactionRef,
            };


            // Generate virtual account
            const genAccountRes = await fetch(`${URL}/api/generate-account`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payloadCartRef),
            });

            const accountData = await genAccountRes.json();

            if (accountData.status === "success") {
              console.log(`Account Daata`, accountData);

              setOpayData({
                bank: accountData.mainData.bankName,
                account: accountData.accountNumber,
                name: accountData.accountName,
                email: accountData.customerEmail,
                mainaccountName: accountData.mainData.accountName,
                status: accountData.mainData.status,
                amount: new Intl.NumberFormat("en-US").format(accountData.mainData.totalPayable)

              });

            } else {
              toast.error("Failed to generate virtual account.");
            }
          }
          // return
        }

      }

    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error("Something went wrong while processing payment.");
    } finally {
      setCheckoutloading(false);
    }
  };



  const intervalRef = useRef(null);

  useEffect(() => {

    console.log(`InterVal Ref: ${intervalRef.current}`);

  }, [intervalRef.current])

  const getPaymentStatus = async () => {
    const res = await fetch(
      `${URL}/payment/status/${transactionReference}`
    );
    return res.json();
  };



  const handlePaymentResponse = async (data) => {
    if (data.status === "PAID") {
      toast.success(data.success || "✅ Payment confirmed!");
      setPaymentConfirmed(true);
      localStorage.removeItem("cart");

      clearInterval(intervalRef.current);
      intervalRef.current = null;

      navigate("/");
      return;
    }

    if (data.status === "PENDING") {
      return;
    }

    if (data.status === "FAILED") {
      toast.error("Payment failed");
    }
  };




  useEffect(() => {
    if (!transactionReference || !opayData) return;

    const startTime = Date.now();

    intervalRef.current = setInterval(async () => {
      try {
        const data = await getPaymentStatus();
        console.log("Payment status:", data.status);

        await handlePaymentResponse(data);

        // ⏱ auto-expire after 10 minutes
        if (
          Date.now() - startTime >= 600000 &&
          data.status === "PENDING"
        ) {
          await fetch(
            `${URL}/api/v1/paymentDelayUpdate/${transactionReference}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );

          clearInterval(intervalRef.current);
          intervalRef.current = null;

          toast.error("Payment session expired");
          navigate("/product/cart");
        }
      } catch (err) {
        console.error("Payment polling error:", err);
      }
    }, 5000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [transactionReference, opayData]);



  const handleConfirmation = async () => {
    if (!transactionReference) return;

    setManualConfirmation(true);
    setButtonClick(true);

    const data = await getPaymentStatus();
    await handlePaymentResponse(data);

    if (data.status === "PENDING") {
      setTimeout(() => {
        
        toast.info("Payment not yet received");
        setManualConfirmation(false);
        setButtonClick(false);

      }, 5000);
    }
  };


  const handleCancelPayment = async () => {
    if (!transactionReference) return;

    const data = await getPaymentStatus();

    if (data.status === "PENDING") {
      await fetch(
        `${URL}/api/v1/paymentDelayUpdate/${transactionReference}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      clearInterval(intervalRef.current);
      intervalRef.current = null;

      toast.warning("Transaction cancelled");
      setTimeout(() => {
        navigate("/product/cart");
        return;

      }, 5000);

      return;
    }

    toast.info(data.status);
  };


  // useEffect(() => {

  //   if (!opayData || !transactionReference) return;
  //   const startTime = Date.now();
  //   const interval = setInterval(() => {
  //     fetch(`${URL}/payment/status/${transactionReference}`)
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log("Payment status:", data.status);
  //         if (data.status === "PAID") {
  //           toast.success(data.success || "✅ Payment confirmed!");
  //           setPaymentConfirmed(true)
  //           localStorage.removeItem("cart");
  //           navigate(`/clothes`)
  //           clearInterval(interval);
  //         }
  //         else if (Date.now() - startTime >= 1000000 && data.status === "PENDING") {
  //           // Stop checking after 100s if still pending
  //           fetch(`${URL}/api/v1/paymentDelayUpdate/${transactionReference}`, {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify(data)
  //           })
  //             .then((res) => res.json())
  //             .then((data) => {
  //               if (data.message) {
  //                 toast.error(data.message)
  //                 clearInterval(interval);
  //                 navigate(`/product/cart`);
  //               }
  //               else {
  //                 clearInterval(interval);
  //                 navigate(`/product/cart`);
  //               }
  //             })

  //         }
  //       })
  //       .catch(err => console.error("Error checking payment:", err));
  //   }, 5000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [transactionReference, opayData])




  // const handleConfirmation = async () => {
  //   if (!opayData || !transactionReference) { return; }
  //   const dataRes = await getPaymentStatus()

  //   const data = await dataRes.json()
  //   if (data.status === "PAID") {
  //     toast.success(data.success || "✅ Payment confirmed!");
  //     setPaymentConfirmed(true)
  //     localStorage.removeItem("cart");
  //     navigate(`/`)

  //   } else {
  //     setTimeout(() => {
  //       if (data.status === "PENDING") {
  //         setButtonClick(false)
  //         setManualConfirmation(false)

  //       }
  //     }, 5000);
  //   }
  //   setButtonClick(true)
  //   setManualConfirmation(true)
  // };

  // const handleCancelPayment = async () => {
  //   if (!opayData || !transactionReference) { return; }
  //   const dataRes = await getPaymentStatus()

  //   const data = await dataRes.json()

  //   if (data.status === "PENDING") {
  //     const delayData = await fetch(`${URL}/api/v1/paymentDelayUpdate/${transactionReference}`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data)
  //     })
  //     const delayUpdateData = await delayData.json()
  //     if (delayUpdateData.message) {

  //       toast.warning(`Transaction Cancelled Successfully Please Start a new payment`)
  //       return;
  //     }
  //     toast.error(`No Update From Payment Response from Finance Team`)
  //     return;
  //   }
  //   toast.info(data.status)
  // }



  return (
    <Fragment>
      {checkoutloading ? (
        <div className={styles.loading}>Loading...</div>
      ) : showPaymentCard ? (
        <>

          <ToastContainer position='bottom-center' newestOnTop autoClose={1000} />

          <div className={styles.paymentCard}>
            {opayData &&

              <>
                <div className={styles.section1}>
                  <h4> 🏦 Pay with Transfer</h4>
                </div>
                <div className={styles.section2}>
                  <div>
                    <img src={opayData ? monnifyLogo : OpayLogo} alt="" width="40px" height="40px" />
                  </div>
                  {!paymentConfirmed
                    ?
                    <img src={Network} width={200} height={80} alt="" />
                    : <><h4>Payment successfully Confirmed, Thank You</h4></>
                  }


                  <div>
                    {opayData ? <p>{opayData.email}</p> : <p>guest@gmail.com</p>}
                    <p style={{ color: "green" }}>Pay NGN {opayData.amount}</p>
                  </div>
                </div>
                <div className={styles.container}>

                  <div className={styles.paymentDetailsCard}>
                    <h4 > Transfer NGN {opayData.amount} {opayData ? `to ${opayData.mainaccountName}` : "to the Account Below"} </h4>
                    <small>Account Name</small>
                    <h4>{opayData?.name}</h4>

                    <div className={styles.paymentCardBody}>
                      <small>Bank Name</small>
                      <h4>{opayData ? opayData.bank : "Opay/Paycom"}</h4>

                      <div className={styles.accountNumber}>

                        <div className={styles.accountNumberBody}>
                          <small>Account Number</small>
                          <h4>{opayData ? opayData.account : accountNumber}</h4>
                        </div>


                        <div
                          onClick={() => {
                            navigator.clipboard.writeText(opayData?.account);
                            toast.success(`Account Number ${opayData?.account} Copied`)
                          }}
                          style={{ cursor: "pointer", fontSize: "10px", textDecoration: "lowercase" }}
                        >⧉ Copy</div>
                      </div>
                      <div className={styles.amount}>
                        <div className={styles.amountBody}>

                          <small>Amount</small>
                          <h4>{symbol} {opayData.amount}</h4>
                        </div>
                        <div
                          style={{ cursor: "pointer", fontSize: "10px" }}
                          onClick={() => {
                            navigator.clipboard.writeText(opayData.amount);
                            toast.success(`${opayData.amount} Copied`)
                          }}
                        >⧉ Copy</div>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <small>This account is for this transaction only and expires in {minutes}:{displaySeconds}</small>

                  <hr />
                  <div className={styles.buttonSection}>

                    <button
                      onClick={() => setCancelPayment(true)}
                      className={styles.backbutton}> X Cancel Payment</button>

                    {cancelPayment && (

                      <div
                        className={styles.cancelPayment}
                      // style={{ display: cancelPayment ? 'block' : 'none' }}
                      >
                        <h3>Are You Sure, You want cancel Transaction</h3>
                        <div className={styles.cancelPayBtn}>
                          <button
                            onClick={handleCancelPayment}
                          >Yes, Cancel</button>
                          <button
                            onClick={() => setCancelPayment(false)}
                          >No Go Back</button>
                        </div>
                      </div>
                    )}

                    <p>{manualConfirmation ? "Confirming Payment..." : ""}</p>
                    <button
                      onClick={handleConfirmation}
                      disabled={buttonClick}>I've Made the payment</button>
                  </div>
                </div>


              </>}



          </div>
        </>
      ) : (
        <div className={styles.paymentContainer}>

          <div className={styles.PaymentCargo1}
            style={{ textAlign: "center" }}>
            <select
              className={styles.selectBox}
              onChange={(e) => setPaymenttype(e.target.value)}
              value={paymenttype}
            >

              <option value="Card Payment">Card Payment</option>
              <option value="Virtual Transfer">Transfer</option>
              <option value="Payment On Delivery">Payment On Delivery</option>
            </select>

            {paymenttype === "Card Payment" && <div className={styles.paymentMessage}><p >Not Available Now</p></div>}
            {paymenttype === "Payment On Delivery" && (

              <div className={styles.paymentMessage}>
                <p >
                  Goods in the Cart will be delivered to{" "}
                  {formData.streetAddress && formData.city && formData.state && formData.country
                    ? `${formData.streetAddress}, ${formData.city}, ${formData.state}, ${formData.country}`
                    : "Address Provided"}
                </p>
              </div>
            )}
          </div>
          <div className={styles.PaymentCargo2}>
            <form className={styles.PaymentForm} onSubmit={handleSubmit}>
              <h3>Input Your Details and Delivery Address</h3>
              <div className={styles.formGrp}>
                <input type="text" name="fullName" placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>
              <div>
                <input type="tel" name="phoneNumber" placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
              <div>
                <input type="email" name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <input type="text" name="streetAddress" placeholder="Street Address"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  required
                />
              </div>
              <div>
                <input type="text" name="city" placeholder="City / Town"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div>

              </div>
              <select name="country" value={formData.country} onChange={handleCountryChange} required>
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country.name}>{country.name}</option>
                ))}
              </select>
              {states.length > 0 && (
                <select name="state" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} required>
                  <option value="">Select State / Region</option>
                  {states.map((state, idx) => (
                    <option key={idx} value={state.name}>{state.name}</option>
                  ))}
                </select>
              )}

              <textarea name="deliveryNote" placeholder="Additional Delivery Notes (optional)" value={formData.deliveryNote} onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })} />

              {paymenttype === "Payment On Delivery" && (
                <button disabled={buttonClick} type="submit">{buttonClick ? "Confirming Address ..." : "Confirm Address"}</button>
              )}
            </form>
          </div>

          <div className={styles.PaymentCargo3}>
            {cartCount > 0 && (
              <div className={styles.cardSummary}>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <div className={styles.cartItemsTable}>
                    {cart.map((item, index) => (

                      <div key={index} className={styles.cardTable}>
                        <div className={styles.cardTableBody}>
                          <div className={styles.sections}>
                            <h3>Item Name: <span>{item.productName}</span></h3> <img src={item.image1} alt={item.productName} width={80} />
                          </div>
                          <div className={styles.sections}>
                            <span><b>Quantity:</b></span> <span><b>{item.quantity}</b></span> <span><b>{symbol} {item.price}</b></span>
                          </div>
                          <br />
                          <div className={styles.sections}>
                            <span><b>Total Price:</b></span> <span><b>{symbol} {(item.price * item.quantity).toFixed(2)}</b></span>
                          </div>

                        </div>
                      </div>

                    ))}


                  </div>
                )}
                <div className={styles.total}>
                  <p>Total: <span>{symbol} {CartTotal}</span></p>
                </div>

                {paymenttype === "Virtual Transfer" && (

                  <div className={styles.proceedButton}>
                    <button onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Payment;
