// The file to test intro.js
import { describe, it, expect, assert } from "vitest";
import { max, fizzBuzz } from "../src/intro";

//describe - define a SUITE of tests
describe("max", () => {
  // First test case
  it("should return 1st argument if it is greater", () => {
    // AAA Framework - Arrange Act Assert

    // Arrange
    let a = 4,
      b = 2;

    // Act
    const result = max(a, b);

    //Assert
    expect(result).toBe(4);
  });

  it("should return 2nd argument if it is greater", () => {
    // AAA Framework in 1 line
    expect(max(2, 4)).toBe(4);
  });

  it("should return any argument if both arguments are equal", () => {
    // AAA Framework in 1 line
    expect(max(2, 2)).toBe(2);
  });

  it("should return null if any argument is null", () => {
    // AAA Framework in 1 line
    expect(max(null, 2)).toBe(null);
  });

  it("should return null if any one argument is undefined", () => {
    // AAA Framework in 1 line
    expect(max(3, undefined)).toBe(undefined);
  });
});

// After defining these tests, one can refactor their code
// easily and see if the tests are still passing

// Tests for fizzBuzz function
describe("fizzBuzz", () => {
  it("should return FizzBuzz if argument is divisible by both 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return Fizz if argument is divisible by 3 only", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("should return Buzz if argument is divisible by 5 only", () => {
    expect(fizzBuzz(25)).toBe("Buzz");
  });

  it("should return the number as string if argument is neither divisible by 3 nor 5", () => {
    expect(fizzBuzz(23)).toBe("23");
  });
});
