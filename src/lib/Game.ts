import { Board } from "./Board";
import { Square } from "./Square";
import { Snake } from "./Snake";
import { InputController, DIRECTION } from "./InputController";
import { autobind } from "../decorators/autobind";
import { Coordinates } from "../@types";

export default class Game {
  private ctlr: InputController;
  private board: Board;
  private snake: Snake;
  private food: Coordinates;
  private prevTime = 0;
  private frameId: number | null = null;
  private gameover: boolean;

  constructor(public speed: number = 5) {
    this.ctlr = new InputController();
    this.board = new Board("main");
    this.snake = new Snake(this.board.center);
    this.food = this.generateFood();
    this.gameover = false;

    const start = (e: KeyboardEvent) => {
      if (Object.values(DIRECTION).includes(e.key)) {
        this.frameId = window.requestAnimationFrame(this.main);
        window.removeEventListener("keydown", start);
      }
    };

    window.addEventListener("keydown", start);
    this.render();
  }

  get victory() {
    return this.snake.body.length === this.board.attributes["data-size"] ** 2;
  }

  @autobind
  main(currTime: DOMHighResTimeStamp) {
    this.frameId = requestAnimationFrame(this.main);

    if (this.victory) {
      alert("You win! 🐍");
    }

    if (this.gameover) {
      alert("You lose 😔");
    }

    if (this.gameover || this.victory) {
      this.stop();
      if (window.confirm("Would you like to play again?")) {
        window.location.reload();
      }
    }

    const secondsSinceLastRender = (currTime - this.prevTime) / 1000;
    if (secondsSinceLastRender < 1 / this.speed) {
      return;
    }

    this.prevTime = currTime;
    this.update();
    this.render();
  }

  update() {
    const { element, coordinates } = this.snake.check(this.ctlr.direction);

    if (this.board.isOutsideGrid(coordinates)) {
      this.gameover = true;
      return;
    }

    switch (element?.getAttribute("data-type")) {
      case "snake":
        this.gameover = true;
        return;

      case "food":
        this.snake.grow();
        if (this.victory) {
          break;
        }
        this.food = this.generateFood();
    }

    this.snake.move(this.ctlr.direction);
  }

  render() {
    this.board.clear();

    new Square("food", this.board, this.food);

    this.snake.body.forEach((segment, i) => {
      const s = new Square("snake", this.board, segment);

      if (i === 0) {
        s.element.style.backgroundColor = "lightgreen";
      }

      if (this.snake.body.length > 1 && i === this.snake.body.length - 1) {
        s.element.style.backgroundColor = "darkgreen";
      }
    });
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  generateFood() {
    let position: Coordinates;
    do {
      position = this.board.randomGridPosition();
    } while (this.snake.isHead(position) || this.board.isOccupied(position));
    return position;
  }
}
