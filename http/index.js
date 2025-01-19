console.log("Hello, world ! from node js");

const http = require("node:http");
const fs = require("node:fs");
const file = fs.readFileSync("./views/index.html", "utf8");
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log("req", req);
  console.log("res", res);
  if (req.url === "/") {
    // res.write("<h1>hi to our home page</h1>");
    res.write(file);
  }
  //   res.end("hello from server !");
  //   res.write("hello from server !");
  //   res.write("<h1>hello world</h1>");
  else {
    res.write(JSON.stringify({ name: "Mahmoud" }));
  }
  res.end();
});

server.listen(5000, "localhost", () => {
  console.log("running on port 5000");
});