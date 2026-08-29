import { test, expect } from "@playwright/experimental-ct-react";
import FloatingFooter from "./FloatingFooter";

test("renders with text and both navigation buttons enabled", async ({ mount }) => {
  const component = await mount(
    <FloatingFooter
      text="Step 1 of 3"
      onNext={() => () => {}}
      onBack={() => () => {}}
    />,
  );
  await expect(component).toHaveScreenshot();
});

test("renders with next disabled and back unavailable", async ({ mount }) => {
  const component = await mount(
    <FloatingFooter
      text="Step 1 of 3"
      nextDisabled
      onNext={() => () => {}}
      onBack={() => undefined}
    />,
  );
  await expect(component).toHaveScreenshot();
});

test("renders with an input field", async ({ mount }) => {
  const component = await mount(
    <FloatingFooter
      input={{ value: "", onChange: () => {}, placeholder: "Enter a name" }}
      onNext={() => () => {}}
      onBack={() => () => {}}
    />,
  );
  await expect(component).toHaveScreenshot();
});
