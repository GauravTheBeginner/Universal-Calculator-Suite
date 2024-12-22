interface ConversionRates {
  [key: string]: {
    [key: string]: number;
  };
}

const conversionRates: ConversionRates = {
  length: {
    meters: 1,
    feet: 3.28084,
    inches: 39.3701,
    kilometers: 0.001,
    miles: 0.000621371
  },
  weight: {
    kilograms: 1,
    pounds: 2.20462,
    ounces: 35.274,
    grams: 1000
  },
  volume: {
    liters: 1,
    gallons: 0.264172,
    milliliters: 1000,
    'cubic-meters': 0.001
  }
};

export function convertUnits(value: number, fromUnit: string, toUnit: string, category: string): number {
  const rates = conversionRates[category];
  if (!rates) throw new Error('Invalid category');

  const baseValue = value / rates[fromUnit];
  return baseValue * rates[toUnit];
}