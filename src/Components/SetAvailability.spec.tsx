import { test, expect } from "@playwright/experimental-ct-react";
import SetAvailability from "./SetAvailability";

const availabilities = [
  { id: 1, meetingId: "m1", date: "2025/7/9", userName: "alice" },
  { id: 2, meetingId: "m1", date: "2025/7/9", userName: "bob" },
];

test("prompts for a username when none is set", async ({ mount }) => {
  const component = await mount(
    <SetAvailability
      availabilities={availabilities}
      startDate="2025/7/1"
      endDate="2025/7/31"
      onSuccess={() => {}}
    />,
    { hooksConfig: { route: "/m1" } },
  );
  await expect(component).toHaveScreenshot();
});
