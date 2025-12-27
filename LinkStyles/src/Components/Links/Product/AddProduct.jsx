import React, { Fragment, useState } from "react";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
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

  const [imagePreview, setImagePreview] = useState([]);

  /* =============================
      HANDLERS (LOGIC ONLY)
  ============================== */

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
      const response = await fetch(
        "http://localhost:3002/api/v1/addproduct",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Internal server error");
        return;
      }

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
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setAddingProduct(false);
    }
  };

  const handleolddatasubmit = async (e) => {
    e.preventDefault();
    setAddingProduct(true);

    try {
      const response = await fetch(
        "http://localhost:3002/api/v1/addoldproduct",
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
      setAddingProduct(false);
    }
  };


  return (
    <Fragment>
      <div className={styles.addProductContainer}>
        <h1>Add New Product</h1>

        <form onSubmit={handleSubmit} className={styles.productForm}>
          <div className={styles.formGroup}>
            <label>
              Product Name <span style={{ color: "red" }}>*</span>
            </label>
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
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
            ></textarea>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>
                Price <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
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
                required
              />
            </div>
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
              Product Image <span style={{ color: "red" }}>*</span>
            </label>

            {imagePreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                style={{
                  width: "300px",
                  height: "300px",
                  marginRight: "10px",
                  borderRadius: "10px",
                }}
              />
            ))}

            <br />
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



      <div className={styles.addProductContainer}> <h1 style={{ textAlign: "center" }}>Add Old Product</h1>
        <form onSubmit={handleolddatasubmit}>
          <div className="formGroup"> <label>Product Name <span style={{ color: "red" }}>*</span></label> <input type="text" name="productName" value={oldFormData.productName || ""} onChange={(e) => setOldFormData({ ...oldFormData, productName: e.target.value })} placeholder="Enter product name" required />
          </div> {/* Description */} <div className="formGroup"> <label>Description <span style={{ color: "red" }}>*</span></label> <textarea name="description" value={oldFormData.description || ""} onChange={(e) => setOldFormData({ ...oldFormData, description: e.target.value })} placeholder="Enter product details" required />
          </div> {/* Price */} <div className="formGroup"> <label>Price <span style={{ color: "red" }}>*</span></label> <input type="number" name="price" value={oldFormData.price || ""} onChange={(e) => setOldFormData({ ...oldFormData, price: e.target.value })} placeholder="0.00" required />
          </div> {/* Stock */} <div className="formGroup"> <label>Stock <span style={{ color: "red" }}>*</span></label> <input type="number" name="stock" value={oldFormData.stock || ""} onChange={(e) => setOldFormData({ ...oldFormData, stock: e.target.value })} placeholder="1" required />
          </div> {/* Category */} <div className="formGroup"> <label>Category <span style={{ color: "red" }}>*</span></label> <select name="category" value={oldFormData.category || ""} onChange={(e) => setOldFormData({ ...oldFormData, category: e.target.value })} required >
            <option value="">Select Category</option> <option value="electronics">Electronics</option> <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="other">Other</option>
          </select>
          </div> {/* Image previews */}
          <div> <img style={{ width: "300px", height: "300px", marginRight: "10px", borderRadius: "10px" }} src={oldFormData.imageUrl} width={200} alt="" />
            <img style={{ width: "300px", height: "300px", marginRight: "10px", borderRadius: "10px" }} src={oldFormData.imageUrl2} width={200} alt="" />
            <img style={{ width: "300px", height: "300px", marginRight: "10px", borderRadius: "10px" }} src={oldFormData.imageUrl3} width={200} alt="" />
          </div> {/* Image URLs */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "30%" }} className="formGroup">
              <label>Image URL 1</label> <input type="text" name="imageUrl" value={oldFormData.imageUrl || ""} onChange={(e) => setOldFormData({ ...oldFormData, imageUrl: e.target.value })} placeholder="Enter Image 1 URL" />
            </div> <div style={{ width: "30%" }} className="formGroup">
              <label>Image URL 2</label> <input type="text" name="imageUrl2" value={oldFormData.imageUrl2 || ""} onChange={(e) => setOldFormData({ ...oldFormData, imageUrl2: e.target.value })} placeholder="Enter Image 2 URL" />
            </div> <div style={{ width: "30%" }} className="formGroup">
              <label>Image URL 3</label> <input type="text" name="imageUrl3" value={oldFormData.imageUrl3 || ""} onChange={(e) => setOldFormData({ ...oldFormData, imageUrl3: e.target.value })} placeholder="Enter Image 3 URL" />
            </div>
          </div> <br />

          <button
            type="submit"
            disabled={addingProduct}
            className={styles.submitBtn}
          >
            {addingProduct ? "Adding Product..." : "Add Product"}
          </button>



        </form>
      </div>






    </Fragment>
  );
};

export default AddProduct;
