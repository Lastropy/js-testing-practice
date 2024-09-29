import {
	describe,
	it,
	expect,
	beforeAll,
	afterEach,
} from "vitest";
import {
	canDrive,
	getCoupons,
	isValidUsername,
	Stack,
	validateUserInput,
} from "../src/core";

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

// Exercise: Boundary Testing
describe("isValidUsername", () => {
	const minLength = 5;
	const maxLength = 15;
	it("should return false if username is smaller than min length", () => {
		expect(isValidUsername("a".repeat(minLength - 1))).toBe(
			false
		);
	});

	it("should return false if username is greater than max length", () => {
		expect(isValidUsername("a".repeat(maxLength + 1))).toBe(
			false
		);
	});

	it("should return true if username is within the range of min and max length", () => {
		expect(isValidUsername("a".repeat(minLength + 1))).toBe(
			true
		);
		expect(isValidUsername("a".repeat(maxLength - 1))).toBe(
			true
		);
	});

	it("should return true if username is at the boundary of the range of min and max length", () => {
		expect(isValidUsername("a".repeat(minLength))).toBe(true);
		expect(isValidUsername("a".repeat(maxLength))).toBe(true);
	});
});

// Parameterized Testing
describe("canDrive", () => {
	it("should return error if countrycode is invalid", () => {
		expect(canDrive(30, "UN")).toMatch(/invalid/i);
	});

	it("should return error if both age and countrycode is invalid", () => {
		expect(canDrive(null, "UN")).toMatch(/invalid/i);
	});

	it.each([
		{ age: 30, countryCode: "US", result: true },
		{ age: 35, countryCode: "UK", result: true },
	])(
		"should return true if age and countrycode are valid",
		({ age, countryCode, result }) => {
			expect(canDrive(age, countryCode)).toBe(result);
		}
	);

	it.each([
		{ age: 15, countryCode: "US", result: false },
		{ age: 16, countryCode: "US", result: true },
		{ age: 17, countryCode: "US", result: true },
		{ age: 16, countryCode: "UK", result: false },
		{ age: 17, countryCode: "UK", result: true },
		{ age: 18, countryCode: "UK", result: true },
	])(
		"should return $result for age=$age and country=$countryCode",
		({ age, countryCode, result }) => {
			expect(canDrive(age, countryCode)).toBe(result);
		}
	);
});

// Setup and Teardown
describe("Stack", () => {
	let stack;
	// Setup
	beforeAll(() => {
		stack = new Stack();
	});

	// Teardown
	afterEach(() => {
		stack.clear();
	});

	it("size should return 0 if stack is empty", () => {
		expect(stack.size()).toBe(0);
	});

	it("size should return size of stack if stack is not empty", () => {
		stack.push(99);
		stack.push(3);
		stack.push(7);
		expect(stack.size()).toBe(3);
	});

	it("isEmpty should return 0 if stack is empty", () => {
		expect(stack.size()).toBe(0);
		expect(stack.isEmpty()).toBe(true);
	});

	it("clear should clear all items in the stack", () => {
		stack.push(99);
		stack.push(49);
		stack.push(59);
		expect(stack.size()).toBe(3);
		stack.clear();
		expect(stack.size()).toBe(0);
	});

	it("isEmpty should return stack size if stack is not empty", () => {
		stack.push(3);
		stack.push(99);
		expect(stack.isEmpty()).toBe(false);
	});

	it("push should insert an item in the stack", () => {
		stack.push(3);
		expect(stack.size()).toBe(1);
	});

	it("pop should remove an item from the top of the stack", () => {
		stack.push(99);
		expect(stack.pop()).toBe(99);
		expect(stack.size()).toBe(0);
	});

	it("pop should throw error if empty stack", () => {
		expect(stack.size()).toBe(0);
		expect(() => stack.pop()).toThrow(/empty/i);
	});

	it("peek should only show the top item and not pop it", () => {
		stack.push(9);
		expect(stack.peek()).toBe(9);
		expect(stack.size()).toBe(1);
	});

	it("peek should throw error if empty stack", () => {
		expect(stack.size()).toBe(0);
		expect(() => stack.peek()).toThrow(/empty/i);
	});
});
