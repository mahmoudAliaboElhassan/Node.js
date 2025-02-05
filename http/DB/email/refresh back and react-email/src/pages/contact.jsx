import React from "react";
import Dashboard from "../components/dashboard";
import Login from "../components/login";

function Contact() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Lets Contact How do you take Your Coffee</h1>
      <h3>here is my contact Links</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: "13px",
          fontSize: "25px",
        }}
      >
        <a
          href="https://www.facebook.com/profile.php?id=100075492203648"
          target="_blank"
          style={{
            textDecoration: "none",
            color: "inherit",
            margin: "5px 3px",
          }}
        >
          <i class="fab fa-facebook-square"></i> Facebook
        </a>
        <a
          href="https://github.com/mahmoudAliaboElhassan"
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i class="fab fa-github"></i> Github
        </a>
        <a
          href="https://www.linkedin.com/in/mahmoud-ali-a99713237/"
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i class="fa-brands fa-linkedin"></i> Linkedin
        </a>
        <a
          href="mailto:ml6893254@gmail.com"
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i class="fas fa-at"></i> mail
        </a>
        <a
          href="tel:0115281902"
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <i class="fas fa-mobile-alt"></i> Call me
        </a>
      </div>
      <Dashboard />
      <Login/>
    </div>
  );
}

export default Contact;
