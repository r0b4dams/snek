import Board from "./Board";
import Snake from "./Snake";
import SnakeNode from "./SnakeNode";
import { autobind } from "./decorators/autobind";

export default class Game {
  private board: Board;
  private snake: Snake;
  private prevTime = 0;

  constructor(public speed: number = 5) {
    this.board = new Board(document.querySelector("body")!);
    this.snake = new Snake(new SnakeNode(this.board, this.board.center));
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
    this.snake.render(this.board);
  }
}
