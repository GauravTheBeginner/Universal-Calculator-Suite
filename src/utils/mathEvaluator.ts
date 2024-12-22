export function evaluate(expression: string): number {
  // Replace mathematical symbols with their JavaScript equivalents
  const sanitizedExpression = expression
    .replace('×', '*')
    .replace('÷', '/');

  try {
    // Using Function constructor to evaluate the expression
    // This is safe for our calculator as we control the input
    return new Function(`return ${sanitizedExpression}`)();
  } catch (error) {
    throw new Error('Invalid expression');
  }
}