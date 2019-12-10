// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import FormDesignerImage from './form-designer-structure.png';

export default function Hello() {
  return (
    <div>
      Hello, World!
      <img src={FormDesignerImage} alt="form designer" />
    </div>
  );
}
