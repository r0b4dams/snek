import Board from "./Board";

export default class GameNode {
  public x: number;
  public y: number;
  protected element: HTMLDivElement;

  constructor(board: Board, coords: { x: number; y: number }) {
    this.element = document.createElement("div");
    this.x = coords.x;
    this.y = coords.y;
    this.element.style.border = "0.25vmin solid black";
    this.element.style.gridRowStart = this.y.toString();
    this.element.style.gridColumnStart = this.x.toString();
    board.append(this.element);
  }

  remove() {
    this.element.remove();
  }
}
