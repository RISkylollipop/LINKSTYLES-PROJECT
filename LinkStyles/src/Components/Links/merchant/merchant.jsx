// Create wallet section for merchant and make revenue depends on sales per day
// Create where merchant can Edit Detail and advice to always add store name to description of the goods the are adding

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./merchant.module.css";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Bar,
} from "recharts";

// ─── Declare global variable Outside all funtions
import { LoginContext } from "../../UserLogin/LoginContext";

const newProduct = JSON.parse(localStorage.getItem("merchantProduct" || ""));

const activeProduct = newProduct?.filter((p) =>
  ["active", "low_stock"].includes(p.status),
);

const notActiveProduct = newProduct?.filter((p) => p.status === "out_of_stock");
const productlenght = activeProduct?.length || 0;
const notActiveProductlength = 0 || notActiveProduct?.length;
const STATUS_STYLE = {
  delivered: { background: "rgba(0,255,136,0.1)", color: "#00ff88" },
  processing: { background: "rgba(251,191,36,0.1)", color: "#fbbf24" },
  shipped: { background: "rgba(96,165,250,0.1)", color: "#60a5fa" },
  cancelled: { background: "rgba(248,113,113,0.1)", color: "#f87171" },
  active: { background: "rgba(0,255,136,0.1)", color: "#00ff88" },
  out_of_stock: { background: "rgba(248,113,113,0.1)", color: "#f87171" },
  low_stock: { background: "rgba(251,191,36,0.1)", color: "#fbbf24" },
};

const productrows = [
  {
    product: "Ankara Bag",
    category: "Fashion",
    price: 8500,
    stock: 45,
    sales: 120,
    status: "active",
  },
  {
    product: "Agbada Set",
    category: "Fashion",
    price: 24000,
    stock: 32,
    sales: 85,
    status: "active",
  },
  {
    product: "Gucci Lace",
    category: "Fabric",
    price: 82500,
    stock: 18,
    sales: 95,
    status: "active",
  },
  {
    product: "Bluetooth Speaker",
    category: "Electronics",
    price: 124000,
    stock: 56,
    sales: 210,
    status: "active",
  },
  {
    product: "Bone Straight 32in",
    category: "Hair",
    price: 350000,
    stock: 12,
    sales: 45,
    status: "low_stock",
  },
  {
    product: "Set Of Pot",
    category: "Kitchenware",
    price: 170000,
    stock: 28,
    sales: 67,
    status: "active",
  },
  {
    product: "Gold Necklace",
    category: "Jewelry",
    price: 45000,
    stock: 22,
    sales: 156,
    status: "active",
  },
  {
    product: "Leather Wallet",
    category: "Accessories",
    price: 12500,
    stock: 78,
    sales: 234,
    status: "active",
  },
  {
    product: "Phone Case",
    category: "Electronics",
    price: 5000,
    stock: 150,
    sales: 567,
    status: "active",
  },
  {
    product: "Perfume 100ml",
    category: "Beauty",
    price: 35000,
    stock: 0,
    sales: 98,
    status: "out_of_stock",
  },
];

const orderrows = [
  {
    orderid: "ORD-25098",
    customer: "Amaka Obi",
    product: "Ankara Bag",
    amount: 8500,
    status: "delivered",
  },
  {
    orderid: "ORD-25099",
    customer: "Emeka Nwosu",
    product: "Agbada Set",
    amount: 24000,
    status: "processing",
  },
  {
    orderid: "ORD-25100",
    customer: "Olamide Badiru",
    product: "Gucci Lace",
    amount: 82500,
    status: "delivered",
  },
  {
    orderid: "ORD-25101",
    customer: "Olasco LTD",
    product: "Bluetooth Speaker",
    amount: 124000,
    status: "shipped",
  },
  {
    orderid: "ORD-25102",
    customer: "Olayinka Faridah",
    product: "Bone Straight 32in",
    amount: 350000,
    status: "cancelled",
  },
  {
    orderid: "ORD-25103",
    customer: "Jumoke Olarongbe",
    product: "Set Of Pot",
    amount: 170000,
    status: "processing",
  },
  {
    orderid: "ORD-25104",
    customer: "Adebayo Johnson",
    product: "Sneakers",
    amount: 45000,
    status: "shipped",
  },
  {
    orderid: "ORD-25105",
    customer: "Ngozi Eze",
    product: "Headphones",
    amount: 30000,
    status: "processing",
  },
  // { orderid: "ORD-25106", customer: "Tunde Ade", product: "Watch", amount: 150000, status: "delivered" },
  // { orderid: "ORD-25107", customer: "Funmi Adeyemi", product: "Dress", amount: 60000, status: "cancelled" },
];

