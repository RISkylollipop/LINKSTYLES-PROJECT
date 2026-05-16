import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState();

  useEffect(() => {
    const toggleButtonVisbilty = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener(`scroll`, toggleButtonVisbilty);

    return () => {
      window.removeEventListener(`scroll`, toggleButtonVisbilty);
    };
  }, [scrollY]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function HandleStyle() {
    return {
      position: "fixed",
      bottom: "50px",
      right: "20px",
      maxWidth: "70px",
      borderRadius: "7px",
      zIndex: 1000,
    };
  }

  const scrollButtonStyle = {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    backgroundColor: "#00f0a7",
    color: "#0a0a0f",
    border: "2px solid #00f0a7",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "24px",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(0, 240, 167, 0.4)",
    zIndex: 1000,
    transition: "all 0.3s ease",
  };
  return (
    <>
      {isVisible && (
        <button
          style={scrollButtonStyle}
          onClick={handleBackToTop}
          
        >
          &uarr;
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
