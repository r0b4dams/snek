export default class Board {
  private element: HTMLDivElement;
  public size = 21;
  public center = { x: 11, y: 11 };

  constructor(parentElement: HTMLElement) {
    if (!parentElement) {
      throw new Error("Unable to mount game board");
    }
    this.element = document.createElement("div");
    this.element.style.width = "100vmin";
    this.element.style.height = "100vmin";
    this.element.style.display = "grid";
    this.element.style.gridTemplateRows = `repeat(${21}, 1fr)`;
    this.element.style.gridTemplateColumns = `repeat(${21}, 1fr)`;
    this.element.style.backgroundColor = "lightgray";
    parentElement.append(this.element);
  }

  append(el: HTMLElement) {
    this.element.append(el);
  }
}
