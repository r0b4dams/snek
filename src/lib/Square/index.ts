import "./square.css";
import { Board } from "../Board";
import { Coordinates } from "../../@types";

export class Square {
  public element: HTMLDivElement;

  constructor(type: string, board: Board, { x, y }: Coordinates) {
    this.element = document.createElement("div");
    this.element.classList.add("game-square");

    const color = type === "snake" ? "chartreuse" : "salmon";
    this.element.style.backgroundColor = color;

    this.element.setAttribute("data-type", type);

    this.element.setAttribute("data-x", x.toString());
    this.element.style.gridColumnStart = x.toString();
    this.element.setAttribute("data-y", y.toString());
    this.element.style.gridRowStart = y.toString();

    board.element.append(this.element);
  }

  get type() {
    return this.element.getAttribute("data-type");
  }

  get x() {
    return parseInt(this.element.getAttribute("data-x")!);
  }

  get y() {
    return parseInt(this.element.getAttribute("data-y")!);
  }

  remove() {
    this.element.remove();
  }
}
