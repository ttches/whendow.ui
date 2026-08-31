import { test, expect } from "@playwright/experimental-ct-react";
import LoginFlow from "./LoginFlow";

const availabilities = [
  { id: 1, meetingId: "m1", date: "2025/7/9", userName: "alice" },
  { id: 2, meetingId: "m1", date: "2025/7/9", userName: "bob" },
];

test("prompts for a username when none is set", async ({ mount }) => {
  const component = await mount(
    <LoginFlow
      availabilities={availabilities}
      meetingId="m1"
      onClose={() => {}}
    />,
    { hooksConfig: { route: "/m1" } },
  );
  await expect(component).toHaveScreenshot();
});
