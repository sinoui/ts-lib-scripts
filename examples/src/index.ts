import Hello from './Hello';

const a = 1;

export class Example {
  private x: number;

  public constructor() {
    this.x = 1;
  }

  public add(y: number) {
    this.x += y;
    console.log(this.x);
  }
}

export { Hello };

export default a;
