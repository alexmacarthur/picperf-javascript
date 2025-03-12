import { describe, expect, it, vi } from "vitest";
import { getWidth } from "./utils";

describe("getWidth()", () => {
  it("should attach event listener when image is not complete", async () => {
    const mockImage = {
      complete: false,
      addEventListener: vi.fn(),
    } as unknown as HTMLImageElement;

    getWidth(mockImage);

    expect(mockImage.addEventListener).toHaveBeenCalledWith(
      "load",
      expect.any(Function),
    );
  });

  it("should get width when image is loaded", async () => {
    const mockImage = {
      complete: true,
      currentSrc: "https://example.com/image.jpg",
      naturalWidth: 100,
      getBoundingClientRect: () => ({ width: 200 }),
      addEventListener: vi.fn(),
    } as unknown as HTMLImageElement;

    const result = await getWidth(mockImage);

    expect(mockImage.addEventListener).not.toHaveBeenCalled;

    expect(result).toEqual({
      url: "https://example.com/image.jpg",
      renderedWidth: 200,
      naturalWidth: 100,
    });
  });
});
