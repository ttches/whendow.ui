import { test, expect } from "@playwright/experimental-ct-react";
import Calendar from "./Calendar";
import { july } from "../../test/calendarDates";

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
      selectedDates={[july(10), july(11), july(12)]}
      isInRange={(dateString) => {
        const date = new Date(dateString).getTime();
        return (
          date >= new Date(july(10)).getTime() &&
          date <= new Date(july(12)).getTime()
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
        { id: 1, meetingId: "m1", date: july(9), userName: "alice" },
        { id: 2, meetingId: "m1", date: july(9), userName: "bob" },
        { id: 3, meetingId: "m1", date: july(15), userName: "alice" },
        { id: 4, meetingId: "m1", date: july(15), userName: "bob" },
        { id: 5, meetingId: "m1", date: july(15), userName: "charlie" },
      ]}
    />,
  );
  await expect(component).toHaveScreenshot();
});
