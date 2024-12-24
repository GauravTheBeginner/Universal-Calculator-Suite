import React, { useState } from 'react';
import { useCalculatorWithHistory } from '../../hooks/useCalculatorWithHistory';

export function ProgrammingCalculator() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');
  const { saveToHistory, error } = useCalculatorWithHistory('programming');

  const handleDecimalChange = async (value: string) => {
    if (value === '') {
      setDecimal('');
      setBinary('');
      setHex('');
      setOctal('');
      return;
    }

    const num = parseInt(value);
    if (!isNaN(num)) {
      setDecimal(value);
      const bin = num.toString(2);
      const hexVal = num.toString(16).toUpperCase();
      const octVal = num.toString(8);
      
      setBinary(bin);
      setHex(hexVal);
      setOctal(octVal);

      await saveToHistory(
        { decimal: num },
        `Dec: ${num}, Bin: ${bin}, Hex: ${hexVal}, Oct: ${octVal}`
      );
    }
  };

  const handleBinaryChange = async (value: string) => {
    if (value === '') {
      setDecimal('');
      setBinary('');
      setHex('');
      setOctal('');
      return;
    }

    if (/^[01]+$/.test(value)) {
      const num = parseInt(value, 2);
      setBinary(value);
      setDecimal(num.toString());
      const hexVal = num.toString(16).toUpperCase();
      const octVal = num.toString(8);
      
      setHex(hexVal);
      setOctal(octVal);

      await saveToHistory(
        { binary: value },
        `Dec: ${num}, Bin: ${value}, Hex: ${hexVal}, Oct: ${octVal}`
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Decimal</label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => handleDecimalChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter decimal number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Binary</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => handleBinaryChange(e.target.value)}
            className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter binary number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hexadecimal</label>
          <input
            type="text"
            value={hex}
            readOnly
            className="mt-1 block w-full font-mono rounded-md border-gray-300 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Octal</label>
          <input
            type="text"
            value={octal}
            readOnly
            className="mt-1 block w-full font-mono rounded-md border-gray-300 bg-gray-50"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
      </div>
    </div>
  );
}