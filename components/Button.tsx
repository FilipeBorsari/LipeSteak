import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const baseStyles = 'font-sans font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-charcoal text-off-white hover:bg-opacity-90',
    secondary: 'bg-gold text-charcoal hover:bg-opacity-90',
    outline: 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-off-white',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
