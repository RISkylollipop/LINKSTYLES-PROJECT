/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "./login.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

import backgroundImage from "../LatestTrend/LatestTrendImages/trend1.png";

// 3. Login Component
export function Login() {
  const { user, setUser, mainData, setMainData, productlenght,
    setProductlenght } = useContext(LoginContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    password: "",
  });

  const URL = `http://linkstyles-project-production.up.railway.app`
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        data.status = res.status;
        return data;
      })
      .then((data) => {

        if (data.status === 200 && data.token) {

          setUser(data.MainData);
          setMainData(data.MainData);

          localStorage.setItem("token", data.token);
          localStorage.setItem("data", JSON.stringify(data.MainData));
          localStorage.setItem("productlength", data.productLenght)


          if (data.message === "Admin Login successfully") {
            toast.success(data.Admingreeting)
            setTimeout(() => {
              navigate("/link/admin")
              const productlenght = localStorage.getItem("productlength")
              setProductlenght(productlenght);




            }, 5000);
          } else {
            toast.success(data.message);
            setTimeout(() => navigate("/clothes"), 3500);
          }

        }

        else if (data.status === 404) {
          toast.info(data.message || "Email not found, please register first.");
          setTimeout(() => navigate("/register"), 2500);
        }

        else if (data.status === 401) {
          toast.error(data.message || "Incorrect password.");
        }

        else {
          toast.warn("Something went wrong. Please try again.");
        }
      })

      .catch((err) => {
        console.error("Error:", err);
        toast.error("Server error, please try again later.");
      });
  };


  return (
    <>
      <main
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <h1
          style={{
            color: "white",
            fontSize: "50px",
            fontWeight: "bolder",
          }}
        >
          Login here
        </h1>

        <form onSubmit={handleSubmit} className={styles.loginContainer}>
          <FloatingLabel
            controlId="floatingInput1"
            label="First Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Firstname"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput2"
            label="Email Address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput3"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </FloatingLabel>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}
