
import { useNavigate } from 'react-router-dom';
import { CalculatorCard } from '../components/CalculatorCard';
import { calculatorCategories } from '../data/calculators';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Universal Calculator Suite
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your comprehensive toolkit for all types of calculations. Select a calculator to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorCategories.map((calc) => (
            <CalculatorCard
              key={calc.id}
              title={calc.title}
              description={calc.description}
              icon={calc.icon}
              onClick={() => navigate(`/calculator/${calc.id}`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}