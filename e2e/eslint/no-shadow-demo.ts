// 0.13.4及之前版本，以下代码会提示 Color 有 no-shadow 错误。

enum Color {
  Red,
  Blue,
  Green,
}

export interface Props {
  color: Color;
}
