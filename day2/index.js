class Pick {
  drawedRed = 0;
  drawedGreen = 0;
  drawedBlue = 0;

  constructor(drawedRed, drawedGreen, drawedBlue) {
    this.drawedBlue = drawedBlue;
    this.drawedGreen = drawedGreen;
    this.drawedRed = drawedRed;
  }
  static parse(pickString) {
    const split = pickString.split(",");
    let drawedBlue = 0;
    let drawedGreen = 0;
    let drawedRed = 0;

    for (let draw of split) {
      draw = draw.trim();
      const count = parseInt(draw.split(" ")[0].trim());
      const color = draw.split(" ")[1].trim();

      switch (color) {
        case "blue":
          drawedBlue += count;
          break;
        case "red":
          drawedRed += count;
          break;
        case "green":
          drawedGreen += count;
          break;
      }
    }

    return new Pick(drawedRed, drawedGreen, drawedBlue);
  }

  valid(bag) {
    return (
      this.drawedRed <= bag.red ||
      this.drawedBlue <= bag.blue ||
      this.drawedGreen <= bag.green
    );
  }
}

class Game {
  id;
  picks = [];

  constructor(id, picks) {
    this.id = id;
    this.picks = picks;
  }

  validGame(bag) {
    const mapped = this.picks.map((pick) => pick.valid(bag));
    const invalid = mapped.filter((b) => !b);
    return invalid.length == 0;
  }

  static parse(line) {
    const gameID = line.split(":")[0];
    const picks = line
      .split(":")[1]
      .split(";")
      .map((pickString) => Pick.parse(pickString.trim()));

    return new Game(gameID.split(" ")[1], picks);
  }
}

class Bag {
  red = 0;
  blue = 0;
  green = 0;
  constructor(red, green, blue) {
    this.red = red;
    this.blue = blue;
    this.green = green;
  }
}
async function main() {
  let bag = new Bag(12, 13, 14);
  let game = Game.parse(
    "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"
  );
  console.log(game.id, game.validGame(bag));
}

main();
