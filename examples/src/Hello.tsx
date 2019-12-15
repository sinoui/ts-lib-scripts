// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import FormDesignerImage from './form-designer-structure.png';
import { Pointer } from './types';

export default function Hello() {
  const point: Pointer | null = null;
  return (
    <div>
      {point}
      Hello, World!
      <img src={FormDesignerImage} alt="form designer" />
    </div>
  );
}
