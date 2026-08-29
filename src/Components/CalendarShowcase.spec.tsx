import { test, expect } from "@playwright/experimental-ct-react";
import CalendarShowcase from "./CalendarShowcase";

test("renders every indicator theme", async ({ mount, page }) => {
  await page.setViewportSize({ width: 1400, height: 3000 });
  const component = await mount(<CalendarShowcase />);
  await expect(component).toHaveScreenshot();
});
