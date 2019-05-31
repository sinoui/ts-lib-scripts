import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  const { children } = props;
  return <>{children}</>;
}
