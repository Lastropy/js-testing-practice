// The file to test intro.js
import { describe, it, expect, assert } from "vitest";
import { max } from "../src/intro";

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
