import React from 'react';
import { useCalculationHistory } from '../hooks/useCalculationHistory';
import { format } from 'date-fns';

export function CalculationHistory() {
  const { calculations, loading } = useCalculationHistory();

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (calculations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No calculations yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Recent Calculations</h3>
      <div className="space-y-3">
        {calculations.map((calc) => (
          <div
            key={calc.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">
                  {calc.calculator_type}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {format(new Date(calc.created_at), 'PPp')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
                  {calc.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}