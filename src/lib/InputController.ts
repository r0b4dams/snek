import { Coordinates } from "../@types";

export const DIRECTION = {
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
};

export const MOVESET = {
  [DIRECTION.UP]: { x: 0, y: -1 },
  [DIRECTION.DOWN]: { x: 0, y: 1 },
  [DIRECTION.LEFT]: { x: -1, y: 0 },
  [DIRECTION.RIGHT]: { x: 1, y: 0 },
} as const;

export class InputController {
  private _direction: Coordinates = { x: 0, y: 0 };
  private _previous = this._direction;

  constructor() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case DIRECTION.UP:
          if (this._previous.y === 0) {
            this._direction = MOVESET[DIRECTION.UP];
          }
          break;

        case DIRECTION.DOWN:
          if (this._previous.y === 0) {
            this._direction = MOVESET[DIRECTION.DOWN];
          }
          break;

        case DIRECTION.LEFT:
          if (this._previous.x === 0) {
            this._direction = MOVESET[DIRECTION.LEFT];
          }
          break;

        case DIRECTION.RIGHT:
          if (this._previous.x === 0) {
            this._direction = MOVESET[DIRECTION.RIGHT];
          }
          break;
      }
    });
  }

  get direction() {
    this._previous = this._direction;
    return this._direction;
  }
}
