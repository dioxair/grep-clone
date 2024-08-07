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
    contents = fs.readFileSync(arg, { encoding: "utf8" });
  } else {
    program.error("Path provided is not a valid file path.", { exitCode: 1 });
  }
}

function regexArg(arg) {
  const redColor = "\x1b[31m";
  const boldColor = "\x1b[1m";
  const resetColor = "\x1b[0m";

  let regex = new RegExp(arg, "g");
  console.log(
    contents.replace(regex, `${redColor}${boldColor}$&${resetColor}`),
  );
}

program
  .argument(
    "path",
    "Pass a file path as an argument to parse with regular expressions.",
  )
  .argument("regexp", "Parse file using regular expressions")
  .action((pArg, rArg) => {
    pathArg(pArg);
    regexArg(rArg);
  });

program.parse();
