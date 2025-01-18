const express = require("express");
const fs = require("fs");
var morgan = require("morgan");

const app = express();
const file = fs.readFileSync("./views/index.html", "utf8");

// app.use(express.static("./views"));

// app.use((req, res, next) => {
//   console.log("middleware 1");
//   console.log("method", req.method, "url", req.url);
//   next();
// });
// // will call second middleware
// app.use((req, res, next) => {
//   console.log("middleware 2");
//   next();
// });

app.use(morgan("dev"));
// next here is a function that will \the next route handler
// or call the next middleware
// if you don't call next the request will be stuck in this middleware

// app.use("/about", (req, res, next) => {
//   console.log("method", req.method, "url", req.url);
//   next();
// });
// "/about" means middleware will run only on /about route

app.get("/", (req, res) => {
  res.send("Hello, world ! from node js");
  // console.log("mehod", req.method, "url", req.url);
  // this is called logger it can be in function and used in all routes
});

app.get("/about", (req, res) => {
  res.send("Hello from about page");
  // res.status(404).send("Not found Route");
});

app.get("/products", (req, res) => {
  res.send([
    { id: 1, name: "product1" },
    { id: 2, name: "product2" },
  ]);
});

app.get("/data", (req, res) => {
  res.send("<h1>data</h1>");
});

app.get("/data2", (req, res) => {
  res.send(file);
});
// problem here is file index.html is read without style and scripts
// but using express.static("./views")
// it will read the file with all styles and scripts

app.listen("5000", () => {
  console.log("running on port 5000");
});

// express fast
// unopinionated means you can do whatever you want with it without any restrictions
// minimalist means it's very small and lightweight and doesn't have a lot of features

// app.use middleware
// app.use((req, res, next) => {
