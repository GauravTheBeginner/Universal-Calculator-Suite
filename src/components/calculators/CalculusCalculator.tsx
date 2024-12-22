import React, { useState } from 'react';

export function CalculusCalculator() {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [result, setResult] = useState('');

  const calculateDerivative = () => {
    // This is a simplified example. In a real application,
    // you would want to use a proper math library for calculus
    setResult(`d/d${variable}(${expression})`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expression</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g., x^2 + 2x + 1"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variable</label>
          <input
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
          />
        </div>

        <button
          onClick={calculateDerivative}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition text-lg font-medium shadow-md"
        >
          Calculate Derivative
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Result:</p>
            <p className="text-xl font-mono">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}