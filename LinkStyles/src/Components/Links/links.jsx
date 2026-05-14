import React, { useContext, useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, BarChart, PieChart, Cell, XAxis, YAxis, Pie, Legend, Bar, Area, Tooltip, CartesianGrid } from "recharts";

import styles from './links.module.css'

// Recreate dashboard
// Create section to update users function User ==> Merchant ===> To Admin
// Create table to get all product and filter all that belongs to specific merchant
// Create Merchant Wallet management






function Table() {
    return (
        <>
            <div>
                <h3>
                    Table
                </h3>
            </div>
        </>
    )
}

function Overview() {

    // Digital analysis List of Customers, List of Merchants, 
    // All Merchants total Sales, Merchants Revenue/day, Total Product, Total Order Per/day and Week
    //  Notification, Withdrawal Request
    // 
    // Customer Sales

    // id: "revenue", name: "Total Revenue", value: 562000, justification: "+18% this month", color: "green", icon: "₦" 


    const overviewData = [
        { id: "revernue", label: "Total Revenue", value: 12000000, justification: "10% more total", color: "green", icon: "₦" },
        { id: "customers", label: "Customers", value: 4, justification: "+1 new user", color: "green", icon: "👥" },
        { id: "merchants", label: "merchants", value: 2, justification: "+1 new merchant", color: "orange", icon: "👤" },
        { id: "sales", label: "Sales", value: 142000, justification: "2% more than yesterday", color: "green", icon: "📈" },
        { id: "orders", label: "Orders", value: 26, justification: "From 12am till Now", color: "#3074e0", icon: "◈" },
        { id: "inbox", label: "Inbox", value: 8, justification: "All for the Month", color: "orange", icon: "📩" },
        { id: "withdrawal", label: "Withdrawal Request", value: 5, justification: "Pending Withdrawal", color: "#717CFA", icon: "💳" },
    ]

    // Area Chart
    const TotalRevenue = [
        { month: "Nov", revenue: 1360000 },
        { month: "Dec", revenue: 1450000 },
        { month: "Jan", revenue: 1510000 },
        { month: "Feb", revenue: 1980000 },
        { month: "Mar", revenue: 1450000 },
        { month: "Apr", revenue: 2450000 },
        { month: "Apr", revenue: 1800000 },
    ]
    // PieChart
    const expenses = [
        { name: "Platform Fees", value: 45000 },
        { name: "Logistics", value: 120000 },
        { name: "Marketing", value: 80000 },
        { name: "Refunds", value: 35000 },
        { name: "Packaging", value: 25000 },
        { name: "Customer Support", value: 18000 },
    ]

    // barchart
    const ProductCategoryRevenue = [
        { name: "Electronic", value: 4200000 },
        { name: "Fashions", value: 2800000 },
        { name: "Clothing", value: 1600000 },
        { name: "Furniture", value: 1200000 },
        { name: "Beauty", value: 850000 },
        { name: "Accessories", value: 650000 },
        { name: "Food", value: 700000 },

    ]

    // BarChart
    const MerchantRevenue = [
        { name: "Admin", revenue: 4800000 },
        { name: "Elizabeth", revenue: 4000000 },
        { name: "Yunus", revenue: 3200000 },
    ]


    function CustomTooltip({ active, payload, label }) {
        if (active && payload?.length) {
            return (
                <div className={styles.TooltipContainer}>
                    <p style={{ fontSize: "11px", color: "#00ff88", }}>
                        {label}
                    </p>
                    <p style={{ color: "#e2e8f0" }}>
                        ₦{payload[0].value.toLocaleString()}
                    </p>
                </div>
            )
        }
        return null
    }

    function OrderTooltip({ active, payload, label }) {

        if (active && payload?.length) {
            return (
                <div className={styles.TooltipContainer}>
                    <p style={{ color: "#60a5fa", }}>{label}</p>
                    <p style={{ color: "#e2e8f0" }}>{payload[0].value} orders</p>
                </div>
            )
        }
        return null
    }

    function PieTooltip({ active, payload, label }) {
        if (active && payload?.length) {
            const data = payload[0]
            return (
                <div className={styles.TooltipContainer}>
                    <p style={{ color: "green", marginBottom: "10px" }}>{data.name}</p>

                    <p style={{ color: "white" }}>{`₦${data.value.toLocaleString()}`}</p>
                </div>
            )
        } else {
            return null
        }
    }

    const PIECOLOUR = ["#00ff88", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa", "#fb923c"]

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
                    <div

                        className={styles.dataAnalysisCardBody}>

                        <ResponsiveContainer width="100%" height={190}>
                            <AreaChart data={TotalRevenue} >
                                <defs>
                                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00ff88" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month"
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
                                    stroke="rgba(90, 236, 90, 0.09)" />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="revenue"
                                    stroke="#00ff88" strokeWidth={2}
                                    fill="url(#revenueGradient)" />
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
                                        <Cell key={index} fill={PIECOLOUR[index % PIECOLOUR.length]} />
                                    ))}

                                </Pie>
                                <Legend
                                    wrapperStyle={{ fontSize: "10px", whiteSpace: "normal", 
                                        wordWrap: "break-word", 
                                        maxWidth: "100px", rowGap: "10px"}}

                                    verticalAlign="middle"

                                    layout="vertical"
                                    align="left"
                                />
                                <Tooltip content={< PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer >

                    </div>

                </div>





            </div>

            <div className={styles.dataAnalysis}>

                <div className={styles.dataAnalysisCard}>
                    <p>Product Category Revenue &middot; 2025/2026</p>
                    <div

                        className={styles.dataAnalysisCardBody}>

                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart barSize={10} data={ProductCategoryRevenue} margin={{ left: -20 }}>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#475569", fontSize: 9 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis tick={{ fill: "#475569", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(v) => `₦${v / 1000000}m`}

                                />
                                <Tooltip cursor={{ fill: "rgba(255,255,255,0.02)" }} content={<CustomTooltip />} />
                                <CartesianGrid strokeDasharray="2 2" stroke="rgba(250,249,249,0.09)" />
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
                                        <Cell key={index} fill={PIECOLOUR[index % PIECOLOUR.length]} />
                                    ))}

                                </Pie>
                                <Legend
                                     wrapperStyle={{ fontSize: "10px", whiteSpace: "normal", 
                                        wordWrap: "break-word", 
                                        maxWidth: "100px", rowGap: "10px"}}
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
        </>
    )
}



