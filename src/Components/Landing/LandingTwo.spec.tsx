import { test, expect } from "@playwright/experimental-ct-react";
import LandingTwo from "./LandingTwo";

test("renders", async ({ mount, page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const component = await mount(<LandingTwo />);
  await expect(component).toHaveScreenshot();
});
