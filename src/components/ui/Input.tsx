import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className={`
          block w-full rounded-lg border-gray-300 shadow-sm
          focus:border-blue-500 focus:ring-blue-500
          transition-shadow duration-200
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}