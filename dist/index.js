import { Command } from 'commander';
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
    if (!regex.test(contents))
        program.error("No matches found.", { exitCode: 1 });
    if (!program.opts().all) {
        let lines = contents.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (regex.test(lines[i])) {
                console.log(lines[i].replace(regex, `${redColor}${boldColor}$&${resetColor}`));
            }
        }
        return;
    }
    console.log(contents.replace(regex, `${redColor}${boldColor}$&${resetColor}`));
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
    .action((pArg, rArg) => {
    pathArg(pArg);
    regexArg(rArg);
});
program.parse();

export { program };
