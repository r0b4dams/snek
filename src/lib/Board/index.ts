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

    Object.entries(this.attributes).forEach(([k, a]) => {
      this.element.setAttribute(k, a.toString());
    });

    parentElement.append(this.element);
  }

  clear() {
    this.element.innerHTML = "";
  }

  square({ x, y }: Coordinates) {
    return document.querySelector(
      `
        #${this.attributes.id}[data-x='${x}'], 
        #${this.attributes.id}[data-y='${y}']
        `
    ) as HTMLDivElement;
  }
}
