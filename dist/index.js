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

function regexArg(arg) {
    const redColor = "\x1b[31m";
    const boldColor = "\x1b[1m";
    const resetColor = "\x1b[0m";
    let regex = new RegExp(arg, "g");
    if (program.opts().insensitive)
        regex = new RegExp(arg, "gi");
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
    }
    else {
        result = contents.replace(regex, `${redColor}${boldColor}$&${resetColor}`);
    }
    if (program.opts().exclude) {
        if (result.includes(program.opts().exclude)) {
            result = result.replace(new RegExp(`^.*${program.opts().exclude}.*$`, "mg"), "");
            // if string only contains newlines, throw no matches found error
            if (/^\n*$/.test(result)) {
                program.error("No matches found, try being more specific with your excludes regex?", { exitCode: 1 });
            }
        }
    }
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
