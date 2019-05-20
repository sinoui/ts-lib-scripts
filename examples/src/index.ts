/* eslint-disable import/prefer-default-export */
export class Pointer {
  public x: number;

  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public move(x: number, y: number) {
    return new Pointer(this.x + x, this.y + y);
  }
}
