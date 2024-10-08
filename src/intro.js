// Lesson: Writing your first tests
export function max(a, b) {
  if (a === undefined || b === undefined) return undefined;
  if (a === null || b === null) return null;
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

export function factorial(n) {
  if (n === 0 || n === 1) return 1;
  if (n < 0) return undefined;
  return n * factorial(n - 1);
}
