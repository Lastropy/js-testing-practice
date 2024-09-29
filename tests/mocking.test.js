import { vi, it, expect, describe } from "vitest";

describe("test suite", () => {
	it("test case", async () => {
		const greet = vi.fn();
		greet.mockReturnValue("hi"); // hi
		greet.mockResolvedValue("Hello"); //  Promise { 'Hello' }
		greet.mockImplementation((name) => "Hello " + name); // Hello Shivam
		greet.mockImplementation(async (name) => "Hello " + name); //  Promise { 'Hello Shivam' }
	});
});
