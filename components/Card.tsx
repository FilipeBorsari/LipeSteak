import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  onClick,
  selected = false,
  className = '',
  hover = true,
}: CardProps) {
  const baseStyles = 'bg-white rounded-lg p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-lg cursor-pointer' : '';
  const selectedStyles = selected ? 'ring-2 ring-gold shadow-lg' : 'shadow-md';
  const interactiveStyles = onClick ? 'focus:outline-none focus:ring-2 focus:ring-gold' : '';
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${selectedStyles} ${interactiveStyles} ${className}`}
    >
      {children}
    </Component>
  );
}
