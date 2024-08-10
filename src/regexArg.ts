import { contents } from "./pathArg.js";
import { program } from "./index.js";

function noMatchesFoundTest(testString: string) {
  // if string only contains newlines, throw no matches found error
  if (/^\n*$/.test(testString)) {
    program.error(
      "No matches found. (only newlines in result string, might be a grep-clone problem)",
      { exitCode: 1 },
    );
  }
}

function highlightChars(regex: RegExp, contentToHighlight: string): string {
  const redColor = "\x1b[31m";
  const boldColor = "\x1b[1m";
  const resetColor = "\x1b[0m";

  // i cant come up with a better name for this
  let returnValue: string = "";
  if (!program.opts().all) {
    let lines = contentToHighlight.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        returnValue +=
          lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`) +
          "\n";
      }
    }
  } else {
    returnValue = contentToHighlight.replace(
      regex,
      `${redColor}${boldColor}$&${resetColor}`,
    );
  }

  return returnValue;
}

export function regexArg(arg: string) {
  let regex = new RegExp(arg, "g");
  if (program.opts().insensitive) regex = new RegExp(arg, "gi");

  if (!regex.test(contents))
    program.error("No matches found.", { exitCode: 1 });


  if (program.opts().exclude) {
    if (contents.includes(program.opts().exclude)) {
      const lines = result.split("\n");

      let filteredLines = lines.filter(
        (line) => !line.includes(program.opts().exclude),
        console.log(
          lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`),
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

      result = highlightChars(regex, filteredLines.join("\n"));
    }
    return;
    result = highlightChars(regex, result);
  }

  noMatchesFoundTest(result);
  result = result.trim();
  console.log(result);
}
