import { vi, it, expect, describe } from "vitest";

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
