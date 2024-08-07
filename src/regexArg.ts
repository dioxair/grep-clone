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

  if (!program.opts().all) {
    let lines = contents.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        console.log(
          lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`),
        );
      }
    }
    return;
  }

  console.log(
    contents.replace(regex, `${redColor}${boldColor}$&${resetColor}`),
  );
}