const overviewValue = [
  {
    id: "revenue",
    name: "Total Revenue",
    value: 562000,
    justification: "+18% this month",
    color: "green",
    icon: "₦",
  },
  {
    id: "order",
    name: "Total Orders",
    value: 215,
    justification: "+7 this week",
    color: "#1261DC",
    icon: "◈",
  },
  {
    id: "product",
    name: "Active Products",
    value: productlenght,
    justification: `${notActiveProductlength} ${notActiveProductlength > 1 ? "goods" : "good"} Out of Stock`,
    color: "#EC8217",
    icon: "▣",
  },
  {
    id: "rating",
    name: "Store Rating",
    value: 4.8,
    justification: "From 84 reviews",
    color: "#717CFA",
    icon: "★",
  },
];

const revenueData = [
  { month: "Nov", revenue: 85000 },
  { month: "Dec", revenue: 70000 },
  { month: "Jan", revenue: 92000 },
  { month: "Feb", revenue: 78000 },
  { month: "Mar", revenue: 113000 },
  { month: "Apr", revenue: 124000 },
];

const orderData = [
  { month: "Nov", order: 30 },
  { month: "Dec", order: 27 },
  { month: "Jan", order: 35 },
  { month: "Feb", order: 32 },
  { month: "Mar", order: 42 },
  { month: "Apr", order: 49 },
];

// ─── TOOLTIPS ────

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#0f172a",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: "8px",
          padding: "12px 16px",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#00ff88",
            marginBottom: "6px",
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: "13px", color: "#e2e8f0" }}>
          ₦{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

function OrderTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div
        style={{
          background: "#0f172a",
          border: "1px solid rgba(96,165,250,0.2)",
          borderRadius: "8px",
          padding: "12px 16px",
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: "#60a5fa",
            marginBottom: "6px",
          }}
        >
          {label}
        </p>
        <p style={{ fontSize: "13px", color: "#e2e8f0" }}>
          {payload[0].value} orders
        </p>
      </div>
    );
  }
  return null;
}

// ─── TABLE ───────

