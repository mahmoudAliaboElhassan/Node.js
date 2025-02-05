import React from "react";
import Email from "../components/email.mjs";
import Image from "../assets/mahmoud.jpg";
function Home() {
  return (
    <>
      <h1 className="text-center">welcome to my website</h1>
      <img src={Image} className="img-fluid" loading="lazy" alt="Mahmoud Ali" />
      <h2
        style={{
          textAlign: "center",
          textShadow: " 3px 2px 1px rgba(0,0,0,0.6)",
        }}
      >
        {process.env.REACT_APP_NAME}
        {process.env.REACT_APP_JOB}
      </h2>
      <Email />
    </>
  );
}

export default Home;
