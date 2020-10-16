import React from 'react';

interface Props {
  y: string;
  x: string;
}

export default function Demo(props: Props) {
  return React.createElement('div', props);
}