function Products() {
    return (
        <div>
            <h3>Products</h3>
        </div>
    )
}


function Customers() {
    return (
        <div>
            <h3>Customer</h3>
        </div>
    )
}



function Order() {
    return (
        <div>
            <h3>Orders</h3>
        </div>
    )
}


function Inbox() {

    return (
        <div>
            <h3>Inbox</h3>
        </div>
    )
}


function Filemanager() {

    return (
        <>
            <div>
                <h3> File Manager</h3>
            </div>

        </>
    )
}



function Settings() {
    return (
        <div>
            <h3>Settings</h3>
        </div>
    )
}


const SECTIONS = {
    overview: <Overview />,
    products: <Products />,
    customers: <Customers />,
    order: <Order />,
    inbox: <Inbox />,
    filemanager: <Filemanager />,
    settings: <Settings />
}

function Links() {


    const [activeId, setActiveId] = useState("overview")

    const sidebarList = [
        { id: "overview", label: "Overview", icon: "⬡" },
        { id: "products", label: "Products", icon: "📚" },
        { id: "customers", label: "Customers", icon: "👥" },
        { id: "order", label: "Orders", icon: "◈" },
        { id: "inbox", label: 'Inbox', icon: "📩" },
        { id: "filemanager", label: "File Manager", icon: "📂" },
        { id: "settings", label: "Settings", icon: "⚙️" },
    ]
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
                    {sidebarList && sidebarList?.map((sidebar) =>
                        <div
                            key={sidebar.id}
                            className={styles.listing}>

                            <button
                                onClick={() => setActiveId(sidebar.id)}
                                className={activeId ? styles.isActiveStyle : styles.isNotActiveStyle}
                            >
                                <span>{sidebar.icon}</span>
                                {sidebar.label}
                            </button>
                        </div>


                    )}

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
    )
}




// function Links() {
//     const navigate = useNavigate()
//     const { user, setUser, isVerify } = useContext(LoginContext);
//     const [menu, setMenu] = useState(true)
//     const [ProductsMenu, setProductsMenu] = useState(false)
//     const [customerMenu, setCustomerMenu] = useState(false)
//     const [orderMenu, setOrderMenu] = useState(false)
//     const [inboxMenu, setInboxMenu] = useState(false)
//     const [filemanagerMenu, setFilemanagerMenu] = useState(false)



//     const [adminMail, setAdminMail] = useState("");
//     const [produceProductCount, setProduceProductCount] = useState(null);
//     const [userCount, setUserCount] = useState(null);

//     const URL = import.meta.env.VITE_APP_URL;

//     isVerify()


