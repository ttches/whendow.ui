import { test, expect } from "@playwright/experimental-ct-react";
import SetAvailability from "./SetAvailability";
import { july } from "../test/calendarDates";

const availabilities = [
  { id: 1, meetingId: "m1", date: july(9), userName: "alice" },
  { id: 2, meetingId: "m1", date: july(9), userName: "bob" },
];

test("renders the availability calendar", async ({ mount }) => {
  const component = await mount(
    <SetAvailability
      availabilities={availabilities}
      startDate={july(1)}
      endDate={july(31)}
      onSuccess={() => {}}
    />,
    { hooksConfig: { route: "/m1" } },
  );
  await expect(component).toHaveScreenshot();
});
