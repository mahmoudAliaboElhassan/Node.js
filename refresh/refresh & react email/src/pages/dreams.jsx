import React from "react";

function Dreams() {
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
      <h1>My Dreams</h1>
      <div style={{ maxWidth: "600px", fontSize: "22px", textAlign: "left" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Work for a Top Tech Company:</strong> I aspire to work for
            one of the leading technology companies in the world, where I can
            contribute to innovative projects and collaborate with top
            professionals in the industry.
          </li>
          <li>
            <strong>Continuous Learning and Advancement:</strong> I aim to
            continuously learn and advance my knowledge in technology, staying
            updated with the latest trends and developments to become an expert
            in my field.
          </li>
          <li>
            <strong>Contribute to Open-Source Projects:</strong> I dream of
            contributing to open-source projects, sharing my skills and
            knowledge with the global developer community, and helping to build
            impactful software solutions.
          </li>
          <li>
            <strong>Make a Positive Impact:</strong> I strive to use my
            technical skills to make a positive impact on society, developing
            solutions that address real-world problems and improve people's
            lives.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dreams;
