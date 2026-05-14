import React, { useContext, useEffect, useState } from "react";
import {
  ResponsiveContainer,AreaChart,BarChart, PieChart, Cell,
  XAxis,YAxis,Pie,Legend,Bar,Area,Tooltip,CartesianGrid } from "recharts";

import styles from "./links.module.css";

// Recreate dashboard
// Create section to update users function User ==> Merchant ===> To Admin
// Create table to get all product and filter all that belongs to specific merchant
// Create Merchant Wallet management

function Table() {
  return (
    <>
      <div>
        <h3>Table</h3>
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

  // id: "revenue", name: "Total Revenue", value: 562000, justification: "+18% this month", color: "green", icon: "₦"

  const overviewData = [
    { id: "revernue",label: "Total Revenue",value: 12000000,justification: "10% more total",color: "green",icon: "₦"},
    { id: "customers",label: "Customers",value: 4,justification: "+1 new user",color: "green", icon: "👥" },
    { id: "merchants", label: "merchants", value: 2,justification: "+1 new merchant",color: "orange",icon: "👤"},
    { id: "sales",label: "Sales",value: 142000,justification: "2% more than yesterday",color: "green",icon: "📈"},
    { id: "orders", label: "Orders",value: 26,justification: "From 12am till Now", color: "#3074e0",icon: "◈"},
    { id: "inbox",label: "Inbox",value: 8,justification: "All for the Month", color: "orange", icon: "📩"},
    {id: "withdrawal",label: "Withdrawal Request", value: 5,justification: "Pending Withdrawal",color: "#717CFA", icon: "💳"},
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

  const PIECOLOUR = ["#00ff88","#60a5fa","#fbbf24", "#f87171",  "#a78bfa",  "#fb923c",];

  return (
    <>
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

      <Table />
    </>
  );
}

function Products() {
  return (
    <div>
      <h3>Products</h3>
    </div>
  );
}

function Customers() {
  return (
    <div>
      <h3>Customer</h3>
    </div>
  );
}

function Order() {
  return (
    <div>
      <h3>Orders</h3>
    </div>
  );
}

function Inbox() {
  return (
    <div>
      <h3>Inbox</h3>
    </div>
  );
}

function Filemanager() {
  return (
    <>
      <div>
        <h3> File Manager</h3>
      </div>
    </>
  );
}

function Settings() {
  return (
    <div>
      <h3>Settings</h3>
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
