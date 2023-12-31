import { expect, it } from "vitest";
import { buildImageUrl } from "./buildImageUrl";

it("case #0", () => {
  const url = "https://google.com";
  const path = "/images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://google.com/images/logo.png").toEqual(result);
});

it("case #1", () => {
  const url = "https://google.com/hello";
  const path = "../images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://google.com/images/logo.png").toEqual(result);
});

it("case #2", () => {
  const url = "https://google.com/hello/again";
  const path = "../images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://google.com/hello/images/logo.png").toEqual(result);
});

it("case #3", () => {
  const url = "https://google.com/hello/again";
  const path = "../../images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://google.com/images/logo.png").toEqual(result);
});

it("case #4 - non-relative path", () => {
  const url = "https://google.com/hello/again";
  const path = "https://whatever.com/images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://whatever.com/images/logo.png").toEqual(result);
});

it("case #5 - non-relative path without a protocol", () => {
  const url = "https://google.com/hello/again";
  const path = "//lol.com/images/logo.png";

  const result = buildImageUrl(url, path);

  expect("https://lol.com/images/logo.png").toEqual(result);
});

it("case #6 - jacob", () => {
  const url = "https://jacobzivandesign.com/technology/five-star-rating";
  const path = "/images/git.svg";

  const result = buildImageUrl(url, path);

  expect("https://jacobzivandesign.com/images/git.svg").toEqual(result);
});
