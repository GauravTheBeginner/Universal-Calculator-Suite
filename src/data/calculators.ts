import { 
  Calculator, 
  LineChart, 
  FunctionSquare, // Changed from Function
  Sigma, 
  Clock, 
  Ruler, 
  Scale,
  Thermometer,
  Binary,
  Calendar
} from 'lucide-react';

export const calculatorCategories = [
  {
    id: 'scientific',
    title: 'Scientific Calculator',
    description: 'Advanced mathematical operations, trigonometry, and exponential functions',
    icon: Calculator
  },
  {
    id: 'financial',
    title: 'Financial Calculator',
    description: 'Investment, loan, mortgage, and other financial calculations',
    icon: LineChart
  },
  {
    id: 'calculus',
    title: 'Calculus Calculator',
    description: 'Derivatives, integrals, limits, and series calculations',
    icon: FunctionSquare // Changed from Function
  },
  {
    id: 'statistics',
    title: 'Statistics Calculator',
    description: 'Mean, median, mode, standard deviation, and probability calculations',
    icon: Sigma
  },
  {
    id: 'time',
    title: 'Time Calculator',
    description: 'Time difference, duration, and timezone conversions',
    icon: Clock
  },
  {
    id: 'unit',
    title: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: Ruler
  },
  {
    id: 'physics',
    title: 'Physics Calculator',
    description: 'Velocity, force, energy, and other physics calculations',
    icon: Scale
  },
  {
    id: 'temperature',
    title: 'Temperature Converter',
    description: 'Convert between Celsius, Fahrenheit, and Kelvin',
    icon: Thermometer
  },
  {
    id: 'programming',
    title: 'Programming Calculator',
    description: 'Binary, hexadecimal, and other number system conversions',
    icon: Binary
  },
  {
    id: 'date',
    title: 'Date Calculator',
    description: 'Date difference, add/subtract days, and working days calculation',
    icon: Calendar
  }
];