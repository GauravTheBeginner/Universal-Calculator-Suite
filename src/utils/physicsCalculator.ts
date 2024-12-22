interface PhysicsResult {
  value: number;
  unit: string;
}

export function calculatePhysics(formula: string, values: Record<string, string>): PhysicsResult {
  const parseValue = (key: string): number => {
    const value = parseFloat(values[key]);
    if (isNaN(value)) {
      throw new Error(`Invalid value for ${key}`);
    }
    return value;
  };

  switch (formula) {
    case 'velocity': {
      const distance = parseValue('distance');
      const time = parseValue('time');
      if (time === 0) {
        throw new Error('Time cannot be zero for velocity calculation');
      }
      return {
        value: distance / time,
        unit: 'm/s'
      };
    }

    case 'force': {
      const mass = parseValue('mass');
      const acceleration = parseValue('acceleration');
      return {
        value: mass * acceleration,
        unit: 'N'
      };
    }

    case 'energy': {
      const mass = parseValue('mass');
      const velocity = parseValue('velocity');
      return {
        value: 0.5 * mass * velocity * velocity,
        unit: 'J'
      };
    }

    default:
      throw new Error('Invalid formula');
  }
}
