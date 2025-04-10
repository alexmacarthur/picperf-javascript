import { expect, it, vi } from "vitest";
import { handle } from "./handle";

it("makes fresh request", () => {
  const mockFetch = vi.fn();

  handle(mockFetch);

  expect(mockFetch).toHaveBeenCalledWith(
    "https://go.picperf.io/api/optimize/transform/auto",
    {
      keepalive: true,
      priority: "low",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: window.location.origin + window.location.pathname,
      }),
    }
  );
});

it("makes request when set time is recent", () => {
  const mockFetch = vi.fn();

  const recentTime = Date.now() - 1000 * 60 * 60 * 21;
  localStorage.setItem("picperf:crawl:time", recentTime.toString());

  handle(mockFetch);

  expect(mockFetch).not.toHaveBeenCalled();
});

it("makes request when set time is expired", () => {
  const mockFetch = vi.fn();

  const recentTime = Date.now() - 1000 * 60 * 60 * 25;
  localStorage.setItem("picperf:crawl:time", recentTime.toString());

  handle(mockFetch);

  expect(mockFetch).toHaveBeenCalledWith(
    "https://go.picperf.io/api/optimize/transform/auto",
    {
      keepalive: true,
      priority: "low",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: window.location.origin + window.location.pathname,
      }),
    }
  );
});
