import { test, expect } from "@playwright/experimental-ct-react";
import Calendar from "./Calendar";

test("renders with no selection", async ({ mount }) => {
  const component = await mount(
    <Calendar initialMonth={6} selectedDates={[]} onDateClick={() => {}} />,
  );
  await expect(component).toHaveScreenshot();
});

test("renders with a selected date range", async ({ mount }) => {
  const component = await mount(
    <Calendar
      initialMonth={6}
      selectedDates={["2025/7/10", "2025/7/11", "2025/7/12"]}
      isInRange={(dateString) => {
        const date = new Date(dateString).getTime();
        return (
          date >= new Date("2025/7/10").getTime() &&
          date <= new Date("2025/7/12").getTime()
        );
      }}
      onDateClick={() => {}}
    />,
  );
  await expect(component).toHaveScreenshot();
});

test("renders availability indicators for the group", async ({ mount }) => {
  const component = await mount(
    <Calendar
      initialMonth={6}
      selectedDates={[]}
      onDateClick={() => {}}
      userName="alice"
      availabilities={[
        { id: 1, meetingId: "m1", date: "2025/7/9", userName: "alice" },
        { id: 2, meetingId: "m1", date: "2025/7/9", userName: "bob" },
        { id: 3, meetingId: "m1", date: "2025/7/15", userName: "alice" },
        { id: 4, meetingId: "m1", date: "2025/7/15", userName: "bob" },
        { id: 5, meetingId: "m1", date: "2025/7/15", userName: "charlie" },
      ]}
    />,
  );
  await expect(component).toHaveScreenshot();
});
