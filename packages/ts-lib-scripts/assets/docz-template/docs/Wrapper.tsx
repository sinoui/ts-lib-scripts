import React from 'react';
import './Wrapper.css'

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  const { children } = props;
  return <>{children}</>;
}
