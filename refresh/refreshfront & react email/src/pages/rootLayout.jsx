import React from "react";
import Header from "../components/header";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "#333", color: "white" }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
