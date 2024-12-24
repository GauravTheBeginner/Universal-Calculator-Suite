export interface Calculation {
  id: string;
  calculator_type: string;
  input_values: Record<string, any>;
  result: string;
  created_at: string;
}

export interface CalculationInput {
  calculator_type: string;
  input_values: Record<string, any>;
  result: string;
}