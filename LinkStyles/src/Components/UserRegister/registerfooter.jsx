const RegisterFooter = () => {

    const QuickLinks = [{name: "Shop Now", link: "/clothes"}, {name: "My Orders", link: "#"}, {name: "New Arrivals", link: "/clothes"}]
    const contact = [{name: "Privacy Policy", link: "#"}, {name: "Terms of Use", link: "#"}, {name: "Contact Us", link: "/contact"}, { name: "About Us", link: "/aboutus"}]
    return (
        <footer style={{ background: "#111", borderTop: "1px solid #1f1f1f", padding: "32px" }}>

            {/* Top Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", marginBottom: "24px" }}>

                <div>
                    <p style={{ fontSize: "10px", letterSpacing: "2px", color: "#e63946", textTransform: "uppercase", marginBottom: "10px", fontWeight: "500" }}>Linkstyles</p>
                    <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.8" }}>Nigeria's fashion destination for modern styles and trending fits.</p>
                </div>

                <div>
                    <p style={{
                        fontSize: "10px",
                        letterSpacing: "2px",
                        color: "#e63946",
                        textTransform: "uppercase",
                        marginBottom: "10px",
                        fontWeight: "500"
                    }}>Quick Links</p>
                    {QuickLinks.map((quicklink, idx) => (
                        <a key={idx} href={quicklink.link} 
                        style={{ display: "block", fontSize: "12px", color: "#555", textDecoration: "none", lineHeight: "2" }}>{quicklink.name}</a>
                    ))}
                </div>

                <div>
                    <p style={{ fontSize: "10px", letterSpacing: "2px", color: "#e63946", textTransform: "uppercase", marginBottom: "10px", fontWeight: "500" }}>Support</p>
                    {contact.map((cont, idx) => (
                        <a key={idx} href={cont.link} style={{ display: "block", fontSize: "12px", color: "#555", textDecoration: "none", lineHeight: "2" }}>{cont.name}</a>
                    ))}
                </div>

            </div>

            {/* Bottom Bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "20px", borderTop: "1px solid #1a1a1a" }}>

                <div style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "3px", color: "#fff" }}>
                    LINK<span style={{ color: "#e63946" }}>STYLES</span>
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                    {["Privacy", "Terms", "Support"].map((link) => (
                        <a key={link} href="#" style={{ fontSize: "11px", color: "#555", textDecoration: "none", letterSpacing: "1px", textTransform: "uppercase" }}>{link}</a>
                    ))}
                </div>

                <p style={{ fontSize: "11px", color: "#333" }}>© {new Date().getFullYear()} Linkstyles Nigeria</p>

            </div>

        </footer>
    );
};

export default RegisterFooter;