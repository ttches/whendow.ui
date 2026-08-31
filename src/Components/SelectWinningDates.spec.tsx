import { test, expect } from "@playwright/experimental-ct-react";
import SelectWinningDates from "./SelectWinningDates";
import { july } from "../test/calendarDates";

const availabilities = [
  { id: 1, meetingId: "m1", date: july(9), userName: "alice" },
  { id: 2, meetingId: "m1", date: july(9), userName: "bob" },
];

test("prompts to tap a winning date", async ({ mount }) => {
  const component = await mount(
    <SelectWinningDates
      availabilities={availabilities}
      startDate={july(1)}
      endDate={july(31)}
      meetingId="m1"
      onSuccess={() => {}}
    />,
    { hooksConfig: { route: "/m1" } },
  );
  await expect(component).toHaveScreenshot();
});
