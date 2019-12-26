import 'rc-pagination/assets/index.css';
import { useMemo as x } from 'react';
import Hello from './Hello';
import { Pointer } from './types';

console.log(x);

export interface Props {
  xxx: string;
}

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

export { Hello, /* type */ Pointer };

export default a;
