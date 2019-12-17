import React from 'react';
import FormDesignerImage from './form-designer-structure.png';
import { Pointer } from './types';
import styles from './styles.module.css';
import x from './x.json';

export default function Hello() {
  const point: Pointer | null = null;
  return (
    <div className={styles['test--disabled']}>
      {point}
      {x.t}
      Hello, World!
      <img src={FormDesignerImage} alt="form designer" />
    </div>
  );
}
