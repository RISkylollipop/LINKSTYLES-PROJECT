import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  BarChart,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  Pie,
  Legend,
  Bar,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

import styles from "./links.module.css";

// Recreate dashboard
// Create section to update users function User ==> Merchant ===> To Admin
// Create table to get all product and filter all that belongs to specific merchant
// Create Merchant Wallet management


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
  {
    orderid: "ORD-25106",
    customer: "Tunde Ade",
    product: "Watch",
    amount: 150000,
    status: "delivered",
  },
  {
    orderid: "ORD-25107",
    customer: "Funmi Adeyemi",
    product: "Dress",
    amount: 60000,
    status: "cancelled",
  },
];


const STATUS_STYLE = {
  // Positive states - Green
  delivered: { background: "rgba(0,255,136,0.1)", color: "#00ff88" },
  active: { background: "rgba(0,255,136,0.1)", color: "#00ff88" },

  // In-progress states - Blue
  shipped: { background: "rgba(96,165,250,0.1)", color: "#60a5fa" },
  processing: { background: "rgba(96,165,250,0.1)", color: "#60a5fa" },

  // Warning states - Amber/Yellow
  pending: { background: "rgba(27, 26, 25, 0.1)", color: "#f2af06" },
  low_stock: { background: "rgba(27, 26, 25, 0.1)", color: "#f2af06" },

  // Problematic states - Red
  cancelled: { background: "rgba(248,113,113,0.1)", color: "#f87171" },
  out_of_stock: { background: "rgba(248,113,113,0.1)", color: "#f87171" },

  // Dispute/Issue state - Orange/Red-Orange
  disputed: { background: "rgba(251,146,60,0.1)", color: "#fb923c" },
};




function Table({ headers, rows, label, type, actions }) {
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
                {rows.length > 0 ? (
                  rows.map((row, idx) => (
                    
                    <tr key={idx}>
                      <td>{row.merchantPID}</td>
                      <td>{row.order_id}</td>
                      <td>{row.product_id}</td>
                      <td>{row.product_name}</td>
                      <td>{row.quantity}</td>
                      <td>{row.price}</td>
                      <td
                        style={{
                          borderRight: "1px solid rgba(247, 183, 5, 0.97)",
                        }}
                      >
                        <img
                          src={row?.product_image}
                          width="80px"
                          height="60px"
                          alt="Product Image"
                        />
                      </td>
                      <td
                        className={styles.status}
                        style={STATUS_STYLE[row.delivery_status]}
                      >
                        {row.delivery_status}
                      </td>
                      <td style={{ padding: 0 }}>
                        {actions &&
                          actions.map((a) => (
                            <button
                              style={{
                                padding: "3px 2px",
                                margin: "2px",
                                cursor: "pointer",
                              }}
                              key={a.name}
                            >
                              {a.label}
                            </button>
                          ))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div style={{ width: "100%", display: "block" }}>
                    <h3
                      style={{
                        textAlign: "left",
                        margin: "10px auto",
                        width: "100%",
                      }}
                    >
                      No Match rows
                    </h3>
                  </div>
                )}
              </tbody>
            ) : type === "overview" ? (
              <tbody>
                {rows.length > 0 &&
                  rows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.id}</td>
                      <td>{row.order_id}</td>
                      <td>{row.customer_name}</td>

                      <td style={{ paddingLeft: "15px" }}>
                        {row.cart.map((cartitem, idx) => (
                          <span key={idx}>
                            <small>{cartitem.goodsQuantity}x</small>
                            <li className={styles.tableCartListing}>
                              {cartitem.goodsName}
                            </li>
                            &nbsp;
                          </span>
                        ))}
                      </td>
                      <td>{row.total_amount}</td>
                      <td>{row.payment_mode}</td>
                      <td>
                        {row.shipping_address === " "
                          ? "NIGERIA"
                          : row.shipping_address !== " "
                            ? row.shipping_address
                            : "NOT AVAILABLE"}{" "}
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
            ) : type === "users" ? (
              <tbody>
                <tr key={idx}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            ) : null}
          </table>
        </div>
      </div>
    </>
  );
}











