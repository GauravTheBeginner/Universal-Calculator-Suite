/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Calculation {
  id: string;
  calculator_type: string;
  input_values: Record<string, any>;
  result: string;
  created_at: string;
}

export function useCalculationHistory() {
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchCalculations = async () => {
      const { data, error } = await supabase
        .from('calculations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCalculations(data);
      }
      setLoading(false);
    };

    fetchCalculations();
  }, [user]);

  const saveCalculation = async (
    calculatorType: string,
    inputValues: Record<string, any>,
    result: string
  ) => {
    if (!user) return;

    const { error } = await supabase.from('calculations').insert([
      {
        user_id: user.id,
        calculator_type: calculatorType,
        input_values: inputValues,
        result,
      },
    ]);

    if (!error) {
      setCalculations((prev) => [
        {
          id: crypto.randomUUID(),
          calculator_type: calculatorType,
          input_values: inputValues,
          result,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  return { calculations, loading, saveCalculation };
}