console.log("CRUD Operation");

const express = require("express");

const app = express();

app.use(express.json());
// handle body
// or use body-parser package
// npm i body-parser

// validation => express-validator , zod , joi

const courseRouter = require("./routes/courses.route");
// const bookRouter = require("./routes/books.route");
app.get("/", (req, res) => {
  res.send("Hello from node.js");
});
app.use("/api/courses", courseRouter);
// app.use("/api/books", bookRouter);

app.listen(5000, () => {
  console.log("Running on port 5000");
});

// API => application programming interface
// app.get("/api/courses") => resourse
// (req,res)=>{ }       => handler
