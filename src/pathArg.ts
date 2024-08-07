import { program } from "./index.js";
import fs from "fs";

export let contents: string;

export function pathArg(arg: string) {
  if (fs.existsSync(arg) && fs.lstatSync(arg).isFile()) {
    contents = fs.readFileSync(arg, { encoding: "utf8" });
  } else {
    program.error("Path provided is not a valid file path.", { exitCode: 1 });
  }
}
