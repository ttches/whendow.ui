import { describe, expect, it } from "vitest";
import sanitizeUsername from "./sanitizeUsername";

describe("sanitizeUsername", () => {
  it("returns an empty string when no input is given", () => {
    expect(sanitizeUsername()).toBe("");
  });

  it("leaves an already-clean username untouched", () => {
    expect(sanitizeUsername("tyler")).toBe("tyler");
  });

  it("strips the first run of digits", () => {
    expect(sanitizeUsername("tyler123")).toBe("tyler");
  });

  it("strips the first space", () => {
    expect(sanitizeUsername("tyler cheswick")).toBe("tylercheswick");
  });

  it("only strips the first offending character, not every occurrence", () => {
    expect(sanitizeUsername("a b c")).toBe("ab c");
  });
});
