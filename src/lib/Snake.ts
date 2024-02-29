import { Coordinates } from "../@types";

export class Snake {
  public body: Coordinates[];

  constructor(start: Coordinates) {
    if (!start) {
      throw new Error("unable to initialize snake - no coordinates given");
    }
    this.body = [start];
  }

  get head() {
    return this.body[0];
  }

  get tail() {
    return this.body[this.body.length - 1];
  }

  isTail(c: Coordinates) {
    return c.x === this.tail.x && c.y === this.tail.y;
  }

  check(c: Coordinates) {
    const x = this.head.x + c.x;
    const y = this.head.y + c.y;

    const element =
      (c.x === 0 && c.y === 0) || this.isTail({ x, y })
        ? null
        : document.querySelector(`[data-x='${x}'][data-y='${y}']`);

    return {
      element,
      coordinates: { x, y },
    };
  }

  move(direction: Coordinates) {
    const copy = [...this.body];
    const newHead = copy.pop()!;

    if (!newHead) {
      throw new Error("error moving snake");
    }

    newHead.x = this.head.x + direction.x;
    newHead.y = this.head.y + direction.y;

    this.body = [newHead, ...copy];
  }

  stop() {
    this.move({ x: 0, y: 0 });
  }

  grow() {
    this.body.push({ ...this.tail });
  }
}
