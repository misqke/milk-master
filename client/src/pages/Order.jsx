import React, { useEffect } from "react";
import { isAuth } from "../actions/auth";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <h2 className="text-white">Order page comming soon...</h2>
      <Link to="/" className="btn btn-primary">
        back
      </Link>
    </div>
  );
};

export default Order;
