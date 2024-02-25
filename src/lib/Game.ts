import { Board } from "./Board";
import { Square } from "./Square";
import { Snake } from "./Snake";
import { InputController } from "./InputController";
import { autobind } from "../decorators/autobind";

export default class Game {
  private ctlr: InputController;
  private board: Board;
  private snake: Snake;
  private prevTime = 0;

  constructor(public speed: number = 2) {
    this.ctlr = new InputController();
    this.board = new Board("main");
    this.snake = new Snake(this.board.center);
    this.render();
    requestAnimationFrame(this.main);
  }

  @autobind
  main(currTime: DOMHighResTimeStamp) {
    requestAnimationFrame(this.main);
    const secondsSinceLastRender = (currTime - this.prevTime) / 1000;
    if (secondsSinceLastRender < 1 / this.speed) {
      return;
    }
    this.prevTime = currTime;
    this.update();
    this.render();
  }

  update() {
    const next = this.snake.peek(this.ctlr.direction);

    if (
      next.x <= 0 ||
      next.x > this.board.attributes["data-size"] ||
      next.y <= 0 ||
      next.y > this.board.attributes["data-size"]
    ) {
      alert("game over - out of bounds");
      window.location.reload();
    }

    this.snake.move(this.ctlr.direction);
  }

  render() {
    this.board.clear();

    this.snake.body.forEach((s) => {
      new Square("snake", this.board, { x: s.x, y: s.y });
    });
  }
}
