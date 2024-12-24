import React, { useState } from 'react';
import { CalculatorButton } from '../ui/CalculatorButton';
import { evaluate } from 'mathjs';
import { useCalculatorWithHistory } from '../../hooks/useCalculatorWithHistory';

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const { saveToHistory, error } = useCalculatorWithHistory('scientific');

  const handleNumberClick = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperationClick = (op: string) => {
    setPreviousValue(display);
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = async () => {
    try {
      const expression = `${previousValue}${operation}${display}`;
      const result = evaluate(expression);
      setDisplay(result.toString());
      setPreviousValue('');
      setOperation('');
      
      // Save to history
      await saveToHistory(
        { expression },
        result.toString()
      );
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
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
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