import React, { useState } from 'react';
import { CalculatorButton } from '../ui/CalculatorButton';
import { evaluate } from '../../utils/mathEvaluator';

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');

  const handleNumberClick = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperationClick = (op: string) => {
    setPreviousValue(display);
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    try {
      const result = evaluate(`${previousValue}${operation}${display}`);
      setDisplay(result.toString());
      setPreviousValue('');
      setOperation('');
    } catch (error) {
      console.log(error)
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation('');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <div className="text-right text-2xl font-mono">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', '÷',
          '4', '5', '6', '×',
          '1', '2', '3', '-',
          '0', '.', '=', '+'].map((btn) => (
          <CalculatorButton
            key={btn}
            onClick={() => {
              switch (btn) {
                case '=': handleEquals(); break;
                case '+': case '-': case '×': case '÷':
                  handleOperationClick(btn);
                  break;
                default: handleNumberClick(btn);
              }
            }}
          >
            {btn}
          </CalculatorButton>
        ))}
      </div>
      
      <button
        onClick={handleClear}
        className="w-full mt-4 bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Clear
      </button>
    </div>
  );
}