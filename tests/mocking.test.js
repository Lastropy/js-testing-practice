import { vi, it, expect, describe } from "vitest";
import { getShippingInfo, renderPage } from "../src/mocking";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";

// Mocking a 3rd party Module Values
vi.mock("../src/libs/shipping");
// Understanding the interaction between units
vi.mock("../src/libs/analytics");

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
