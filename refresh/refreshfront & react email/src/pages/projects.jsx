import React from "react";

import BondImage from "../assets/Bondi-Design.jpg";
import postCrud from "../assets/post-crud.png";
import leon from "../assets/tem.jpg";
import List from "../assets/To-Do-List.jpg";
import portfolio from "../assets/portfolio.png";
import login from "../assets/login-form.png";

function Projects() {
  const projects = [
    {
      img: BondImage,
      link: "https://github.com/mahmoudAliaboElhassan/Bondi-Design",
    },
    { img: List, link: "https://github.com/mahmoudAliaboElhassan/Tasks-List" },
    {
      img: postCrud,
      link: "https://github.com/mahmoudAliaboElhassan/Posts-Crud",
    },
    {
      img: leon,
      link: "https://github.com/mahmoudAliaboElhassan/Leon-template",
    },
    {
      img: portfolio,
      link: "https://github.com/mahmoudAliaboElhassan/Portfolio-Website",
    },
    {
      img: login,
      link: "https://github.com/mahmoudAliaboElhassan/Login-Form-With-LocalStorage",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "18px" }}>Here is Some Of my Projects</h1>

      <div className="row mb-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="col-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
          >
            <a
              href={project.link}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                width: "100%",
              }}
              target="_blank"
            >
              <div className="card" style={{ flex: 1 }}>
                <img
                  src={project.img}
                  alt={`Project ${index + 1}`}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
