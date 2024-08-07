const { Command } = require("commander");
const fs = require("fs");

const program = new Command();

program
  .name("grep-clone")
  .description("A (bad) clone of grep in JavaScript")
  .version("0.0.0");

// TODO: maybe not use a global var for this idk
let contents;

function pathArg(arg) {
  if (fs.existsSync(arg) && fs.lstatSync(arg).isFile()) {
    const file = fs.readFileSync(arg, { encoding: "utf8" });
    console.log(file);
  } else {
    program.error("Path provided is not a valid file path.", { exitCode: 1 });
  }
}

program
  .argument(
    "path",
    "Pass a file path as an argument to parse with regular expressions.",
  )
  .action((arg) => {
    pathArg(arg);
  });

program.argument("regexp", "Parse file using regular expressions");

program.parse();
