import { Board } from "./Board";
import { Square } from "./Square";
import { Snake } from "./Snake";
import { InputController } from "./InputController";
import { autobind } from "../decorators/autobind";

export default class Game {
  private ctlr: InputController;
  private board: Board;
  private snake: Snake;
  private food: Square;
  private prevTime = 0;
  private frameId: number | null = null;

  constructor(public speed: number = 3) {
    this.ctlr = new InputController();
    this.board = new Board("main");
    this.snake = new Snake(this.board.center);
    this.food = new Square("food", this.board, this.board.randomGridPosition());
    this.frameId = requestAnimationFrame(this.main);
  }

  @autobind
  main(currTime: DOMHighResTimeStamp) {
    this.frameId = requestAnimationFrame(this.main);

    const secondsSinceLastRender = (currTime - this.prevTime) / 1000;
    if (secondsSinceLastRender < 1 / this.speed) {
      return;
    }

    this.prevTime = currTime;

    this.update();
    if (this.frameId) {
      this.render();
    }
  }

  update() {
    const { element, coordinates } = this.snake.check(this.ctlr.direction);

    if (this.board.outsideGrid(coordinates)) {
      this.gameover();
      return;
    }

    switch (element?.getAttribute("data-type")) {
      case "snake":
        this.gameover();
        break;

      case "food":
        this.food.remove();
        this.snake.grow();
        let position, occupied;
        do {
          position = this.board.randomGridPosition();
          occupied = this.board.square(position);
        } while (occupied);
        this.food = new Square("food", this.board, position);
        break;
    }
    this.snake.move(this.ctlr.direction);
  }

  render() {
    this.board.clear();

    this.snake.body.forEach(({ x, y }) => {
      new Square("snake", this.board, { x, y });
    });

    this.board.element.append(this.food.element);
  }

  victory() {
    return this.snake.body.length === this.board.attributes["data-size"] ** 2;
  }

  gameover() {
    console.log("gameover");

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
}
