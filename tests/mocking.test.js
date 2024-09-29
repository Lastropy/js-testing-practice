import { vi, it, expect, describe } from "vitest";
import {
	getShippingInfo,
	renderPage,
	submitOrder,
} from "../src/mocking";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";

// Mocking a 3rd party Module Values
vi.mock("../src/libs/shipping");
// Understanding the interaction between units
vi.mock("../src/libs/analytics");
// Exercise - 1
vi.mock("../src/libs/payment");

describe("Mock Function Basics", () => {
	it("Definitions and Matchers", async () => {
		const greet = vi.fn();

		// Ways to mock a function
		greet.mockReturnValue("hi"); // hi
		greet.mockResolvedValue("Hello"); //  Promise { 'Hello' }
		greet.mockImplementation((name) => "Hello " + name); // Hello Shivam
		greet.mockImplementation(async (name) => "Hello " + name); //  Promise { 'Hello Shivam' }

		// Mock Function Assertion Matchers
		greet("Hi");
		expect(greet).toHaveBeenCalled();
		expect(greet).toHaveBeenCalledWith("Hi");
		expect(greet).toHaveBeenCalledOnce();
		expect(greet).toHaveBeenCalledTimes(1);
	});

	it("Mock Function Exercise 1 -  sendMessage", async () => {
		const sendMessage = vi.fn();
		sendMessage.mockImplementation((message) => message);
		const result = sendMessage("ok");
		expect(sendMessage).toHaveBeenCalledWith("ok");
		expect(result).toBe("ok");
	});
});

describe("getShippingInfo", () => {
	// Mocking a 3rd party Module Dependency Function Value
	it("should return us the shipping info if quote can be fetched (mocking values)", () => {
		vi.mocked(getShippingQuote).mockReturnValue({
			cost: 8,
			estimatedDays: 12,
		});
		const result = getShippingInfo("USA");
		expect(result).toMatch(/\$8/i);
		expect(result).toMatch(/12 Days/i);
	});

	it("should return us unavailable if quote cannot be fetched (mocking values)", () => {
		// Mocking a 3rd party Module Dependency Function Value
		vi.mocked(getShippingQuote).mockReturnValue(null);
		const result = getShippingInfo("USA");
		expect(result).toMatch(/unavailable/i);
	});
});

describe("renderPage", () => {
	// Mocks are also used to do Interaction Testing
	// i.e. To test the interaction between units
	it("should call analytics (interaction testing)", async () => {
		await renderPage();
		expect(trackPageView).toHaveBeenCalled();
	});
});

describe("submitOrder", () => {
	// Testing Interaction with other units
	it("should charge the customer", async () => {
		const order = { totalAmount: 35 };
		const creditCard = { creditCardNumber: "3567 9876 3452" };
		vi.mocked(charge).mockResolvedValue({ status: "success" });
		await submitOrder(order, creditCard);
		// Testing interaction with charge()
		expect(charge).toHaveBeenCalledWith(
			creditCard,
			order.totalAmount
		);
	});

	// Mocking charge() to test current unit behaviour
	it("should return success if payment successful", async () => {
		const order = { totalAmount: 35 };
		const creditCard = { creditCardNumber: "3567 9876 3452" };
		vi.mocked(charge).mockResolvedValue({ status: "success" });
		const result = await submitOrder(order, creditCard);
		expect(result).toEqual({ success: true });
	});

	// Mocking charge() to test current unit behaviour
	it("should return error if payment unsuccessful", async () => {
		const order = { totalAmount: 35 };
		const creditCard = { creditCardNumber: "3567 9876 3452" };
		vi.mocked(charge).mockResolvedValue({ status: "failed" });
		const result = await submitOrder(order, creditCard);
		expect(result).toHaveProperty("success");
		expect(result).toHaveProperty("error");
		expect(result.success).toBe(false);
		expect(result.error).toBeTruthy();
	});
});
