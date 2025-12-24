import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'default' | 'white' | 'dark';
}

export default function Section({
  children,
  id,
  className = '',
  background = 'default',
}: SectionProps) {
  const backgroundStyles = {
    default: 'bg-off-white',
    white: 'bg-white',
    dark: 'bg-charcoal text-off-white',
  };
  
  return (
    <section
      id={id}
      className={`py-16 px-4 md:py-24 ${backgroundStyles[background]} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}
