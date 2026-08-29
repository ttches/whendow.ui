import { test, expect } from "@playwright/experimental-ct-react";
import type { IndicatorType } from "./Calendar";
import AvailabilityIndicator from "./AvailabilityIndicators";

const themes: IndicatorType[] = [
  "gradient-border",
  "gradient-triangle",
  "gradient-glow",
  "gradient-glow-strong",
  "gradient-background",
  "dots",
  "bars",
  "texture",
  "texture-squares",
];

for (const theme of themes) {
  test(`renders "${theme}" theme at 60% availability`, async ({ mount }) => {
    const component = await mount(
      <div style={{ position: "relative", width: 80, height: 80, background: "#551665" }}>
        <AvailabilityIndicator type={theme} percentage={60} />
      </div>,
    );
    await expect(component).toHaveScreenshot();
  });
}

test('renders "texture" theme with current-user highlight', async ({ mount }) => {
  const component = await mount(
    <div style={{ position: "relative", width: 80, height: 80, background: "#551665" }}>
      <AvailabilityIndicator type="texture" percentage={60} hasCurrentUserAvailability />
    </div>,
  );
  await expect(component).toHaveScreenshot();
});
