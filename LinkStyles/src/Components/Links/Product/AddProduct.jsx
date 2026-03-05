import React, { Fragment, useContext, useState, useEffect } from "react";
import styles from "./AddProduct.module.css";
import {useLocation, useNavigate } from "react-router-dom";

import { LoginContext } from "../../UserLogin/LoginContext";


const AddProduct = () => {
  
  const navigate = useNavigate()
  const {isVerify} = useContext(LoginContext)
   

    const URL = `http://localhost:3005`
    isVerify()




  


  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });

  const [oldFormData, setOldFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const [addingProduct, setAddingProduct] = useState(false)
  const [addingOldProduct, setAddingOldProduct] = useState(false)

  const [imagePreview, setImagePreview] = useState([]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("You can upload a maximum of 3 images");
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddingProduct(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((img) => data.append("images", img));
      } else {
        data.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem(`token`)
      const response = await fetch(
        "http://localhost:3005/api/v1/addproduct",
        {
          method: "POST",
          body: data,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = await response.json();

      const ErrorDatas = ["login as admin", "session expired, please login" ,"invalid"]

      if (!response.ok && ErrorDatas.some(err => result.error?.toLowerCase().includes(err))) {
        setTimeout(() => {
          alert(result?.error || "Internal server error");
          navigate(`/login`)
        }, 5000)
        return;
      }
      else {
        alert("Product Added Successfully!");

        setFormData({
          productName: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          images: [],
        });
        setImagePreview([]);


      }

    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setAddingProduct(false);
    }
  };

  const handleolddatasubmit = async (e) => {
    e.preventDefault();
    setAddingOldProduct(true);

    try {
      const response = await fetch(
        "http://localhost:3005/api/v1/addoldproduct",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(oldFormData),

        }
      );

      const result = await response.json();
      alert(result.message || "Product added successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong!");
    } finally {
      setAddingOldProduct(false);
    }
  };


  return (
    <Fragment>
      <div className={styles.mainAddProductContainer}>

        <div className={styles.addProductContainer}>
          <h1>Add New Product</h1>

          <form onSubmit={handleSubmit} className={styles.productForm}>
            <div className={styles.formGroup}>
              <label>
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Description <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
              ></textarea>
            </div>


            <div className={styles.formGroup}>
              <label>
                Price <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>
                Stock <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder={1}
                required
              />
            </div>


            <div className={styles.formGroup}>
              <label>
                Category <span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}

                required
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.imageUpload}`}>
              <label>
                Product Images <span style={{ color: "red" }}>*</span>
              </label>
              <br />

              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt="Preview"
                  style={{
                    width: "120px",
                    height: "120px",
                    marginRight: "10px",
                    borderRadius: "10px",
                  }}
                />
              ))}

              <br /><br />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={addingProduct}
              className={styles.submitBtn}
            >
              {addingProduct ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>


        <div className={styles.addProductContainer}>
          <h1 style={{ textAlign: "center" }}>Add Old Product</h1>
          <form onSubmit={handleolddatasubmit}>
            <div className={styles.formGroup}>
              <label>
                Product Name <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="text" name="productName"
                value={oldFormData.productName || ""}
                onChange={(e) => setOldFormData({ ...oldFormData, productName: e.target.value })}
                placeholder="Enter product name"
                required />

            </div>

            {/* Description */}

            <div className={styles.formGroup}>
              <label>Description <span style={{ color: "red" }}>*</span></label>
              <br />
              <textarea name="description"
                value={oldFormData.description || ""}
                onChange={(e) => setOldFormData({ ...oldFormData, description: e.target.value })}
                placeholder="Enter product details"
                required
              />

            </div> {/* Price */}

            <div className={styles.formGroup}>
              <label>Price <span style={{ color: "red" }}>*</span></label>


              <input type="number" name="price" value={oldFormData.price || ""}
                onChange={(e) => setOldFormData({ ...oldFormData, price: e.target.value })}
                placeholder="0.00"
                required
              />


            </div>

            {/* Stock */}

            <div className={styles.formGroup}>
              <label>Stock <span style={{ color: "red" }}>*</span></label>


              <input type="number" name="stock" value={oldFormData.stock || ""}
                onChange={(e) => setOldFormData({ ...oldFormData, stock: e.target.value })}
                placeholder="1"
                required
              />
            </div> {/* Category */} <div className={styles.formGroup}>
              <label>Category <span style={{ color: "red" }}>*</span></label> <select name="category" value={oldFormData.category || ""} onChange={(e) => setOldFormData({ ...oldFormData, category: e.target.value })} required >
                <option value="">Select Category</option> <option value="electronics">Electronics</option> <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="other">Other</option>
              </select>
            </div> {/* Image previews */}
            <div className={styles.imageUrlPreviews}>
              <img
                style={{
                  width: "120px",
                  height: "120px",
                  marginRight: "10px",
                  borderRadius: "10px"
                }}
                src={oldFormData.imageUrl} width={200} alt="Image Url 1"
                required
              />
              <img style={{
                width: "120px",
                height: "120px",
                marginRight: "10px",
                borderRadius: "10px"
              }}
                src={oldFormData.imageUrl2} width={200} alt="Image Url 2"
                required
              />
              <img style={{
                width: "120px",
                height: "120px",
                marginRight: "10px",
                borderRadius: "10px"
              }}
                placeholder=""
                src={oldFormData.imageUrl3} width={200} alt="Image Url 3"
                required
              />
            </div>


            {/* Image URLs */}
            <div className={styles.imageUrlPreviews}>

              <div >
                <label>Image URL 1</label>
                <input type="text" name="imageUrl"
                  value={oldFormData.imageUrl || ""}
                  onChange={(e) => setOldFormData({ ...oldFormData, imageUrl: e.target.value })}
                  placeholder="Enter Image 1 URL"
                  required
                />
              </div>

              <div >
                <label>Image URL 2</label>
                <input type="text" name="imageUrl2"
                  value={oldFormData.imageUrl2 || ""}
                  onChange={(e) => setOldFormData({ ...oldFormData, imageUrl2: e.target.value })}
                  placeholder="Enter Image 2 URL"
                  required
                />
              </div>

              <div >
                <label>Image URL 3</label>
                <input type="text" name="imageUrl3"
                  value={oldFormData.imageUrl3 || ""}
                  onChange={(e) => setOldFormData({ ...oldFormData, imageUrl3: e.target.value })}
                  placeholder="Enter Image 3 URL"
                  required
                />
              </div>
            </div>

            <br />

            <button
              type="submit"
              disabled={addingOldProduct}
              className={styles.submitBtn}
            >
              {addingOldProduct ? "Adding Product..." : "Add Product"}
            </button>



          </form>
        </div>




      </div>





    </Fragment>
  );
};

export default AddProduct;