//     const states = [
//         { name: "Lagos", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         { name: "Abuja", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         { name: "Enugu", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         { name: "Kano", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         { name: "Ekiti", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         { name: "Kwara", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Rivers", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Kaduna", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Oyo", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Osun", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Ondo", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Delta", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Cross River", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Akwa Ibom", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Bayelsa", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Edo", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Plateau", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Nasarawa", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Taraba", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Adamawa", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Yobe", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Borno", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Gombe", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Bauchi", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Jigawa", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Kebbi", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Sokoto", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Zamfara", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Niger", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Katsina", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Kogi", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Benue", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Imo", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Anambra", image: image1, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Ebonyi", image: image2, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//         // { name: "Abia", image: image3, salesUnit: Math.floor(Math.random() * (999 - 210 + 1)) + 210 },
//     ];


//     const Countries = [
//         { name: "Qatar", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         { name: "Ecuador", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         { name: "Senegal", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         { name: "Netherlands", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         { name: "England", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         { name: "Iran", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "United States", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Wales", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Argentina", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Saudi Arabia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Mexico", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Poland", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "France", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Australia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Denmark", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Tunisia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Spain", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Germany", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Japan", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Costa Rica", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Belgium", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Canada", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Morocco", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Croatia", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Brazil", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Serbia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Switzerland", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Cameroon", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Portugal", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Uruguay", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "South Korea", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Ghana", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Italy", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Greece", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Thailand", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Turkey", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Malaysia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Indonesia", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Philippines", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Vietnam", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "China", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "India", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Russia", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "South Africa", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Egypt", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Kenya", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Singapore", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Hong Kong", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "New Zealand", image: image4, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Pakistan", image: image5, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//         // { name: "Bangladesh", image: image6, salesUnit: Math.floor(Math.random() * (19999 - 7999 + 1)) + 7999 },
//     ];



//     useEffect(() => {
//         fetch(`${URL}/api/v1/getusers`)
//             .then((res) => res.json())
//             .then((data) => {
//                 localStorage.setItem("usercounts", JSON.stringify(data));
//                 setUserCount(data.length);
//             })
//             .catch((err) => console.error(err));

//         const productLength = localStorage.getItem("productlength");
//         setProduceProductCount(productLength);

//         const userDetail = localStorage.getItem("data");
//         if (userDetail) {
//             setUser(JSON.parse(userDetail));
//         }
//     }, [setUser]);

//     useEffect(() => {
//         if (user?.role_name) {
//             setAdminMail(user.role_name.toUpperCase());
//         }
//     }, [user]);



//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentDay = now.getDate();
//     const currentMonth = now.toLocaleString("default", { month: "long" });
//     const weekday = now.toLocaleString("default", { weekday: "long" });


//     return (

//         <>
//             <div className={styles.bodyContainer}> {/* the main Dashboard with sub dashboard and navbar*/}

//                 <div className={styles.subBodyContainer}>
//                     <div className={styles.navbar}> {/*The Side Navbar for the Navigation to different pages*/}
//                         <h3 className={`${styles.logo} ${styles.navLinks}`}>Link Styles</h3>
//                         <div className={styles.navbar}>
//                             <h3
//                                 onClick={() => setMenu(!menu)}
//                                 className={styles.menuStyle}
//                             >
//                                 Menu
//                             </h3>

//                             <nav className={menu ? styles.open : styles.close}>
//                                 <ul >
//                                     <li onClick={() => {
//                                         setProductsMenu(!ProductsMenu),
//                                             setCustomerMenu(false),
//                                             setFilemanagerMenu(false),
//                                             setInboxMenu(false)
//                                         setOrderMenu(false)


//                                     }}>
//                                         Products {ProductsMenu ? "✖️" : "➡️"}
//                                         <ul className={`${ProductsMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
//                                             <li>Product List</li>
//                                             <li>Product</li>
//                                             <li>Categories list</li>
//                                             <li>Category</li>
//                                         </ul>
//                                     </li>

//                                     <li onClick={() => {
//                                         setCustomerMenu(!customerMenu),
//                                             setProductsMenu(false),
//                                             setFilemanagerMenu(false),
//                                             setInboxMenu(false),
//                                             setOrderMenu(false)



//                                     }}>
//                                         Customers {customerMenu ? "✖️" : "➡️"}
//                                         <ul className={`${customerMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
//                                             <li>Customer List
//                                                 &nbsp;  <small style={{ color: "green" }}>{produceProductCount}</small> {/*TO be Adjusted later*/}
//                                             </li>
//                                             <li>Customers

