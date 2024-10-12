import { test, expect } from "vitest";
import { add } from "./calc";

test("add(10, 20) should return 30", () => {
  expect(add(10, 20)).toBe(30);
});
