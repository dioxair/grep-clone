const { Command } = require("commander");
const program = new Command();

program
  .name("grep-clone")
  .description("A (bad) clone of grep in JavaScript")
  .version("0.0.0");

program
  .requiredOption(
    "-p",
    "--path <string>",
    "Pass a file paht as an argument to parse with regular expressions.",
  )
  .option("-r", "--regexp <string>", "Parse file using regular expressions");

program.parse();

const options = program.opts();

if (options.p) {
  console.log("path");
}

if (options.r) {
  console.log("regexp");
}
