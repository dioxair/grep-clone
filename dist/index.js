import { Command, Option } from 'commander';
import fs from 'fs';

let contents;
function pathArg(arg) {
    if (fs.existsSync(arg) && fs.lstatSync(arg).isFile()) {
        contents = fs.readFileSync(arg, { encoding: "utf8" });
    }
    else {
        program.error("Path provided is not a valid file path.", { exitCode: 1 });
    }
}

function noMatchesFoundTest(testString) {
    // if string only contains newlines, throw no matches found error
    if (/^\n*$/.test(testString)) {
        program.error("No matches found. (only newlines in result string, might be a grep-clone problem)", { exitCode: 1 });
    }
}
function highlightChars(regex, contentToHighlight) {
    const redColor = "\x1b[31m";
    const boldColor = "\x1b[1m";
    const resetColor = "\x1b[0m";
    // i cant come up with a better name for this
    let returnValue = "";
    if (!program.opts().all) {
        let lines = contentToHighlight.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (regex.test(lines[i])) {
                returnValue +=
                    lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`) +
                        "\n";
            }
        }
    }
    else {
        returnValue = contentToHighlight.replace(regex, `${redColor}${boldColor}$&${resetColor}`);
    }
    return returnValue;
}
function regexArg(arg) {
    let regex = new RegExp(arg, "g");
    if (program.opts().insensitive)
        regex = new RegExp(arg, "gi");
    if (!regex.test(contents))
        program.error("No matches found.", { exitCode: 1 });
    let result = contents;
    if (program.opts().exclude) {
        if (contents.includes(program.opts().exclude)) {
            const lines = result.split("\n");
            let filteredLines = lines.filter((line) => !line.includes(program.opts().exclude));
            result = highlightChars(regex, filteredLines.join("\n"));
        }
    }
    else {
        result = highlightChars(regex, result);
    }
    noMatchesFoundTest(result);
    result = result.trim();
    console.log(result);
}

const program = new Command();
program
    .name("grep-clone")
    .description("A (bad) clone of grep in JavaScript")
    .version("0.0.0");
program
    .argument("path", "Pass a file path as an argument to parse with regular expressions.")
    .argument("regexp", "Parse file using regular expressions.")
    .option("-a, --all", "Return entire original file with matched regular expression.")
    .option("-i, --insensitive", "Disable case sensitivity.")
    .addOption(new Option("-v, --exclude <string>", "Exclude a regular expression from search results").conflicts("all"))
    .action((pArg, rArg) => {
    pathArg(pArg);
    regexArg(rArg);
});
program.parse();

export { program };
