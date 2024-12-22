import React, { useState } from 'react';
import { calculatePhysics } from '../../utils/physicsCalculator';

export function PhysicsCalculator() {
  const [formula, setFormula] = useState('velocity');
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');

  type FormulaUnits = {
    [key: string]: string;
  };

  const formulas = {
    velocity: {
      name: 'Velocity (v = d/t)',
      inputs: ['distance', 'time'],
      units: { distance: 'meters', time: 'seconds', result: 'm/s' } as FormulaUnits
    },
    force: {
      name: 'Force (F = ma)',
      inputs: ['mass', 'acceleration'],
      units: { mass: 'kg', acceleration: 'm/s²', result: 'N' } as FormulaUnits
    },
    energy: {
      name: 'Kinetic Energy (E = ½mv²)',
      inputs: ['mass', 'velocity'],
      units: { mass: 'kg', velocity: 'm/s', result: 'J' } as FormulaUnits
    }
  };

  const handleCalculate = () => {
    const result = calculatePhysics(formula, values);
    setResult(`Result: ${result.value} ${result.unit}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Formula</label>
          <select
            value={formula}
            onChange={(e) => {
              setFormula(e.target.value);
              setValues({});
              setResult('');
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
          >
            {Object.entries(formulas).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>

        {formulas[formula as keyof typeof formulas].inputs.map((input) => (
          <div key={input}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {input.charAt(0).toUpperCase() + input.slice(1)} ({formulas[formula as keyof typeof formulas].units[input]})
            </label>
            <input
              type="number"
              value={values[input] || ''}
              onChange={(e) => setValues({ ...values, [input]: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-gray-900"
            />
          </div>
        ))}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition text-lg font-medium shadow-md"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-lg font-semibold">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}