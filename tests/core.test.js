import { describe, it, expect, assert } from "vitest";
import { getCoupons, validateUserInput } from "../src/core";

describe("getCoupons", () => {
	it("should not return a non-empty array", () => {
		const coupons = getCoupons();
		expect(coupons).toBeDefined();
		expect(Array.isArray(coupons)).toBe(true);
		expect(coupons.length).toBeGreaterThan(0);
	});

	it("should return an array of objects containing valid non-empty codes", () => {
		const coupons = getCoupons();
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty("code");
			expect(typeof coupon.code).toBe("string");
			// to tackle "" strings
			expect(coupon.code).toBeTruthy();
		});
	});

	it("should return an array of objects containing valid discounts", () => {
		const coupons = getCoupons();
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty("discount");
			expect(typeof coupon.discount).toBe("number");
			expect(coupon.discount).toBeGreaterThan(0);
			expect(coupon.discount).toBeLessThan(1);
		});
	});
});

// Exercise: Positive and negative testing
describe("validateUserInput", () => {
	// Positive Testing
	it("should return no errors if username and age are valid", () => {
		expect(validateUserInput("abc123", 35)).toMatch(
			/success/i
		);
	});

	//Negative Testing
	it("should return error if username is not a string", () => {
		expect(validateUserInput(99, 35)).toMatch(/invalid/i);
	});

	//Negative Testing
	it("should return error if username is smaller than 3 characters", () => {
		expect(validateUserInput("ab", 35)).toMatch(/invalid/i);
	});

	//Negative Testing
	it("should return error if age is not a string", () => {
		expect(validateUserInput("ab", "99")).toMatch(/invalid/i);
	});

	//Negative Testing
	it("should return error if age is less than 18", () => {
		expect(validateUserInput("ab", 10)).toMatch(/invalid/i);
	});

	//Negative Testing
	it("should return error if both username and age are invalid", () => {
		const errors = validateUserInput(99, 3);
		expect(errors).toMatch(/invalid age/i);
		expect(errors).toMatch(/invalid username/i);
	});
});
