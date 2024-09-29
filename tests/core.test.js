import { describe, it, expect, assert } from "vitest";
import { getCoupons } from "../src/core";

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
