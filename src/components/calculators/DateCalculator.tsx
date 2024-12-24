import React, { useState } from 'react';
import { useCalculatorWithHistory } from '../../hooks/useCalculatorWithHistory';

export function DateCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState('');
  const [result, setResult] = useState('');
  const { saveToHistory, error } = useCalculatorWithHistory('date');

  const calculateDateDifference = async () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setResult('Invalid date format');
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const resultText = `Difference: ${diffDays} days`;
    setResult(resultText);

    await saveToHistory(
      { startDate, endDate },
      resultText
    );
  };

  const addDays = async () => {
    const start = new Date(startDate);
    if (isNaN(start.getTime()) || !days) {
      setResult('Invalid input');
      return;
    }

    const result = new Date(start);
    result.setDate(result.getDate() + parseInt(days));
    const resultText = `Result: ${result.toLocaleDateString()}`;
    setResult(resultText);

    await saveToHistory(
      { startDate, daysToAdd: days },
      resultText
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Date Difference</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              onClick={calculateDateDifference}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate Difference
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add/Subtract Days</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Days</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="Enter positive or negative number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={addDays}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Calculate New Date
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}