//                                             </li>
//                                             <li>Partners
//                                                 &nbsp;  <small style={{ color: "green" }}>{userCount}</small> {/*TO be Adjusted later*/}
//                                             </li>

//                                         </ul>
//                                     </li>
//                                     <li onClick={() => {
//                                         setOrderMenu(!orderMenu),
//                                             setCustomerMenu(false),
//                                             setProductsMenu(false),
//                                             setFilemanagerMenu(false),
//                                             setInboxMenu(false)


//                                     }

//                                     }>
//                                         Order {orderMenu ? "✖️" : "➡️"}
//                                         <ul className={`${orderMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
//                                             <li>Order List
//                                                 &nbsp;   <small style={{ color: "green" }}>7846</small>
//                                             </li>
//                                             <li>Pending Orders
//                                                 &nbsp; <small style={{ color: "green" }}>58</small>
//                                             </li>
//                                             <li>Completed ✅
//                                                 <small style={{ color: "green", }}>7486</small>
//                                             </li>
//                                             <li>Cancelled
//                                                 &nbsp; <small style={{ color: "red" }}>320</small></li>
//                                             <li>Orders Detail</li>
//                                         </ul>
//                                     </li>


//                                     <li onClick={() => {
//                                         setInboxMenu(!inboxMenu),
//                                             setOrderMenu(false),
//                                             setCustomerMenu(false),
//                                             setProductsMenu(false),
//                                             setFilemanagerMenu(false)


//                                     }

//                                     }>
//                                         Inbox {inboxMenu ? "✖️" : "➡️"}
//                                         <ul className={`${inboxMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
//                                             <li>Notification
//                                                 &nbsp;  <small style={{ color: "green" }}>12</small>
//                                             </li>
//                                             <li>Pending Message
//                                                 &nbsp;   <small style={{ color: "green" }}>2</small>
//                                             </li>

//                                         </ul>
//                                     </li>

//                                     <li onClick={() => {
//                                         setFilemanagerMenu(!filemanagerMenu),
//                                             setInboxMenu(false),
//                                             setOrderMenu(false),
//                                             setCustomerMenu(false),
//                                             setProductsMenu(false)
//                                     }
//                                     }>
//                                         File Manager {filemanagerMenu ? "✖️" : "➡️"}
//                                         <ul className={`${filemanagerMenu ? styles.catopen : styles.catclose} ${styles.listNav}`}>
//                                             <li onClick={() => navigate(`/link/admin/addproduct`)}>Add Product</li>
//                                             <li>Remove Product</li>
//                                             <li>Edit Product</li>
//                                             <li>Create New Category</li>
//                                         </ul>
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </div>

//                         <div className={styles.moreSetting}>
//                             Settings
//                         </div>
//                     </div>

//                     <div className={styles.mainDashboard}>


//                         <div className={styles.headerDiv1}> {/* the header horizontal navbar*/}
//                             <div className={styles.headerMenu}>
//                                 <li>Home</li> <b></b> <li>Store</li> <b></b> <li>Private</li>

//                             </div>

//                             <div style={{ width: "200px", height: "60px" }}>

//                                 <img src={image1} width="100%" height="100%" alt="" />
//                             </div>
//                             <div style={{ width: "200px", height: "60px" }}>

//                                 <img src={image2} width="100%" height="100%" alt="" />
//                             </div>
//                             <div style={{ width: "200px", height: "60px" }}>

//                                 <img src={image1} width="100%" height="100%" alt="" />
//                             </div>

//                             {user ?

//                                 <div className={styles.profileClockContainer}>


//                                     <h5 >
//                                         🗓️ {currentDay} {weekday} {currentMonth}, {currentYear}
//                                     </h5>
//                                     &nbsp; <img src={user.profilepicture} width="100px" height="auto"
//                                         style={{ borderRadius: "50%" }}
//                                         alt="" />

//                                     <div className={styles.admindetail}>
//                                         <h5>{user ? <>{user.first_name}.{user.middle_name}</> : "Yunus Oluwadamilare"}</h5>
//                                         <h5 >{adminMail}</h5>

//                                     </div>


//                                 </div>

//                                 :

//                                 <div className={styles.profileClockContainer}>


//                                     <h5 >
//                                         🗓️ {currentDay} {weekday} {currentMonth}, {currentYear}
//                                     </h5>
//                                     &nbsp; <img src={profile} width="100px" height="auto"
//                                         style={{ borderRadius: "50%" }}
//                                         alt="" />

//                                     <div className={styles.admindetail}>
//                                         <h5>Yunus Oluwadamilare</h5>
//                                         <h5>Acting Manager</h5>

