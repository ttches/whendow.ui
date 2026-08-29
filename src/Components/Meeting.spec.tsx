import { test, expect } from "@playwright/experimental-ct-react";
import { Route, Routes } from "react-router-dom";
import Meeting from "./Meeting";

test("renders the default view for an unlocked meeting", async ({ mount, page }) => {
  await page.route("**/graphql/**", async (route) => {
    const { query } = route.request().postDataJSON();

    if (query.includes("meetingById")) {
      return route.fulfill({
        json: {
          data: {
            meetingById: {
              name: "Team Offsite",
              startDate: "2025-07-01",
              endDate: "2025-07-31",
              owner: "alice",
              locked: false,
              winningDates: [],
            },
          },
        },
      });
    }

    return route.fulfill({
      json: {
        data: {
          availabilityByMeetingId: [
            { id: 1, meetingId: "m1", date: "2025-07-09", userName: "alice" },
            { id: 2, meetingId: "m1", date: "2025-07-09", userName: "bob" },
          ],
        },
      },
    });
  });

  const component = await mount(
    <Routes>
      <Route path="/:meetingId" element={<Meeting />} />
    </Routes>,
    { hooksConfig: { route: "/m1" } },
  );

  await expect(component.getByRole("heading", { name: "Team Offsite" })).toBeVisible();
  await expect(component).toHaveScreenshot();
});