function Table({ headers, rows, label, type }) {
  return (
    <>
      <div className={styles.tableContainer}>
        <div className={styles.tableContainerCard}>
          <h5>{label}</h5>

          <table>
            <thead>
              <tr>
                {headers &&
                  headers.map((header) => <th key={header}>{header}</th>)}
              </tr>
            </thead>

            {type === "orders" ? (
              <tbody>
                {rows.length > 0 &&
                  rows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.orderid}</td>
                      <td>{row.customer}</td>
                      <td>{row.product}</td>
                      <td>{row.amount}</td>
                      <td
                        className={styles.status}
                        style={STATUS_STYLE[row.status]}
                      >
                        {row.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : type === "overview" ? (
              <tbody>
                {rows.length > 0 &&
                  rows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.orderid}</td>
                      <td>{row.customer}</td>
                      <td>{row.product}</td>
                      <td>{row.amount}</td>
                      <td
                        className={styles.status}
                        style={STATUS_STYLE[row.status]}
                      >
                        {row.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : type === "products" ? (
              <tbody>
                {rows.length > 0 &&
                  rows.map((row, idx) => (
                    <tr key={idx}>
                      {/* <td>{row.product_id}</td> */}
                      <td>{row?.orderid || row?.productName || null}</td>

                      <td>{row?.customer || row?.category || null}</td>

                      {}

                      <td style={row?.price ? { color: "green" } : null}>
                        {new Intl.NumberFormat("en-NG").format(
                          `${row?.amount || row?.price}`,
                        )}
                      </td>

                      <td>{row?.stock ?? 0}</td>
                      <td>{row?.sales || null}</td>
                      <td
                        className={styles.status}
                        style={STATUS_STYLE[row.status]}
                      >
                        {row?.status}
                      </td>

                      <td>
                        {row?.action || null}
                        <button className={styles.editBtn}>
                          <span style={{ fontSize: "15px" }}>&#9998;</span> EDIT
                        </button>
                        <button className={styles.deleteBtn}>
                          <span style={{ fontSize: "15px" }}>&#128465;</span>{" "}
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </>
  );
}

// ─── SECTIONS ────

function OverView() {
  const headers = ["ORDERID", "CUSTOMER", "PRODUCT", "AMOUNT", "STATUS"];

  return (
    <>
      <div className={styles.overviewheading}>
        <h3>Overview</h3>
        <p>Your store performance at a glance</p>
      </div>

      <div className={styles.digitalAnalysis}>
        {overviewValue.map((item) => (
          <div key={item.id} className={styles.analystCard}>
            <div className={styles.analystCarddBody}>
              <div className={styles.cardinnerDiv}>
                <h5>{item.icon}</h5>
                <h6 style={{ color: item.color }}>
                  <span
                    style={{ background: item.color }}
                    className={styles.liveDot}
                  ></span>
                  LIVE
                </h6>
              </div>

              <div className={styles.analystCarddBodyPara}>
                <h5>{new Intl.NumberFormat("en-NG").format(item.value)}</h5>
                <small>{item.name}</small>
                <h6>{item.justification}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dataanalysis}>
        <div className={styles.dataAnalysisCard}>
          <div className={styles.dataAnalysisCardBody}>
            <p>REVENUE &middot; 2025</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₦${v / 1000}k`}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(250,249,249,0.09)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#00ff88"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.dataAnalysisCard}>
          <div className={styles.dataAnalysisCardBody}>
            <p>ORDERS &middot; 2025</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={orderData} barSize={10}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.04)"
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  content={<OrderTooltip />}
                />
                <Bar radius={[4, 4, 0, 0]} dataKey="order" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Table
        headers={headers}
        rows={orderrows.slice(0, 5)}
        label="Recent · Orders"
        type="overview"
      />
    </>
  );
}

function Orders() {
  const [orderStatus, setOrderStatus] = useState("all");
  const [search, setSearch] = useState("");

  const orderCheckButton = [
    { id: "all", label: "All" },
    { id: "processing", label: "Processing" },
    { id: "shipped", label: "Shipped" },
    { id: "delivered", label: "Delivered" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const ordersHeaders = ["ORDERID", "CUSTOMER", "PRODUCT", "AMOUNT", "STATUS"];

  const filtered = orderrows
    .filter((o) => orderStatus === "all" || o.status === orderStatus)
    .filter(
      (o) =>
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.orderid.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <>
      <div className={`${styles.overviewheading} ${styles.topBarDiv}`}>
        <h3>Orders</h3>
        <p>{orderrows.length} total orders</p>
      </div>

      <div
        className={styles.orderbtn}
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        {orderCheckButton.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setOrderStatus(btn.id)}
            className={
              orderStatus === btn.id
                ? `${styles.isActiveStyle}`
                : `${styles.isNotActiveStyle}`
            }
          >
            {btn.label}
          </button>
        ))}
      </div>

      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search by customer or order ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
      />

      <Table
        headers={ordersHeaders}
        rows={filtered}
        label="Orders · Table"
        type="orders"
      />
    </>
  );
}

function Products() {
  const [search, setSearch] = useState("");
  const { merchantData, setMerchantData } = useContext(LoginContext);
  const [addproductStatus, setAddproductStatus] = useState(false);

  const [data, setData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    return data ? data.role_name : "UnVerified Merchant";
  });

  const [medata, setMedata] = useState(() => {
    const newmedata = JSON.parse(localStorage.getItem(`medata`));
    return newmedata ? newmedata : [];
  });

  const productNewrows = newProduct;

  const productheaders = [
    "PRODUCT",
    "CATEGORY",
    "PRICE",
    "STOCK",
    "SALES",
    "STATUS",
    "ACTION",
  ];

  const searchFilter = productNewrows.filter(
    (row) =>
      row.category.toLowerCase().includes(search.toLowerCase()) ||
      row.productName.toLowerCase().includes(search.toLowerCase()),
  );

  // My add product form function goes here

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [],
  });
  const [addingProduct, setAddingProduct] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("Maximum 3 images");
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
    data.append("merchantPID", medata?.merchantProductId);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${URL}/api/v1/merchant/addproduct`, {
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result?.error || "Failed");
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
      setAddproductStatus(false);
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setAddingProduct(false);
    }
  };

  if (addproductStatus) {
    return (
      <div>
        <div className={`${styles.overviewheading} ${styles.topBarDiv}`}>
          <div>
            <h3 style={{ textAlign: "center" }}>ADD PRODUCT</h3>
            <p>{productNewrows.length} products in your store</p>
          </div>

          <div className={styles.close}>
            <button onClick={() => setAddproductStatus(false)}>Close</button>
          </div>
        </div>

        {/* My form  goes here*/}

        <form onSubmit={handleSubmit} className={styles.productForm}>
          {/* Merchant ID - readonly */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className={styles.formGroup}>
              <label>Merchant ID</label>
              <input
                type="text"
                value={medata?.merchantProductId || ""}
                readOnly
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              />
            </div>

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
          </div>

          <div className={styles.formGroup}>
            <label>
              Description <span style={{ color: "red" }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className={styles.formGroup}>
              <label>
                Price (₦) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
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
                placeholder="1"
                min="1"
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
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>
              Product Images (max 3) <span style={{ color: "red" }}>*</span>
            </label>
            {imagePreview.length > 0 && (
              <div style={{ display: "flex", gap: "10px", margin: "12px 0" }}>
                {imagePreview.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      border: "1px solid rgba(0,255,136,0.2)",
                    }}
                  />
                ))}
              </div>
            )}
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
        <div className={styles.close}>
          <button onClick={() => setAddproductStatus(false)}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.overviewheading} ${styles.topBarDiv}`}>
        <div>
          <h3>Products</h3>
          <p>{productNewrows.length} products in your store</p>
        </div>

        <div className={styles.addProductbtn}>
          <button onClick={() => setAddproductStatus(true)}>
            <span>+</span> Add Product
          </button>
          <p></p>
        </div>
      </div>

      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search by product or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
      />

      <Table
        headers={productheaders}
        rows={searchFilter}
        label="Products · Table"
        type="products"
      />
    </>
  );
}

function Wallet() {
  const [medata, setMedata] = useState(() => {
    const newmedata = JSON.parse(localStorage.getItem(`medata`));
    return newmedata ? newmedata : [];
  });
  return (
    <>
      <div>
        <h3>Wallet</h3>
        <p style={{ color: "white" }}>
          {" "}
          Wallet Balance: {medata.wallet_balance}
        </p>
      </div>
    </>
  );
}

function Settings() {
  return <div>Settings — coming soon</div>;
}

// ─── MAIN COMPONENT ─

const sidebarList = [
  { id: "overview", label: "Overview", icon: "⬡" },
  { id: "orders", label: "Orders", icon: "◈" },
  { id: "products", label: "Products", icon: "▣" },
  { id: "wallet", label: "Wallet", icon: "◎" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

const sections = {
  overview: <OverView />,
  orders: <Orders />,
  products: <Products />,
  wallet: <Wallet />,
  settings: <Settings />,
};

function Merchant({ owner }) {
  const [activeId, setActiveId] = useState("overview");
  const [data, setData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    return data ? data.role_name : "";
  });

  const [medata, setMedata] = useState(() => {
    const newmedata = JSON.parse(localStorage.getItem(`medata`));
    return newmedata ? newmedata : [];
  });

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logosection}>
          <div className={styles.logo}>
            Link<span style={{ color: "#00ff88" }}>styles</span>
          </div>
          <div className={styles.merchant}>{data.toUpperCase()}</div>
        </div>

        <div>
          {sidebarList.map((sidebar) => (
            <div key={sidebar.id} className={styles.listing}>
              <button
                onClick={() => setActiveId(sidebar.id)}
                className={
                  activeId === sidebar.id
                    ? styles.isActiveStyle
                    : styles.isNotActiveStyle
                }
              >
                <span>{sidebar.icon}</span>
                {sidebar.label}
              </button>
            </div>
          ))}
        </div>

        <div
          className={styles.MerchantName}
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00ff88, #60a5fa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontWeight: 700,
                color: "#080c10",
              }}
            >
              {medata.store_name[0]}
            </div>
            <div>
              <p
                style={{ fontSize: "13px", color: "#e2e8f0", fontWeight: 500 }}
              >
                {medata.store_name}
              </p>

              <p
                style={{
                  fontSize: "11px",
                  color: medata?.is_verified ? "#00ff88" : "#f87171",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {medata?.is_verified && medata.is_verified === 1
                  ? "Verified"
                  : "UnVerified"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className={styles.main}>
        <div className={styles.topBarDiv}>
          <div className={styles.topdivLinks}>
            {owner ? (
              <p>LINKSTYLES &middot; {owner} PORTAL</p>
            ) : (
              <p>LINKSTYLES &middot; MERCHANT PORTAL</p>
            )}
            <p>{medata.store_name}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div className={styles.ball}></div>
            <div className={styles.onlinestore}>STORE ONLINE</div>
          </div>
        </div>

        {sections[activeId]}
      </main>
    </div>
  );
}

export default Merchant;
