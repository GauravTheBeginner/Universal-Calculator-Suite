interface PhysicsResult {
  value: number;
  unit: string;
}

export function calculatePhysics(formula: string, values: Record<string, string>): PhysicsResult {
  switch (formula) {
    case 'velocity':
      const distance = parseFloat(values.distance);
      const time = parseFloat(values.time);
      return {
        value: distance / time,
        unit: 'm/s'
      };

    case 'force':
      const mass = parseFloat(values.mass);
      const acceleration = parseFloat(values.acceleration);
      return {
        value: mass * acceleration,
        unit: 'N'
      };

    case 'energy':
      const m = parseFloat(values.mass);
      const v = parseFloat(values.velocity);
      return {
        value: 0.5 * m * v * v,
        unit: 'J'
      };

    default:
      throw new Error('Invalid formula');
  }
}