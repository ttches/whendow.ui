import { test, expect } from "@playwright/experimental-ct-react";
import SelectWinningDates from "./SelectWinningDates";

const availabilities = [
  { id: 1, meetingId: "m1", date: "2025/7/9", userName: "alice" },
  { id: 2, meetingId: "m1", date: "2025/7/9", userName: "bob" },
];

test("prompts to tap a winning date", async ({ mount }) => {
  const component = await mount(
    <SelectWinningDates
      availabilities={availabilities}
      startDate="2025/7/1"
      endDate="2025/7/31"
      meetingId="m1"
      onSuccess={() => {}}
    />,
    { hooksConfig: { route: "/m1" } },
  );
  await expect(component).toHaveScreenshot();
});
