console.log("Hello from node.js with db");

require("dotenv").config();
// .env file should be in root directory with node modules
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");

// helmet for header configuration
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const httpStatusText = require("./utils/httpStatusText");
const url = process.env.MONGO_URL;
// this wil give error WITHOUT dotenv because environment variables is not loaded
mongoose
  .connect(url)
  .then(() => {
    console.log("connected Successfully ");
  })
  .catch((err) => {
    console.log("err in connection", error);
  });
// "mongodb+srv://mahmoudjsdev:node.js_123@learn-mongo-db.fa990.mongodb.net/mahmoudzone?retryWrites=true&w=majority&appName=learn-mongo-db"
// here i connected to database directly
// console.log("process", process);
const app = express();
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies to be sent and received
  })
);
// look at test component in graduation project to know how token is kept in cookies

// credentials: true: This tells the server to allow credentials (cookies, authorization headers, etc.) to be sent with the request. In particular:

// When you set withCredentials: true on the frontend (as we saw in the axiosInstance), this means that the browser will automatically include cookies in requests made to the server.
// On the backend, the server must also be configured to accept credentials (by setting credentials: true in the CORS configuration). If this is not set, the browser will block the cookies from being sent to the server.

// // app.use(cors()) => to allow all origins
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
console.log("path", path.join(__dirname, "uploads"));
// direname is current directory
// middleware
//make uploads static folder to serve images and files
// express.satatic(directory)
// The directory argument specifies the folder that contains the static files.
// In this case, the uploads directory is being served.
console.log("direname", __dirname);
// path.join() is a method from Node.js's path module.
// It creates a normalized path by combining multiple path segments.
// __dirname is a global variable in Node.js that
//  represents the absolute directory path of the current JavaScript file.
// Combining __dirname with "uploads" gives the absolute path to the uploads folder in your project.
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
// to deal with forms email comes from view
app.get("/", (req, res) => {
  res.send("home page");
});
const Data = require("./models/data.model");

const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");
const userPasswordRouter = require("./routes/users-password.route");
const videoRouter = require("./routes/video.route");
const examRouter = require("./routes/exam.route");
const postRouter = require("./routes/post.route");
const orderRouter = require("./routes/order.route");
const messageRouter = require("./routes/message.route");
const studentRouter = require("./routes/student.route");
const AIRouter = require("./routes/ai.route");

// to make it to specific route
// app.use("/api/courses", cors(), coursesRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/users", cors(), usersRouter);
app.use("/users", userPasswordRouter);
app.use("/api/videos", videoRouter);
app.use("/api/exams", examRouter);
app.use("/api/post", postRouter);
app.use("/api/orders", orderRouter);
app.use("/api/message/send", messageRouter);
app.use("/api/students", studentRouter);
app.use("/api/askAI", AIRouter);

app.all("*", (req, res, next) => {
  // every request will pass through this middleware
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "page not found",
    data: null,
    code: 404,
  });
});
// WILD CARD ROUTE HANDLER => if no route matched this will be executed => 404 page not found
// 404 page not found is not good for api => should be json response with status 404

//global error handler middleware => if error happened in any middleware or route

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode || 500).json({
      status: err.statusText,
      data: { error: err.message },
    });
  } else {
    res.status(500).json({
      status: err.statusText,
      message: err.message,
      code: 500,
      data: null,
    });
  }
});
// error here comes from asyncWrapper.js => next(err) => next(err) => this middleware

app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
});

// const { MongoClient } = require("mongodb");
// const url =
//   "mongodb+srv://mahmoudjsdev:node.js_123@learn-mongo-db.fa990.mongodb.net/?retryWrites=true&w=majority&appName=learn-mongo-db";
// const client = new MongoClient(url);

// const dbName = "mahmoudzone";
// const main = async () => {
//   // connect to database
//   await client.connect;
//   console.log("Connected Successfully");
//   // choose database
//   const db = client.db(dbName);
//   // db.createCollection("ay7haja");

//   // choose collection
//   const collection = db.collection("courses");

//   await collection.insertOne({ title: "new Course", price: 5000 });

//   // Get Query
//   // Get All Courses
//   const data = await collection.find().toArray();
//   console.log(data);
// };
// main();

// REST stands for REpresentational State Transfer.
// It is a standard that guides the design and development
// of processes which enable us interact with data stored on a web servers.

// BSON is binary json
// mongodb no-sql databse => document-oriented based

// mongo atlas instead of downloading mongo
// cluster is like machine deployed to manage db
// password for cluster is => node.js_123
// compass is DBMS like phpmyAdmin
// collection is documents
// object id is unique _id
// project -> cluster -> database -> collection

// if database chosen is not exist it create it
// if collection chosen is not exist it create it
// Mongoose An ODM (Object Data Modeling) library for MongoDB.

// sequelize is ORM for sql databases like mysql, postgresql, sqlite, mssql
// mongoose is ODM for mongodb
// sequelize and mongoose are called drivers for databases  => ORM or ODM
// orm is object relational mapping
// odm is object document mapping

// standarizing response
// jsend => json send => {status: "success", data: {data}}
// success is in request means success in request 200
// fail is in request means error in request 401,403,404
// error is An error occurred in processing the request, i.e. an exception was thrown
// in server means error in server 500

// CORS => Cross-Origin Resource Sharing => security feature in browser
// to prevent requests from different origins => different domains
// to make it to specific origin
// app.get("/products/:id", cors(), function (req, res, next) {
//   res.json({ msg: "This is CORS-enabled for a Single Route" });
// });

// to sepecify sepecific origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );

// express can be api or mvc
// MVC for web only it send view to the server
// view in mvc is server side rendering
// ejs or pug
// template engine

const data = new Data({ firstName: "John", lastName: "Doe" });
console.log("data.fullName");
console.log(data.fullName); // Output: "John Doe"
