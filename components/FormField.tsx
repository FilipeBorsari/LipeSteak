'use client';

import React, { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'textarea' | 'select';
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
}

export default function FormField({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helpText,
  options,
  min,
  max,
  step,
  rows = 4,
}: FormFieldProps) {
  const baseInputStyles = 'w-full px-4 py-3 rounded border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold';
  const errorStyles = error ? 'border-red-500' : 'border-gray-300';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (type === 'number') {
      onChange(parseFloat(e.target.value) || 0);
    } else {
      onChange(e.target.value);
    }
  };
  
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium mb-2 text-charcoal">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseInputStyles} ${errorStyles} resize-none`}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={handleChange}
          required={required}
          className={`${baseInputStyles} ${errorStyles}`}
        >
          <option value="">Selecione...</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className={`${baseInputStyles} ${errorStyles}`}
        />
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-600">{helpText}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
