import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <button
      onClick={handleBackToTop}
      style={{
        position: "fixed",
        bottom: "36px",
        right: "36px",
        width: "44px",
        height: "44px",
        background: "#1a1a1a",
        color: "#c9a96e",
        border: "1px solid #c9a96e",
        borderRadius: "50%",
        fontSize: "18px",
        cursor: "pointer",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "#c9a96e";
        e.currentTarget.style.color = "#1a1a1a";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "#1a1a1a";
        e.currentTarget.style.color = "#c9a96e";
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
};

export default ScrollToTop;