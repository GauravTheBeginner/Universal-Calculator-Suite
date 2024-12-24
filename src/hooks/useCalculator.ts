import { evaluate, format } from 'mathjs';
import { useState } from 'react';
import { useCalculationHistory } from './useCalculationHistory';

export function useCalculator(calculatorType: string) {
  const [error, setError] = useState<string | null>(null);
  const { saveCalculation } = useCalculationHistory();

  const calculateExpression = async (expression: string) => {
    try {
      setError(null);
      const result = evaluate(expression);
      const formattedResult = format(result, { precision: 14 });
      
      // Save calculation to history
      await saveCalculation({
        calculator_type: calculatorType,
        input_values: { expression },
        result: formattedResult
      });

      return formattedResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid expression');
      throw err;
    }
  };

  return {
    calculateExpression,
    error
  };
}