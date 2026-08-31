import { describe, expect, it } from "vitest";
import { getCookie, getPasscodeFromCookie, getUserNameFromCookie } from "./cookie";

describe("getCookie", () => {
  it("finds a cookie by name among several", () => {
    document.cookie = "cookie-test-a=1";
    document.cookie = "cookie-test-b=2";

    expect(getCookie("cookie-test-b")).toBe("2");
  });

  it("returns undefined when the cookie isn't set", () => {
    expect(getCookie("cookie-test-missing")).toBeUndefined();
  });
});

describe("getUserNameFromCookie", () => {
  it("decodes the username stored ahead of the ':' separator", () => {
    const meetingId = "meeting-123";
    const encoded = encodeURIComponent(btoa("alice:some-token"));
    document.cookie = `when-${meetingId}=${encoded}`;

    expect(getUserNameFromCookie(meetingId)).toBe("alice");
  });
});

describe("getPasscodeFromCookie", () => {
  it("decodes the passcode stored after the ':' separator", () => {
    const meetingId = "meeting-789";
    const encoded = encodeURIComponent(btoa("alice:some-token"));
    document.cookie = `when-${meetingId}=${encoded}`;

    expect(getPasscodeFromCookie(meetingId)).toBe("some-token");
  });
});