//                                     </div>


//                                 </div>
//                             }

//                         </div>




//                         <hr />


//                         <div className={styles.headerDiv2}> {/* for no of users, store overview and refresh botton on the website*/}


//                             <div className={styles.card}>
//                                 <div className={styles.cardbody}>
//                                     <img src={image1} alt="" /> &nbsp; <b>Orders Provided</b>
//                                 </div>

//                                 <hr />

//                                 <div className={styles.cardDetail}>
//                                     <div>
//                                         <h3>210</h3> <p>Processing</p>
//                                     </div>
//                                     <div>
//                                         <h3>174</h3> <p>Processed</p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <div className={styles.card}>
//                                 <div className={styles.cardbody}>
//                                     <img

//                                         src={image1} alt="" /> &nbsp; <b>Store Products</b>
//                                 </div>

//                                 <hr />

//                                 <div className={styles.cardDetail}>
//                                     <div>
//                                         <h3>{produceProductCount}k</h3> <p>Total</p>
//                                     </div>
//                                     <div>
//                                         <h3>1654</h3> <p>Sold Out</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={styles.card}>
//                                 <div className={styles.cardbody}>
//                                     <img src={image1} alt="" /> &nbsp; <b>Orders Imported</b>
//                                 </div>

//                                 <hr />

//                                 <div className={styles.cardDetail}>
//                                     <div>
//                                         <h3>439</h3> <p>New</p>
//                                     </div>
//                                     <div>
//                                         <h3>174</h3> <p>Total</p>
//                                     </div>
//                                 </div>
//                             </div>


//                             <div className={styles.card}>
//                                 <div className={styles.cardbody}>
//                                     <img src={image1} alt="" /> &nbsp; <b>Orders Dispatched</b>
//                                 </div>

//                                 <hr />

//                                 <div className={styles.cardDetail}>
//                                     <div>
//                                         <h3>734</h3> <p>Total</p>
//                                     </div>
//                                     <div>
//                                         <h3>31</h3><p>Returned</p>
//                                     </div>
//                                 </div>
//                             </div>


//                         </div>



//                         <hr />
//                         <div className={styles.headerDiv3}>


//                             <div

//                                 className={styles.EachSubHeaderCard}>

//                                 <div
//                                     className={styles.cardTitle}>
//                                     <h3>Sales by States</h3> <h5 style={{ textDecoration: "underline" }}>View All</h5>
//                                 </div>
//                                 <hr />

//                                 <div className={styles.cardcontainer}>

//                                     {states && states.map((state, i) =>

//                                     (
//                                         <div key={i} className={styles.card}>
//                                             <div className={styles.cardbody}>
//                                                 <img src={state.image} alt={state.name + `logo`} />
//                                                 <h5>{state.name}</h5>
//                                                 <h5>{state.salesUnit} &nbsp; <small>Products</small></h5>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>


//                             </div>

//                             <div className={styles.EachSubHeaderCard}>
//                                 <div
//                                     className={styles.cardTitle}>
//                                     <h3>Sales by Country</h3> <h5 style={{ textDecoration: "underline" }}>View All</h5>
//                                 </div>

//                                 <hr />

//                                 <div className={styles.cardcontainer}>

//                                     {Countries && Countries.map((country, i) =>

//                                     (
//                                         <div key={i} className={styles.card}>
//                                             <div className={styles.cardbody}>
//                                                 <img src={country.image} alt="" />
//                                                 <h5>{country.name}</h5>
//                                                 <h5>{country.salesUnit} &nbsp; <small>Products</small></h5>
//                                             </div>
//                                         </div>
//                                     ))}

//                                 </div>


//                             </div>




//                         </div>
//                         <div className={styles.headerDiv4}> {/* for no of users, store overview and refresh botton on the website*/}

//                             <div className={styles.EachSubHeaderCard}>

//                             </div>

//                             <div className={styles.EachSubHeaderCard}>

//                             </div>

//                         </div>
//                         <div className={styles.headerDiv5}> {/* for no of users, store overview and refresh botton on the website*/}

//                             <div className={styles.EachSubHeaderCard}>

//                             </div>

//                             <div className={styles.EachSubHeaderCard}>

//                             </div>
//                             <div className={styles.EachSubHeaderCard}>

//                             </div>

//                             <div className={styles.EachSubHeaderCard}>

//                             </div>
//                         </div>





//                     </div>
//                 </div>

//             </div>

//             {/* <Merchant owner="ADMIN"/> */}
//         </>

//     )
// }

export default Links