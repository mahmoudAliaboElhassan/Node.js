#!/usr/bin/env node
// this is a shebang line that tells the operating system to run this file with node
// shebang line is used to tell the operating system what interpreter to use to run the fil e

import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";

console.log("Mahmoud Ali");
console.log(process.argv);
if (process.argv[2] === "add") {
  console.log("add is selected", process.argv[3]);
}
const program = new Command();
const questions = [
  {
    type: "input",
    name: "title",
    message: "What's your course title?",
    choices: ["HTML", "CSS", "JavaScript"],
  },
  {
    type: "number",
    name: "price",
    message: "What's your course price?",
  },
];
program
  .name("elharam for courses")
  .description("CLI to manage courses")
  .version("1.0.0");

program
  .command("add")
  .alias("a")
  .description("add a new course")
  .argument("<title>", "course title")
  .option("--price <price>", "add course price")
  .action((params, option) => {
    console.log("param", params, "options", option);
  });
program
  .command("list")
  .alias("l")
  .description("list all course")
  .action(() => {
    fs.readFile("./courses.json", "utf-8", (err, fileContent) => {
      if (err) {
        console.log("err", err);
        process.exit();
      }
      console.table(JSON.parse(fileContent));
    });
  });

program
  .command("prompt-question")
  .alias("p")
  .description("prompt question")
  .action(() => {
    inquirer
      .prompt(questions)
      .then((answers) => {
        console.log(answers);
        if (fs.existsSync("./courses.json")) {
          fs.readFile("./courses.json", "utf-8", (err, fileContent) => {
            if (err) {
              console.log("err", err);
              process.exit();
            }
            console.log("file content", fileContent);
            const fileContentasDatatoSendToFile = JSON.parse(fileContent);
            fileContentasDatatoSendToFile.push(answers);
            fs.writeFile(
              "courses.json",
              JSON.stringify(fileContentasDatatoSendToFile, null, 2),
              "utf8",
              (err) => {
                if (err) {
                  console.log("err", err);
                  process.exit();
                } else console.log(fileContentasDatatoSendToFile);
              }
            );
          });
          fs.writeFile(
            "courses.json",
            JSON.stringify([answers]),
            "utf8",
            (error, data) => {
              if (error) {
                console.log(error);
              }
              console.log(data);
            }
          );
        } else {
          fs.writeFileSync(
            "courses.json",
            JSON.stringify(answers, null, 2),
            "utf8"
          );
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });

program.parse(process.argv);
// can give error
// SyntaxError: Cannot use import statement outside a module
// to fix it add "type": "module" in package.json or
//  change the file extension to .mjs that will make it a module file

// Upload tool to npm registry
// bin in package.json is used to define the command line tool
// that is going to be used when the package is installed globally to
// be used as a command line tool

// npx is a package runner tool that comes with npm that allows you to run packages
// without installing them globally
// npx is used to run packages from the npm registry

// i installed package to npm registry
// npm install -g elharam
//  or i can use it without downloading by command
// npx elharam add
// npx elharam prompt-question
// and other commands for elharam package
