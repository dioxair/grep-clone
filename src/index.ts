import { Command } from "commander";
import { regexArg } from "./regexArg.js";
import { pathArg } from "./pathArg.js";

export const program = new Command();

program
  .name("grep-clone")
  .description("A (bad) clone of grep in JavaScript")
  .version("0.0.0");

program
  .argument(
    "path",
    "Pass a file path as an argument to parse with regular expressions.",
  )
  .argument("regexp", "Parse file using regular expressions.")
  .option(
    "-a, --all",
    "Return entire original file with matched regular expression.",
  )
  .option("-i, --insensitive", "Disable case sensitivity.")
  .action((pArg: string, rArg: string) => {
    pathArg(pArg);
    regexArg(rArg);
  });

program.parse();
