import { contents } from "./pathArg.js";
import { program } from "./index.js";

export function regexArg(arg: string) {
  const redColor = "\x1b[31m";
  const boldColor = "\x1b[1m";
  const resetColor = "\x1b[0m";

  let regex = new RegExp(arg, "g");
  if (program.opts().insensitive) regex = new RegExp(arg, "gi");

  if (!regex.test(contents))
    program.error("No matches found.", { exitCode: 1 });

  let result = "";

  if (!program.opts().all) {
    let lines = contents.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        result +=
          lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`) +
          "\n";
      }
    }
  } else {
    result = contents.replace(regex, `${redColor}${boldColor}$&${resetColor}`);
  }

  if (program.opts().exclude) {
    if (result.includes(program.opts().exclude)) {
      result = result.replace(
        new RegExp(`^.*${program.opts().exclude}.*$`, "mg"),
        "",
      );
      // if string only contains newlines, throw no matches found error
      if (/^\n*$/.test(result)) {
        program.error(
          "No matches found, try being more specific with your excludes regex?",
          { exitCode: 1 },
        );
      }
    }
  }

  console.log(result);
}
