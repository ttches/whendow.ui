import { describe, expect, it } from "vitest";
import { compareDates, formatDate } from "./dates";

describe("formatDate", () => {
  it("converts an ISO date string to M/D/Y", () => {
    expect(formatDate("2024-03-05T00:00:00.000Z")).toBe("2024/3/5");
  });

  it("strips leading zeros from month and day", () => {
    expect(formatDate("2024-01-09")).toBe("2024/1/9");
  });
});

describe("compareDates", () => {
  it("isBefore returns true only when the date is earlier", () => {
    expect(compareDates("2024/1/1").isBefore("2024/1/2")).toBe(true);
    expect(compareDates("2024/1/2").isBefore("2024/1/1")).toBe(false);
    expect(compareDates("2024/1/1").isBefore("2024/1/1")).toBe(false);
  });

  it("isAfter returns true only when the date is later", () => {
    expect(compareDates("2024/1/2").isAfter("2024/1/1")).toBe(true);
    expect(compareDates("2024/1/1").isAfter("2024/1/2")).toBe(false);
    expect(compareDates("2024/1/1").isAfter("2024/1/1")).toBe(false);
  });

  it("isWithinRange is inclusive of both endpoints", () => {
    const start = "2024/1/1";
    const end = "2024/1/31";

    expect(compareDates(start).isWithinRange(start, end)).toBe(true);
    expect(compareDates(end).isWithinRange(start, end)).toBe(true);
    expect(compareDates("2024/1/15").isWithinRange(start, end)).toBe(true);
  });

  it("isWithinRange rejects dates outside the range", () => {
    const start = "2024/1/1";
    const end = "2024/1/31";

    expect(compareDates("2023/12/31").isWithinRange(start, end)).toBe(false);
    expect(compareDates("2024/2/1").isWithinRange(start, end)).toBe(false);
  });
});
