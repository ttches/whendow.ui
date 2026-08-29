import { test, expect } from "@playwright/experimental-ct-react";
import Markie from "./Markie";

test("renders", async ({ mount, page }) => {
  await page.setViewportSize({ width: 400, height: 300 });
  const component = await mount(<Markie />);
  await expect(component).toHaveScreenshot();
});
