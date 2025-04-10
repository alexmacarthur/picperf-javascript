import { beforeEach, describe, expect, test } from "vitest";
import { isExpired, set } from "./time";

beforeEach(() => {
  localStorage.clear();
});

test("isExpired returns true if no last time is set", () => {
  expect(isExpired()).toBe(true);
});

test("isExpired returns true if last time is older than 24 hours", () => {
  const pastTime = Date.now() - 1000 * 60 * 60 * 25;
  localStorage.setItem("picperf:crawl:time", pastTime.toString());
  expect(isExpired()).toBe(true);
});

test("isExpired returns false if last time is within the last 24 hours", () => {
  const recentTime = Date.now() - 1000 * 60 * 60 * 23;
  localStorage.setItem("picperf:crawl:time", recentTime.toString());
  expect(isExpired()).toBe(false);
});

test("set updates the last time in local storage", () => {
  set();
  const storedTime = localStorage.getItem("picperf:crawl:time");
  expect(storedTime).not.toBeNull();
  expect(parseInt(storedTime!, 10)).toBeGreaterThan(0);
});
