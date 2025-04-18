import { beforeEach, expect, test } from "vitest";
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

  localStorage.setItem(
    "picperf:crawl:time",
    JSON.stringify({
      [window.location.href]: recentTime.toString(),
    }),
  );

  expect(isExpired()).toBe(false);
});

test("set updates the last time in local storage", () => {
  set();

  const storedTime = JSON.parse(localStorage.getItem("picperf:crawl:time"));

  expect(storedTime).not.toBeNull();

  expect(parseInt(storedTime[window.location.href], 10)).toBeGreaterThan(0);
});

test("sets time for multiple URLs", () => {
  const url1 = "https://example.com/page1";
  const url2 = "https://example.com/page2";

  localStorage.setItem(
    "picperf:crawl:time",
    JSON.stringify({
      [url1]: Date.now().toString(),
    }),
  );

  set();

  const storedTime = JSON.parse(localStorage.getItem("picperf:crawl:time"));

  expect(storedTime[url1]).not.toBeNull();
  expect(storedTime[url2]).not.toBeNull();
});
