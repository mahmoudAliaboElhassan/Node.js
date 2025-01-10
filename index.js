// // node.js is open source cross-platform
// // src code is on github
// // open source means code is on github can be pulled and issues can be solved
// // cross platform means it works on all operating systems
// // js runtime environment
// // js runtime components make js works out of the browser to make it work throught runtime environment
// // v8 engine
// // node js make developers can become backend developers
// // backend services , real time application through sockets
// // multiplier games
// // not preferred for things depends on cpu
// // node in cpu get you to node shell
// // REPL => read evaluate print loop
// // like in console
// // console.log("from cmd")

// console.log("Hello, world ! from node js");

// // to make it works node fileName
// // node index.js
// // node.js does not identify document object document.getElementById gives error
// // window is not defined too
// // window ,dom , storage is web API

// // node make us write any js core not web api
// // this here refers to global object
// // even console althought it is web API but it
// // exists in node but its implementation differs

// // file.h => header file
// // node is built on c++ and c++ is the most important language when dealing with operating systems

const os = require("node:os");
// console.log(os.arch());
// console.log(os.platform());
// console.log("cpus", os.cpus());
// console.log("hostname", os.hostname());
// console.log("Network interface", os.networkInterfaces());

// // console.log("hello");

// // node is single threaded
// // concurrency is the ability to run multiple threads
// // node is single threaded but it is non blocking
// // non blocking means it can run multiple tasks at the same time it
// // does not wait for the task to be finished to run another task
// // blocking means it waits for the task to be finished to run another task
// console.log("hello");
const fs = require("node:fs");
// fs.readFile("hello.txt", "utf8", (err, data) => {
//   // utf8 is the encoding of the file
//   if (err) throw err;
//   console.log(data);
// });

// fs.writeFile(
//   "users.json",
//   JSON.stringify([{ id: 1, name: "Mahmoud" }]),
//   //  data written should be string
//   (err, data) => {
//     if (err) throw err;
//     // console.log("file written");
//     // console.log(data);
//   }
// );

// // fs.unlink("users.json", (err) => {
// //   if (err) {
// //     console.log(err);
// //   }
// // });
// console.log(Buffer.from("a").toJSON());
// console.log("utf8 buffer", Buffer.from("hello world", "utf8"));

// // streams is a way to handle reading and writing files
// // in chunks not all at once  => memory efficient and faster than reading all at once
// // fs.createReadStream() => read file in chunks
// // streams are event emitters on("data",()=>{}) , on("end",()=>{})
// // ['readable',"writeable "]
const rstream = fs.createReadStream("hello.txt", "utf8", { highWaterMark: 1 });
const writeStream = fs.createWriteStream("hello2.txt", "utf8");

rstream.on("data", (chunk) => {
  // console.log("Chunk=====================>", chunk);
  writeStream.write("\n==========chunk==========\n");
  writeStream.write(chunk);
});
// best when dealing with large files and videos

// npm is a package manager for node.js to download modules
// npm is exists with node.js when downloading node.js
// npm install  => to install packages
// npm uninstall => to uninstall packages
// npm init => to initialize package.json file
// npm init --yes => to initialize package.json file with default values
// npm registry is the place where all packages are stored

const _ = require("lodash");
console.log("Loadash", _.random(1, 10));
// lodash is a utility library for js to make it easier to
// work with arrays, objects, strings, numbers, functions, collections
// lodash is a collection of functions that makes js easier
// Example usage of lodash functions
let array = [1, 2, 3, 4, 5];

// Shuffle the array
let shuffledArray = _.shuffle(array);
console.log(shuffledArray);
// In the context of Lodash,
//  the _.shuffle function creates a new array with
// the elements of the original array shuffled into a random order.

// Find the maximum value in the array
let maxValue = _.max(array);
console.log(maxValue);

let obj = { a: 1, b: { c: 2 } };
let clonedObj = _.cloneDeep(obj);

// console.log(clonedObj); // Output: { a: 1, b: { c: 2 } }

// // Modifying the cloned object does not affect the original object and
// vice versa
clonedObj.b.c = 3;
console.log(obj.b.c); // Output: 2
console.log(clonedObj.b.c); // Output: 3;
obj.a = "Mahmoud";
console.log("from obj", obj.a); // Output: "Mahmoud"
console.log("from cloned", clonedObj.a); // Output: 1;
// npm --help => to get help
// package to watch for changes in files => nodemon
console.log("Hello, world ! from node js");
// npm i -g nodemon => to install nodemon globally
// nodemon index.js => to run the file with nodemon
// npm i --save-dev nodemon => to install nodemon as a dev dependency
// dev dependency is a dependency that is only used in development not in  production

// to make it as script in package.json file to run it with npm run run:dev
console.log("hello mahmoud ali");

// console application
// cli application
// command line interface
