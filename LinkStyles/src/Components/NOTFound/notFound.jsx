import React from "react";
import image from './page404.gif'

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <img src={image} alt="" />
      <h2>PAGE UNDER CONSTRUCTION</h2>
      <p>Please Check Back Later.</p>
    </div>
  );
}

export default NotFound;
