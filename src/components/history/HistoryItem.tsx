
import { format } from 'date-fns';
import type { Calculation } from '../../types/calculation';

interface HistoryItemProps {
  calculation: Calculation;
}

export function HistoryItem({ calculation }: HistoryItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:border-blue-500 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-900 capitalize">
            {calculation.calculator_type} Calculator
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {format(new Date(calculation.created_at), 'PPp')}
          </p>
          <div className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Input: </span>
            {JSON.stringify(calculation.input_values)}
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm bg-gray-50 px-3 py-1 rounded">
            {calculation.result}
          </p>
        </div>
      </div>
    </div>
  );
}