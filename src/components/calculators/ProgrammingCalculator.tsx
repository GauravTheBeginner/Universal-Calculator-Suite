import React, { useState } from 'react';

export function ProgrammingCalculator() {
  const [decimal, setDecimal] = useState('');
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');
  const [octal, setOctal] = useState('');

  const handleDecimalChange = (value: string) => {
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
      setBinary(num.toString(2));
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  const handleBinaryChange = (value: string) => {
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
      setHex(num.toString(16).toUpperCase());
      setOctal(num.toString(8));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decimal</label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => handleDecimalChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
            placeholder="Enter decimal number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Binary</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => handleBinaryChange(e.target.value)}
            className="mt-1 block w-full font-mono rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter binary number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hexadecimal</label>
          <input
            type="text"
            value={hex}
            readOnly
            className="mt-1 block w-full font-mono rounded-md border-gray-300 bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Octal</label>
          <input
            type="text"
            value={octal}
            readOnly
            className="mt-1 block w-full font-mono rounded-md border-gray-300 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}