const { readFile } = require("fs/promises");

function isNumber(value) {
  return /^\d+$/.test(value);
}

const stringNumbers = {
  nine: "n9e",
  one: "o1e",
  eight: "e8t",
  two: "t2e",
  three: "t3e",
  four: "f4r",
  five: "f5e",
  six: "s6x",
  seven: "s7n",
};

function replaceStringNumbers(line) {
  for (var numberString in stringNumbers) {
    const number = stringNumbers[numberString];
    line = line.replaceAll(numberString, number);
  }

  return line;
}

async function main() {
  const text = await readFile("./data.txt", "utf8");
  const splittedText = text.split("\n");
  let sum = 0;

  splittedText.forEach((line, i) => {
    line = replaceStringNumbers(line);

    let firstFound = "";
    let lastFound = "";
    for (var c of line) {
      if (!firstFound && isNumber(c)) firstFound = c;
      if (!!firstFound && isNumber(c)) lastFound = c;
    }
    if (!lastFound) lastFound = firstFound;

    const lineNumberString = firstFound + lastFound;

    sum += parseInt(lineNumberString);
  });
  console.log("sum", sum);
}

main();
