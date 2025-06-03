const crypto = require("node:crypto");
process.env.UV_THREADPOOL_SIZE = 5;
console.log("Thread pool size:", process.env.UV_THREADPOOL_SIZE || 4);

console.log("Hello from session 3");
// libuv is the event loop library that Node.js uses to handle asynchronous operations
// Node.js is single-threaded, but it uses multiple threads in the background to
//  handle asynchronous operations
// asynchronous operation is an operation that runs in the background
// and notifies the main thread when it's done

// const start = performance.now();
// console.log("start", start);
// crypto.pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
// console.log("it took", performance.now() - start, "ms");

// crypto.pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
// console.log("it took", performance.now() - start, "ms");

// crypto.pbkdf2Sync("secret", "salt", 100000, 64, "sha512");
// console.log("it took", performance.now() - start, "ms");

const start = performance.now();
console.log("start", start);
crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("it took", performance.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("it took", performance.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("it took", performance.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("it took", performance.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log("it took", performance.now() - start, "ms");
});

// threadpool is a pool of threads that Node.js uses to execute tasks in the background
// by default, the threadpool has 4 threads
// it is primarily used by libuv to handle asynchronous operations like file system operations,
// network requests, etc.
// its size can be changed using the UV_THREADPOOL_SIZE environment variable
// UV_THREADPOOL_SIZE=5 node index.js
// 1024 threads in the threadpool is the maximum number of threads that can be created in
// a single process
// the threadpool is shared across all Node.js processes
// if it is full, the tasks are queued until a thread becomes available

// The thread pool in Node.js is a collection of threads provided by the libuv library
// to efficiently perform background tasks,
// particularly those that are CPU-bound or require asynchronous I/O operations.
// It allows Node.js to execute tasks concurrently without blocking the main event loop.

// libuv provides the thread pool, which manages a fixed number of threads (default is 4).
// When a task is sent to the thread pool,
// one of the threads executes the task while the main event loop continues processing other events.
// Once the task is completed, the thread pool sends the result back to the event loop,
//  which then invokes the associated callback.

// event loop is the mechanism that allows Node.js to perform non-blocking I/O operations
// by offloading them to the system kernel

// event loop wait for callstack to be empty
// event loop get callback from callback queue and put it in callstack

setTimeout(() => {
  console.log(myvar);
}, 0);

let myvar = "Hello from session 3 again";

// will not give error because of event loop and callback queue and callstack mechanism

// Steps of the Event Loop
// Check Call Stack:

// Executes any synchronous code.

// Once the call stack is empty, it moves to the next step.

// Process Microtasks:

// Executes all tasks in the microtask queue.
// Process Microtasks:
// Executes all tasks in the microtask queue.
// Examples: Promise.then(), Promise.catch().

// Process Tasks:
// Executes tasks from the task queue one by one.
// Examples: setTimeout, setInterval, I/O callbacks.
// Repeat:

// This process continues indefinitely until the program exits.

// phases in callback
// Summary of Callback Queue Phases
// Timers Phase: Executes setTimeout and setInterval.
// I/O Callbacks Phase: Executes I/O-related tasks.
// Check Phase: Executes setImmediate.
// Microtasks: Have the highest priority and run between phases.
// Close Callbacks Phase: Handles cleanup tasks like close events.

// The microtask queue runs outside of the event loop phases
// but has higher priority than tasks in the callback queue.
// Microtasks are executed immediately after the current operation
// and before the event loop moves to the next phase

const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

fs.readFile(__filename, () => {
  console.log("File Read");
  setImmediate(() => {
    console.log("Immediate");
  });
});

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("Next Tick");
});

console.log("End");

const http = require("node:http");
const server = http.createServer((req, res) => {
  res.end("Hello, World!");
});
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
