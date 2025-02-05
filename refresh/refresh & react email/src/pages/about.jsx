import React from "react";

function About() {
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
      <h1>About Me</h1>
      <div style={{ maxWidth: "600px", fontSize: "22px" }}>
        <p>
          <strong>Mahmoud Ali</strong>
        </p>
        <p>
          Student at the Faculty of Computer and Information Science, Assiut
          University.
        </p>
        <p>Year Four (Information Systems)</p>
        <p>
          I am passionate about technology and software development. I enjoy
          learning new programming languages and frameworks, and I'm always
          looking for opportunities to expand my skill set.
        </p>
        <p>
          In my free time, I like to read tech blogs, contribute to open-source
          projects, and participate in coding challenges. I also enjoy outdoor
          activities like hiking and cycling.
        </p>
        <p>Feel free to connect with me on LinkedIn or GitHub!</p>
      </div>
    </div>
  );
}

export default About;
