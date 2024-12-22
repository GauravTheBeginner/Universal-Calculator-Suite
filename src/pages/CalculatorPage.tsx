import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { calculatorCategories } from '../data/calculators';
import { ScientificCalculator } from '../components/calculators/ScientificCalculator';
import { FinancialCalculator } from '../components/calculators/FinancialCalculator';
import { CalculusCalculator } from '../components/calculators/CalculusCalculator';
import { StatisticsCalculator } from '../components/calculators/StatisticsCalculator';
import { TimeCalculator } from '../components/calculators/TimeCalculator';
import { UnitConverter } from '../components/calculators/UnitConverter';
import { PhysicsCalculator } from '../components/calculators/PhysicsCalculator';
import { ProgrammingCalculator } from '../components/calculators/ProgrammingCalculator';
import { DateCalculator } from '../components/calculators/DateCalculator';
import TemperatureCalculator from '../components/calculators/TemperatureCalculator';


const calculatorComponents: Record<string, React.FC> = {
  scientific: ScientificCalculator,
  financial: FinancialCalculator,
  calculus: CalculusCalculator,
  statistics: StatisticsCalculator,
  time: TimeCalculator,
  unit: UnitConverter,
  physics: PhysicsCalculator,
  programming: ProgrammingCalculator,
  date: DateCalculator, 
  temperature: TemperatureCalculator
};

export function CalculatorPage() {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const calculator = calculatorCategories.find(calc => calc.id === type);
  const CalculatorComponent = type ? calculatorComponents[type] : null;

  if (!calculator || !CalculatorComponent) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Calculators
      </button>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{calculator.title}</h1>
      <CalculatorComponent />
    </div>
  );
}