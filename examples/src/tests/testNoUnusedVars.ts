/* eslint-disable no-console */

export function test1(_x: number, y: number) {
  console.log(y);
}

export function test2(x: number, _y: number) {
  console.log(x);
}

export function test3(props: { [x: string]: string }) {
  const { x, ...rest } = props;
  console.log(rest);
}

export function test4() {
  try {
    throw new Error('xxx');
  } catch (e) {
    console.log('出错了');
  }
}
