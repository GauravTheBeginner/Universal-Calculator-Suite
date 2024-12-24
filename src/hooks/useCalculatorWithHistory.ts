import { useState } from 'react';
import { useCalculationHistory } from './useCalculationHistory';

export function useCalculatorWithHistory(calculatorType: string) {
  const [error, setError] = useState<string | null>(null);
  const { saveCalculation } = useCalculationHistory();

  const saveToHistory = async (input: Record<string, any>, result: string) => {
    try {
      await saveCalculation({
        calculator_type: calculatorType,
        input_values: input,
        result: result.toString()
      });
    } catch (err) {
      console.error('Error saving calculation:', err);
      setError('Failed to save calculation');
    }
  };

  return {
    saveToHistory,
    error,
    setError
  };
}