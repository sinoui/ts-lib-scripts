import 'rc-pagination/assets/index.css';
import { useMemo as x } from 'react';
import Hello from './Hello';
import { Pointer } from './types';
import XWorker from './x.worker.ts';

const xWorker = new XWorker();

xWorker.addEventListener('message', (event) => {
  console.log(event.data);
});

xWorker.postMessage('Hello, World!');

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