function Overview() {
  // Digital analysis List of Customers, List of Merchants,
  // All Merchants total Sales, Merchants Revenue/day, Total Product, Total Order Per/day and Week
  //  Notification, Withdrawal Request
  //
  // Customer Sales



  const [newOrdersRow, setNewOrdersRow] = useState(() => {
    try {
      const orders = localStorage.getItem("allOrders");
      return orders ? JSON.parse(orders) : [];
    } catch (error) {
      console.log("Error parsing localStorage data:", error);
      console.error(error);
      return [];
    }
  });

  // cart
  // created_at
  // customer_email
  // :
  // customer_name
  // id
  // :
  // 1
  // monnify_ref

  // order_id
  // payment_mode
  // shipping_address
  // total_amount

  const headers = [
    "ORDER_ID",
    "REFERENCE_ID",
    "CUSTOMER_NAME",
    "PRODUCT",
    "AMOUNT",
    "PAYMENT MODE",
    "SHIPPING ADDRESS",
  ];
  const overviewData = [
    {
      id: "revernue",
      label: "Total Revenue",
      value: 12000000,
      justification: "10% more total",
      color: "green",
      icon: "₦",
    },
    {
      id: "customers",
      label: "Customers",
      value: 4,
      justification: "+1 new user",
      color: "green",
      icon: "👥",
    },
    {
      id: "merchants",
      label: "merchants",
      value: 2,
      justification: "+1 new merchant",
      color: "orange",
      icon: "👤",
    },
    {
      id: "sales",
      label: "Sales",
      value: 142000,
      justification: "2% more than yesterday",
      color: "green",
      icon: "📈",
    },
    {
      id: "orders",
      label: "Orders",
      value: 26,
      justification: "From 12am till Now",
      color: "#3074e0",
      icon: "◈",
    },
    {
      id: "inbox",
      label: "Inbox",
      value: 8,
      justification: "All for the Month",
      color: "orange",
      icon: "📩",
    },
    {
      id: "withdrawal",
      label: "Withdrawal Request",
      value: 5,
      justification: "Pending Withdrawal",
      color: "#717CFA",
      icon: "💳",
    },
  ];

  // Area Chart
  const TotalRevenue = [
    { month: "Nov", revenue: 1360000 },
    { month: "Dec", revenue: 1450000 },
    { month: "Jan", revenue: 1510000 },
    { month: "Feb", revenue: 1980000 },
    { month: "Mar", revenue: 1450000 },
    { month: "Apr", revenue: 2450000 },
    { month: "May", revenue: 1800000 },
  ];
  // PieChart
  const expenses = [
    { name: "Platform Fees", value: 45000 },
    { name: "Logistics", value: 120000 },
    { name: "Marketing", value: 80000 },
    { name: "Refunds", value: 35000 },
    { name: "Packaging", value: 25000 },
    { name: "Customer Support", value: 18000 },
  ];

  // barchart
  const ProductCategoryRevenue = [
    { name: "Electronic", value: 4200000 },
    { name: "Fashions", value: 2800000 },
    { name: "Clothing", value: 1600000 },
    { name: "Furniture", value: 1200000 },
    { name: "Beauty", value: 850000 },
    { name: "Accessories", value: 650000 },
    { name: "Food", value: 700000 },
  ];

  // BarChart
  const MerchantRevenue = [
    { name: "Admin", revenue: 4800000 },
    { name: "Elizabeth", revenue: 4000000 },
    { name: "Yunus", revenue: 3200000 },
  ];

  function CustomTooltip({ active, payload, label }) {
    if (active && payload?.length) {
      return (
        <div className={styles.TooltipContainer}>
          <p style={{ fontSize: "11px", color: "#00ff88" }}>{label}</p>
          <p style={{ color: "#e2e8f0" }}>
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
        <div className={styles.TooltipContainer}>
          <p style={{ color: "#60a5fa" }}>{label}</p>
          <p style={{ color: "#e2e8f0" }}>{payload[0].value} orders</p>
        </div>
      );
    }
    return null;
  }

  function PieTooltip({ active, payload, label }) {
    if (active && payload?.length) {
      const data = payload[0];
      return (
        <div className={styles.TooltipContainer}>
          <p style={{ color: "green", marginBottom: "10px" }}>{data.name}</p>

          <p style={{ color: "white" }}>{`₦${data.value.toLocaleString()}`}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  const PIECOLOUR = [
    "#00ff88",
    "#60a5fa",
    "#fbbf24",
    "#f87171",
    "#a78bfa",
    "#fb923c",
  ];

  return (
    <>

     <div className={styles.overviewheading}>
                <h3>Overview</h3>

                <p>Your Users and Merchant performance at a glance</p>
      </div>

       <div className={styles.digitalAnalysis}>
                {overviewData && overviewData?.map((overview) => (

                    <div
                        key={overview.id}
                        className={styles.digitalAnalysiscard}>
                        <div className={styles.digitalAnalysisbody}>
                            <div className={styles.cardinnerdiv}>
                                <h5>{overview.icon}</h5>

                                <h6 style={{ color: overview.color }}>
                                    <span
                                        className={styles.livedot}
                                        style={{ background: overview.color }}
                                    ></span>

                                    LIVE
                                </h6>
                            </div>

                            <div className={styles.analystCardBodyPara}>
                                <h5>{new Intl.NumberFormat("en-NG").format(overview.value)}</h5>
                                <small>{overview.label}</small>
                                <h6>{overview.justification}</h6>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
      <div className={styles.dataAnalysis}>
        <div className={styles.dataAnalysisCard}>
          <p>Total Revenue &middot; 2025/2026</p>
          <div className={styles.dataAnalysisCardBody}>
            <ResponsiveContainer width="100%" height={190}>
              <AreaChart data={TotalRevenue}>
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
                  tickFormatter={(v) => `₦${v / 1000000}m`}
                />

                <CartesianGrid
                  strokeDasharray="2, 2"
                  stroke="rgba(90, 236, 90, 0.09)"
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
          <p>Total Expenses &middot; 2025 / 2026</p>
          <div className={styles.dataAnalysisCardBody}>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie
                  data={expenses}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  strokeWidth={0}
                >
                  {expenses.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIECOLOUR[index % PIECOLOUR.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: "100px",
                    rowGap: "10px",
                  }}
                  verticalAlign="middle"
                  layout="vertical"
                  align="left"
                />
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.dataAnalysis}>
        <div className={styles.dataAnalysisCard}>
          <p>Product Category Revenue &middot; 2025/2026</p>
          <div className={styles.dataAnalysisCardBody}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                barSize={10}
                data={ProductCategoryRevenue}
                margin={{ left: -20 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#475569", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#475569", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₦${v / 1000000}m`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  content={<CustomTooltip />}
                />
                <CartesianGrid
                  strokeDasharray="2 2"
                  stroke="rgba(250,249,249,0.09)"
                />
                <Bar radius={[4, 4, 0, 0]} dataKey="value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className={styles.dataAnalysisCard}>
          <p>Merchant Revenue &middot; 2025/2026</p>

          <div className={styles.dataAnalysisCardBody}>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={MerchantRevenue}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  strokeWidth={0}
                >
                  {MerchantRevenue.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIECOLOUR[index % PIECOLOUR.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{
                    fontSize: "10px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    maxWidth: "100px",
                    rowGap: "10px",
                  }}
                  layout="vertical"
                  verticalAlign="middle"
                  align="left"
                />
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Table
        headers={headers}
        rows={newOrdersRow.slice(0, 5)}
        label="Recent &middot; Orders"
        type="overview"
      />
    </>
  );
}

function Products() {
  const [products, setProducts] = useState(() => {
    try {
      const allProducts = localStorage.getItem("allProduct");

      return allProducts ? JSON.parse(allProducts) : [];
    } catch (error) {

      console.log(`Unable to parse Products`);
      console(error)
      return []
    }
  });
  const [search, setSearch] = useState("");

  return (
    <>
      <div className={`${styles.overviewheading} ${styles.topBarDiv}`}>
        <h3>Products</h3>
        <p>{products?.length} total products</p>
      </div>

      <div>
        <div className={styles.productBtn}></div>
      </div>
    </>
  );
}

function Customers() {
  return (
    <div>
      <h3>Customer section is coming soon ...</h3>
    </div>
  );
}

function Order() {

  const headers = [
    "MERCHANT_ID",
    "REFERENCE_ID",
    "PRODUCT_ID",
    "PRODUCT_NAME",
    "QUANTITY",
    "PRICE",
    "PRODUCT_IMAGE",
    "STATUS",
    "UPDATE STATUS"
  ];
  const actions = [
    { name: "shipped", label: "shipped" },
    { name: "Processing", label: "Processing" },
    { name: "Delivered", label: "Delivered" },
  ];
  const orderBtn = [
    { id: "all", label: "All" },
    { id: "processing", label: "Processing" },
    { id: "pending", label: "Pending" },
    { id: "delivered", label: "Delivered" },
    { id: "disputed", label: "Disputed" },
    { id: "resolved", label: "Resolved" },
  ];

  const [orderStatus, setOrderStatus] = useState("all");

  const [orderItems, setOrderItems] = useState(() => {
    try {
      const allOrderItems = localStorage.getItem("allOrderItems");
      return allOrderItems ? JSON.parse(allOrderItems) : [];
    } catch (error) {
      console.log(`Unable to parse Orders`,error);
      console.error(error);
      return [];
    }
  });

  const [search, setSearch] = useState("");

  const filterorderItem = orderItems?.filter((o) => {
    const statusMatch =
      orderStatus === "all" || o.delivery_status === orderStatus;
    const searchMatch =
      o.merchantPID?.toLowerCase().includes(search.toLowerCase()) ||
      o.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.order_id?.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <>
      <div className={`${styles.overviewheading} ${styles.topBarDiv}`}>
        <h3>Orders</h3>
        <p>{orderItems?.length} total orders</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }} className={styles.orderbtn}>
        {orderBtn &&
          orderBtn.map((btn) => (
            <button
              className={
                orderStatus === btn.id
                  ? styles.isActiveStyle
                  : styles.isNotActiveStyle
              }
              key={btn.id}
              onClick={() => setOrderStatus(btn.id)}
            >
              {btn.label}
            </button>
          ))}
      </div>

      <input
        className={styles.searchInput}
        type="search"
        placeholder="Search Merchant, Order ID or Product Name"
        value={search}
        onChange={(e) => setSearch(e.target.value.trimStart())}
      />

      <Table
        label="Orders Items &middot; Table"
        headers={headers}
        rows={filterorderItem}
        type="orders"
        actions={actions}
      />
    </>
  );
}

function Inbox() {
  return (
    <div>
      <h3>Inbox section is coming soon ...</h3>
    </div>
  );
}

function Filemanager() {
  return (
    <>
      <div>
        <h3> File Manager section is coming soon ...</h3>
      </div>
    </>
  );
}

function Settings() {
  return (
    <div>
      <h3>Settings section is coming soon ...</h3>
    </div>
  );
}

const SECTIONS = {
  overview: <Overview />,
  products: <Products />,
  customers: <Customers />,
  order: <Order />,
  inbox: <Inbox />,
  filemanager: <Filemanager />,
  settings: <Settings />,
};

function Links() {
  const [activeId, setActiveId] = useState("overview");

  const sidebarList = [
    { id: "overview", label: "Overview", icon: "⬡" },
    { id: "products", label: "Products", icon: "📚" },
    { id: "customers", label: "Customers", icon: "👥" },
    { id: "order", label: "Orders", icon: "◈" },
    { id: "inbox", label: "Inbox", icon: "📩" },
    { id: "filemanager", label: "File Manager", icon: "📂" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];
  return (
    <div className={styles.container}>
      {/* SideBard */}
      <div className={styles.sidebar}>
        <div className={styles.logosection}>
          <div className={styles.logo}>
            Link<span style={{ color: "#00ff88" }}>styles</span>
          </div>
          <div className={styles.merchant}>ADMIN</div>
        </div>

        <div>
          {sidebarList &&
            sidebarList?.map((sidebar) => (
              <div key={sidebar.id} className={styles.listing}>
                <button
                  onClick={() => setActiveId(sidebar.id)}
                  className={
                    activeId ? styles.isActiveStyle : styles.isNotActiveStyle
                  }
                >
                  <span>{sidebar.icon}</span>
                  {sidebar.label}
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Main */}

      <main className={styles.main}>
        <div className={styles.topBarDiv}>
          <div className={styles.topdivLinks}>
            <p>LINKSTYLES &middot; ADMIN PORTAL</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div className={styles.ball}></div>
            <div className={styles.onlinestore}>STORE ONLINE</div>
          </div>
        </div>

        {SECTIONS[activeId]}
      </main>
    </div>
  );
}

export default Links;
