import { useState } from 'react';

export function StatisticsCalculator() {
  const [numbers, setNumbers] = useState('');
  const [stats, setStats] = useState<{
    mean: number;
    median: number;
    mode: number[];
    stdDev: number;
  } | null>(null);

  const calculateStats = () => {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num]) => parseFloat(num));

    // Calculate standard deviation
    const variance = nums.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    setStats({ mean, median, mode, stdDev });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter numbers (comma-separated)
          </label>
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="e.g., 1, 2, 3, 4, 5"
           className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
          />
        </div>

        <button
          onClick={calculateStats}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition text-lg font-medium shadow-md"
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