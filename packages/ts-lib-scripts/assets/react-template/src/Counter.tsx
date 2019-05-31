import React, { useState, useEffect } from 'react';

interface Props {
  /**
   * 添加css类
   */
  className?: string;
  /**
   * 添加css样式
   */
  style?: React.CSSProperties;
}

function Counter(props: Props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <div {...props}>
      <p data-testid="label">You clicked {count} times</p>
      <button
        data-testid="button"
        type="button"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}

export default Counter;
