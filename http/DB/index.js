console.log("Hello from node.js with db");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mahmoudjsdev:node.js_123@learn-mongo-db.fa990.mongodb.net/mahmoudzone?retryWrites=true&w=majority&appName=learn-mongo-db"
  )
  .then(() => {
    console.log("connected Successfully ");
  })
  .catch((err) => {
    console.log(err);
  });
// "mongodb+srv://mahmoudjsdev:node.js_123@learn-mongo-db.fa990.mongodb.net/mahmoudzone?retryWrites=true&w=majority&appName=learn-mongo-db"
// here i connected to database directly
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("home page");
});

const coursesRouter = require("./routes/courses.route");
app.use("/api/courses", coursesRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
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
