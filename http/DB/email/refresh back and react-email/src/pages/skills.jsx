import React from "react";

function Skills() {
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
      <h1>Skills</h1>
      <div style={{ maxWidth: "600px", fontSize: "22px", textAlign: "left" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <strong>Frontend:</strong> HTML, CSS, JavaScript, SASS, Bootstrap,
            React-Bootstrap, Material-UI
          </li>
          <li>
            <strong>Libraries/Frameworks:</strong> Axios, Framer Motion, AOS,
            Formik, Yup, i18next
          </li>
          <li>
            <strong>Programming Concepts:</strong> Object-Oriented Programming
            (OOP), Data Structures and Algorithms
          </li>
          <li>
            <strong>Systems:</strong> Operating Systems, Networking
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Skills;
