import React from 'react';
import FormDesignerImage from './form-designer-structure.png';
import { Pointer } from './types';
import styles from './styles.module.css';
import x from './x.json';
import type { Props } from './Button';
import Button from './Button/Button';

export interface HelloProps extends Props {
  className?: string;
}

export default function Hello() {
  const point: Pointer | null = null;
  return (
    <div className={styles['test--disabled']}>
      {point}
      {x.t}
      Hello, World!
      <img src={FormDesignerImage} alt="form designer" />
      <Button>按钮</Button>
    </div>
  );
}
