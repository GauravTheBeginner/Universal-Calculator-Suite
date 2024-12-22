import React from 'react';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'operation' | 'equals' | 'clear';
  className?: string;
}

export function CalculatorButton({ 
  children, 
  onClick, 
  variant = 'default',
  className = ''
}: CalculatorButtonProps) {
  const baseClasses = "p-4 text-lg font-semibold rounded-xl transition-all duration-200 active:scale-95";
  
  const variantClasses = {
    default: "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md",
    operation: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl",
    equals: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl",
    clear: "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl"
  };

  const isOperation = ['+', '-', '×', '÷'].includes(children as string);
  const isEquals = children === '=';
  const isClear = children === 'C' || children === 'AC';
  
  const currentVariant = isClear ? 'clear' : isOperation ? 'operation' : isEquals ? 'equals' : variant;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[currentVariant]} ${className}`}
    >
      {children}
    </button>
  );
}