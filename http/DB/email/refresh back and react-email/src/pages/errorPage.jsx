import React from "react";
import errorImage from "../assets/error.png";
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="container">
      <img
        src={errorImage}
        alt="error image"
        loading="lazy"
        className="img-fluid"
      />
      <Link
        to="/"
        style={{
          textDecoration: "none",
          textAlign: "center",
          display: "block",
          fontSize: "25px",
        }}
      >
        go Back
      </Link>
    </div>
  );
}

export default ErrorPage;
