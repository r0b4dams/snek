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

  peek(direction: Coordinates) {
    return {
      x: this.head.x + direction.x,
      y: this.head.y + direction.y,
    } as Coordinates;
  }

  move(direction: Coordinates) {
    const tail = this.body.pop();

    if (!tail) {
      throw new Error("error moving snake");
    }

    tail.x += direction.x;
    tail.y += direction.y;

    this.body = [tail, ...this.body];
  }

  eat() {
    this.body.push({ x: this.tail.x, y: this.tail.y });
  }
}
