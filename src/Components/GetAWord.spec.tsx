import { test, expect } from "@playwright/experimental-ct-react";
import GetAWord from "./GetAWord";

test("renders idle state", async ({ mount }) => {
  const component = await mount(<GetAWord />);
  await expect(component).toHaveScreenshot();
});
