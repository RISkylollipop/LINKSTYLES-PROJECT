import React, { useState, useContext, useEffect } from 'react';
import styles from './payment.module.css';
import { ClothContext } from '../Context/ClothContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cart, cartCount, symbol, totalCartPrice } = useContext(ClothContext);
  const [paymenttype, setPaymenttype] = useState('Card Payment');
  const [checkoutloading, setCheckoutloading] = useState(false);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [opayData, setOpayData] = useState({});
  const [transactionReference, setTransactionReference] = useState(null); // Tracking transaction ref

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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const CartTotal = new Intl.NumberFormat("en-US").format(totalCartPrice.toFixed(2));
  const TotalCart = totalCartPrice.toFixed(2);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      toast.warning('Please enter a valid 11-digit phone number.');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }

    fetch('http://localhost:3005/api/v1/deliverydetails', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message.toLowerCase().includes('already')) {
          toast.error(data.message);
        } else {
          toast.success(data.message || 'Delivery details submitted!');
        }
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        toast.error("Something went wrong while sending the delivery details.");
      });
  };

  // Proceed to payment button to initialize and generate account number
  const handleProceedToPayment = async (e) => {

    const payload = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      amount: Number(TotalCart),
    };

     e.preventDefault();

    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      toast.warning('Please enter a valid 11-digit phone number.');
      return;
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.warning('Please enter a valid email address.');
      return;
    }

    fetch('http://localhost:3005/api/v1/deliverydetails', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data.message.toLowerCase().includes('already')) {
          toast.error(data.message);
        } else {
          toast.success(data.message || 'Delivery details submitted!');
        }
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        toast.error("Something went wrong while sending the delivery details.");
      });


    setShowPaymentCard(true);
    setCheckoutloading(true);

    try {
      const response = await fetch(`http://localhost:3005/api/v1/init-transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.status === "success") {
        toast.success("Account generated successfully");
        const transactionRef = data.transactionReference;
        setTransactionReference(transactionRef); // Save for status polling

        console.log(`transaction Ref: `, transactionRef);

        const filtercart = cart.map(item => ({
          goodsName: item.name,
          goodsImage: item.imageUrl,
          goodsPrice: item.price,
          goodsQuantity: item.quantity
        }))


        const payloadCartRef = {
          customerName: formData.fullName,
          customerEmail: formData.email,
          amount: Number(TotalCart),
          CartItem: filtercart,
          transactionReference: transactionRef,
        };

        const genAccountRes = await fetch(`http://localhost:3005/api/generate-account`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadCartRef)
        });

        console.log(payloadCartRef);


        const accountData = await genAccountRes.json();
        if (accountData.status === "success") {

          // console.log(cart, `With ref: `,  transactionRef);

          setOpayData({
            bank: accountData.bankName,
            account: accountData.accountNumber,
            name: accountData.accountName,
          });
        } else {
          toast.error("Failed to generate virtual account.");
        }
      } else {
        toast.error("Failed to initialize transaction.");
      }
    } catch (err) {
      console.error("❌ Payment error:", err);
      toast.error("Something went wrong while processing payment.");
    } finally {
      setCheckoutloading(false);
    }
  };

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      fetch(`http://localhost:3005/payment/status/${transactionReference}`)
        .then(res => res.json())
        .then(data => {
          console.log("Payment status:", data);

          if (data.status === "PAID") {
            toast.success(data.success || "✅ Payment confirmed!");
            navigate(`/clothes`)
            localStorage.removeItem("cart");
            clearInterval(interval);
          }
          else if (Date.now() - startTime >= 600000 && data.status === "PENDING") {
            // Stop checking after 30s if still pending
            clearInterval(interval);
            navigate(`/product/cart`);
          }
        })
        .catch(err => console.error("Error checking payment:", err));
    }, 50000); // check every 50 seconds

    return () => clearInterval(interval);
  }, [transactionReference, formData, cart, TotalCart]);



  const handleConfirmation = () => {


  };



  return (
    <>
      {/* <ToastContainer position="top-center" /> */}
      {checkoutloading ? (
        <div className={styles.loading}>Loading...</div>
      ) : showPaymentCard ? (
        <div className={styles.paymentCard}>
          <h3>Make Payment to this Account</h3>
          <p><strong>Bank:</strong> {opayData.bank}</p>
          <p><strong>Account Number:</strong> {opayData.account}</p>
          <p><strong>Account Name:</strong> {opayData.name}</p>
          <p><strong>Amount:</strong> {symbol} {CartTotal}</p>

          <button className={styles.backbutton} onClick={() => setShowPaymentCard(false)}>Go Back</button>
          <button onClick={handleConfirmation}>I have made the payment</button>
        </div>
      ) : (
        <div className={styles.paymentContainer}>
          <div style={{ textAlign: "center" }}>
            <select
              className={styles.selectBox}
              onChange={(e) => setPaymenttype(e.target.value)}
              value={paymenttype}
            >
              <option value="Card Payment">Card Payment</option>
              <option value="Virtual Transfer">Transfer</option>
              <option value="Payment On Delivery">Payment On Delivery</option>
            </select>

            {paymenttype === "Card Payment" && <p className={styles.paymentMessage}>Not Available Now</p>}
            {paymenttype === "Payment On Delivery" && (
              <p className={styles.paymentMessage}>
                Cart will be delivered to{" "}
                {formData.streetAddress && formData.city && formData.state && formData.country
                  ? `${formData.streetAddress}, ${formData.city}, ${formData.state}, ${formData.country}`
                  : "Address Provided"}
              </p>
            )}
          </div>

          <form className={styles.PaymentForm} onSubmit={handleSubmit}>
            <h3>Input Your Details and Delivery Address</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} required />
            <input type="email" name="email" placeholder="Email Address (optional)" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input type="text" name="streetAddress" placeholder="Street Address" value={formData.streetAddress} onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })} required />
            <input type="text" name="city" placeholder="City / Town" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required />

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
              <button type="submit">Confirm Address</button>
            )}
          </form>

          {cartCount > 0 && (
            <div className={styles.cardSummary}>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <table className={styles.cartItemsTable}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Image</th>
                      <th>Unit / Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td><img src={item.image1} alt="" width={100} height={100} /></td>
                        <td>
                          <b>Unit(s): {item.quantity}</b><hr />
                          {symbol} {item.price}
                        </td>
                        <td>{symbol} {(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className={styles.total}>
                <p>Total: <span>{symbol} {CartTotal}</span></p>
              </div>

              {paymenttype === "Virtual Transfer" && (
                <button className={styles.proceedButton} onClick={handleProceedToPayment}>
                  Proceed to Payment
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Payment;
