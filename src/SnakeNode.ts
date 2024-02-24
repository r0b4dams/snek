import Board from "./Board";
import GameNode from "./GameNode";

export default class SnakeNode extends GameNode {
  constructor(board: Board, coords: { x: number; y: number }) {
    super(board, coords);
    this.element.style.backgroundColor = "blue";
  }
}
