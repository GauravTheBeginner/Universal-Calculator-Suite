import React, { useState } from 'react';
import { useCalculatorWithHistory } from '../../hooks/useCalculatorWithHistory';

export function StatisticsCalculator() {
  const [numbers, setNumbers] = useState('');
  const [stats, setStats] = useState<{
    mean: number;
    median: number;
    mode: number[];
    stdDev: number;
  } | null>(null);
  const { saveToHistory, error } = useCalculatorWithHistory('statistics');

  const calculateStats = async () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (nums.length === 0) return;

    // Calculate mean
    const mean = nums.reduce((a, b) => a + b) / nums.length;

    // Calculate median
    const sorted = [...nums].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    // Calculate mode
    const frequency: Record<number, number> = {};
    nums.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.entries(frequency)
      .filter(([, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num));

    // Calculate standard deviation
    const variance = nums.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    const results = { mean, median, mode, stdDev };
    setStats(results);

    // Save to history
    await saveToHistory(
      { numbers: nums },
      `Mean: ${mean.toFixed(2)}, Median: ${median.toFixed(2)}, StdDev: ${stdDev.toFixed(2)}`
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enter numbers (comma-separated)
          </label>
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="e.g., 1, 2, 3, 4, 5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          onClick={calculateStats}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Statistics
        </button>

        {stats && (
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Mean:</p>
              <p className="text-lg font-semibold">{stats.mean.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Median:</p>
              <p className="text-lg font-semibold">{stats.median.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Mode:</p>
              <p className="text-lg font-semibold">{stats.mode.join(', ')}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Standard Deviation:</p>
              <p className="text-lg font-semibold">{stats.stdDev.toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}