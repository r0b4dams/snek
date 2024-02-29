import "./board.css";
import { Coordinates } from "../../@types";

interface BoardAttributes {
  id: string;
  "data-size": number;
  "data-color": string;
}

const defaultAttrs: BoardAttributes = {
  id: "board",
  "data-size": 21,
  "data-color": "lightgray",
};

export class Board {
  public attributes: BoardAttributes;
  public element: HTMLDivElement;
  public center: Coordinates;

  constructor(selector: string, attrs?: BoardAttributes) {
    const parentElement = document.querySelector(selector);

    if (!parentElement) {
      throw new Error(
        `Unable to mount game board - no element found for selector: ${selector}`
      );
    }

    this.element = document.createElement("div");
    this.attributes = { ...defaultAttrs, ...attrs };

    const midpoint = Math.floor(this.attributes["data-size"] / 2) + 1;

    this.center = {
      x: midpoint,
      y: midpoint,
    };

    this.element.style.gridTemplateRows = `repeat(${this.attributes["data-size"]}, 1fr)`;
    this.element.style.gridTemplateColumns = `repeat(${this.attributes["data-size"]}, 1fr)`;

    Object.entries(this.attributes).forEach(([key, attr]) => {
      this.element.setAttribute(key, attr.toString());
    });

    parentElement.append(this.element);
  }

  clear() {
    this.element.innerHTML = "";
  }

  square({ x, y }: Coordinates) {
    return document.querySelector(`.game-square[data-x='${x}'][data-y='${y}']`);
  }

  randomSingleCoordinate() {
    return Math.floor(Math.random() * this.attributes["data-size"]) + 1;
  }

  randomGridPosition() {
    return {
      x: this.randomSingleCoordinate(),
      y: this.randomSingleCoordinate(),
    };
  }

  outsideGrid({ x, y }: Coordinates) {
    return (
      x < 1 ||
      x > this.attributes["data-size"] ||
      y < 1 ||
      y > this.attributes["data-size"]
    );
  }
}
