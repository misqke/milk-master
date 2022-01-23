import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center py-3 sticky-top bg-dark"
      style={{ height: "100px" }}
    >
      <Link to="/" className="text-white h1" style={{ textDecoration: "none" }}>
        Milk Master 9000
      </Link>
    </div>
  );
};

export default Header;
