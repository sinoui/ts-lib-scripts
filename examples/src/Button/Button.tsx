import React from 'react';

export interface Props {
  /**
   * 颜色
   */
  color?: string;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

export default function Button(props: Props) {
  const { children } = props;
  return <button type="button">{children}</button>;
}
