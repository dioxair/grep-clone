let args = [];

for (i of process.argv) {
  if (i.startsWith("--")) {
    args.push(i);
  }
}
