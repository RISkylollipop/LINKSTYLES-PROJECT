import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});


  function validate() {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is Required";
    else if (!formData.email) newErrors.email = "Email is Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid Email";
    if (!formData.message) newErrors.message = "Message is Required";
    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
    } else {
      setErrors({});
      fetch("http://localhost:3005/api/v1/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Message submitted successfully!");
            setFormData({
              name: '',
              email: '',
              message: ''
            });
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("There was an error submitting the form.");
        });
    }
  };

  return (
    <div className={styles.container}>

      <h1>Contact Us</h1>
      <p>We'd love to hear from you!
        <br />
        Please fill out the form below, and we'll get back to you as soon as possible.
      </p>

      <div className={styles.FormContainer}>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Your Name <span style={{color: "red"}}>*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter your name"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Your Email <span style={{color: "red"}}>*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Your Message <span style={{color: "red"}}>*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Enter your message"
              rows="4"
            />
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          </div>

          <button className={styles.sendBtn} type="submit">Send Message</button>
        </form>
      </div>

      {/* Toast Container to render notifications */}
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> */}

    </div>
  );
}

export default Contact;
