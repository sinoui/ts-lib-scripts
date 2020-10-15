import React from 'react';

interface Props {
  x?: React.ReactNode;
}

export default function Demo({ x }: Props) {
  return <div>{x}</div>;
}
