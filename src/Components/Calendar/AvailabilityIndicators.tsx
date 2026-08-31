import { IndicatorType } from "./Calendar";
import {
  Bar,
  Dot,
  DotsContainer,
  GradientBackgroundOverlay,
  GradientBorderOverlay,
  GradientGlowOverlay,
  GradientGlowStrongOverlay,
  GradientTriangleOverlay,
  TextureDotsWithUserOverlay,
  TextureSquaresOverlay,
  TextureUserDotsOverlay,
  TriangleBarsContainer,
} from "./AvailabilityIndicators.styles";

type AvailabilityIndicatorProps = {
  type: IndicatorType;
  percentage: number;
  hasCurrentUserAvailability?: boolean;
};

const AvailabilityIndicator = ({
  type,
  percentage,
  hasCurrentUserAvailability = false,
}: AvailabilityIndicatorProps) => {
  if (type === "none") return null;

  switch (type) {
    case "gradient-border":
      return <GradientBorderOverlay percentage={percentage} />;

    case "gradient-triangle":
      return <GradientTriangleOverlay percentage={percentage} />;

    case "gradient-glow":
      return <GradientGlowOverlay percentage={percentage} />;

    case "gradient-glow-strong":
      return <GradientGlowStrongOverlay percentage={percentage} />;

    case "gradient-background":
      return <GradientBackgroundOverlay percentage={percentage} />;

    case "dots": {
      const maxDots = 5;
      const numDotsToShow = Math.round((percentage / 100) * maxDots);
      if (numDotsToShow === 0) return null;

      return (
        <DotsContainer>
          {Array.from({ length: numDotsToShow }, (_, i) => (
            <Dot key={i} filled={true} />
          ))}
        </DotsContainer>
      );
    }

    case "bars": {
      // Triangle/Mountain pattern - peak in middle, shrink outward
      const numBars = 5;
      const maxBarHeight = 12;
      const triangleHeights = [3, 6, 12, 6, 3]; // Mountain shape

      return (
        <TriangleBarsContainer>
          {Array.from({ length: numBars }, (_, i) => {
            const barThreshold = ((i + 1) / numBars) * 100;
            const baseHeight = triangleHeights[i];
            const barHeight = percentage >= barThreshold ? baseHeight : 0;
            return <Bar key={i} height={barHeight} />;
          })}
        </TriangleBarsContainer>
      );
    }

    case "texture": {
      // Enhanced height-based dots texture with user indicator
      if (percentage === 0) return null;
      return (
        <>
          <TextureDotsWithUserOverlay percentage={percentage} />
          {hasCurrentUserAvailability && (
            <TextureUserDotsOverlay percentage={percentage} />
          )}
        </>
      );
    }

    case "texture-squares": {
      // Height-based squares texture - only show if percentage > 0
      if (percentage === 0) return null;
      return <TextureSquaresOverlay percentage={percentage} />;
    }

    default:
      return null;
  }
};

export default AvailabilityIndicator;
