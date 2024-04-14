import React from 'react';
import '../styles/Container.css';

export function Container({ children, className }) {
  return <div className={className}>{children}</div>;
}