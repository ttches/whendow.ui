import styled, { keyframes } from "styled-components";
import { IndicatorType } from "./Calendar";

// Gradient Border - Left border that gets thicker and more colorful
const GradientBorderOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ percentage }) =>
    Math.max(0, 2 + (percentage / 100) * 4)}px; // 2px to 6px
  background: ${({ percentage }) => {
    if (percentage === 0) return "transparent";
    const opacity = Math.min(0.4 + (percentage / 100) * 0.6, 1); // 0.4 to 1 opacity
    return `rgba(170, 43, 209, ${opacity})`;
  }};
  pointer-events: none;
  border-radius: 0 0 0 4px;
`;

// Gradient Triangle - Corner triangle that grows with availability
const GradientTriangleOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0
    ${({ percentage }) => Math.max(0, 4 + (percentage / 100) * 12)}px
    ${({ percentage }) => Math.max(0, 4 + (percentage / 100) * 12)}px 0;
  border-color: transparent
    ${({ percentage }) => {
      if (percentage === 0) return "transparent";
      const opacity = Math.min(0.5 + (percentage / 100) * 0.5, 1);
      return `rgba(170, 43, 209, ${opacity})`;
    }}
    transparent transparent;
  pointer-events: none;
`;

// Gradient Glow - Box shadow that intensifies with availability
const GradientGlowOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: ${({ percentage }) => {
    if (percentage === 0) return "none";
    const intensity = Math.min(2 + (percentage / 100) * 6, 8); // 2px to 8px
    const opacity = Math.min(0.3 + (percentage / 100) * 0.4, 0.7);
    return `inset 0 0 ${intensity}px rgba(170, 43, 209, ${opacity})`;
  }};
  pointer-events: none;
  border-radius: 4px;
`;

// Strong Gradient Glow - Much more pronounced outer glow effect
const GradientGlowStrongOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: ${({ percentage }) => {
    if (percentage === 0) return "none";
    const baseOpacity = Math.min(0.4 + (percentage / 100) * 0.4, 0.8);
    const intensity1 = Math.min(4 + (percentage / 100) * 8, 12); // 4px to 12px
    const intensity2 = Math.min(8 + (percentage / 100) * 16, 24); // 8px to 24px
    const intensity3 = Math.min(12 + (percentage / 100) * 24, 36); // 12px to 36px
    return `
      0 0 ${intensity1}px rgba(170, 43, 209, ${baseOpacity}),
      0 0 ${intensity2}px rgba(170, 43, 209, ${baseOpacity * 0.7}),
      0 0 ${intensity3}px rgba(170, 43, 209, ${baseOpacity * 0.4})
    `;
  }};
  pointer-events: none;
  border-radius: 4px;
`;

// Gradient Background - More obvious background tint
const GradientBackgroundOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ percentage }) => {
    if (percentage === 0) return "transparent";
    // More obvious background with lighter purple
    const opacity = Math.min(0.2 + (percentage / 100) * 0.4, 0.6); // 0.2 to 0.6 opacity
    return `rgba(170, 43, 209, ${opacity})`;
  }};
  pointer-events: none;
  border-radius: 4px;
`;

// Dots Indicator
const DotsContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  gap: 2px;
`;

const Dot = styled.div<{ filled: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ filled }) =>
    filled ? "rgba(170, 43, 209, 0.8)" : "rgba(255, 255, 255, 0.3)"};
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

// Radial Indicator
const RadialContainer = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 16px;
  height: 16px;
`;

const RadialProgress = styled.div<{ percentage: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #00ff00 0deg,
    #00ff00 ${({ percentage }) => percentage * 3.6}deg,
    rgba(255, 255, 255, 0.3) ${({ percentage }) => percentage * 3.6}deg,
    rgba(255, 255, 255, 0.3) 360deg
  );
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

// Triangle/Mountain Bars - Peak in middle, shrink outward
const TriangleBarsContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1px;
  align-items: end;
`;

// Diamond Bars - Arranged in diamond pattern
const DiamondBarsContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;
  width: 12px;
  height: 12px;
`;

// Wings Bars - Two groups growing outward from center
const WingsBarsContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3px;
  align-items: end;
`;

const WingsGroup = styled.div`
  display: flex;
  gap: 1px;
  align-items: end;
`;

const Bar = styled.div<{ height: number }>`
  width: 2px;
  height: ${({ height }) => height}px;
  background-color: rgba(170, 43, 209, 0.8);
  border-radius: 1px;
`;

const DiamondBar = styled.div<{ height: number; show: boolean }>`
  width: 3px;
  height: ${({ height }) => height}px;
  background-color: ${({ show }) =>
    show ? "rgba(170, 43, 209, 0.8)" : "transparent"};
  border-radius: 1px;
`;

// Pulse Animation
const pulse = keyframes`
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.6; transform: scale(1); }
`;

const PulseOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ percentage }) => {
    if (percentage === 0) return "rgba(255, 0, 0, 0.1)";
    if (percentage <= 25) return "rgba(255, 165, 0, 0.2)";
    if (percentage <= 50) return "rgba(255, 255, 0, 0.3)";
    if (percentage <= 75) return "rgba(144, 238, 144, 0.4)";
    return "rgba(0, 255, 0, 0.5)";
  }};
  animation: ${pulse}
    ${({ percentage }) => Math.max(0.5, 2 - (percentage / 100) * 1.5)}s infinite;
  pointer-events: none;
  border-radius: 4px;
`;

// Height-based Texture Indicators
const TextureDotsOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ percentage }) =>
    (percentage / 100) * 76}px; // Fill from bottom up, no minimum
  background-image: radial-gradient(
    circle at 2px 2px,
    rgba(170, 43, 209, 0.6) 1px,
    transparent 1px
  );
  background-size: 4px 4px;
  pointer-events: none;
  border-radius: 0 0 4px 4px;
`;

const TextureDiagonalOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ percentage }) =>
    Math.max(2, (percentage / 100) * 76)}px; // Fill from bottom up
  background-image: linear-gradient(
    45deg,
    rgba(170, 43, 209, 0.4) 25%,
    transparent 25%,
    transparent 75%,
    rgba(170, 43, 209, 0.4) 75%
  );
  background-size: 6px 6px;
  pointer-events: none;
  border-radius: 0 0 4px 4px;
`;

const TextureSquaresOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${({ percentage }) =>
    (percentage / 100) * 76}px; // Fill from bottom up, no minimum
  background-image: repeating-conic-gradient(
    from 0deg at 50% 50%,
    rgba(170, 43, 209, 0.5) 0deg 90deg,
    transparent 90deg 180deg
  );
  background-size: 4px 4px;
  pointer-events: none;
  border-radius: 0 0 4px 4px;
`;

// Grainy Height-Based Fill - Natural fade-out with mask
const GrainyHeightOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(20deg, rgba(170, 43, 209, 1), transparent),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(170%) brightness(1000%);
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, ${({ percentage }) => Math.min(1, (percentage / 100) * 1.2)})
      ${({ percentage }) => (percentage / 100) * 60}%,
    rgba(0, 0, 0, 0)
      ${({ percentage }) => Math.min(100, (percentage / 100) * 80 + 20)}%
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, ${({ percentage }) => Math.min(1, (percentage / 100) * 1.2)})
      ${({ percentage }) => (percentage / 100) * 60}%,
    rgba(0, 0, 0, 0)
      ${({ percentage }) => Math.min(100, (percentage / 100) * 80 + 20)}%
  );
  pointer-events: none;
  border-radius: 0 0 4px 4px;
`;

const GrainyHeightIsolate = styled.div`
  isolation: isolate;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
`;

const GrainyHeightOverlayBlend = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(170, 43, 209, 0.3);
  mix-blend-mode: multiply;
`;

// Grainy Radial Spotlight
const GrainyRadialOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: ${({ percentage }) => Math.max(0, 8 + (percentage / 100) * 20)}px;
  height: ${({ percentage }) => Math.max(0, 8 + (percentage / 100) * 20)}px;
  background: radial-gradient(circle, rgba(170, 43, 209, 0.8), transparent 70%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(140%) brightness(350%);
  border-radius: 50%;
  pointer-events: none;
`;

// Grainy Border Fade
const GrainyBorderOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ percentage }) => Math.max(0, 3 + (percentage / 100) * 8)}px;
  background: linear-gradient(to right, rgba(170, 43, 209, 0.8), transparent),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 20 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(160%) brightness(450%);
  pointer-events: none;
  border-radius: 0 0 0 4px;
`;

// Grainy Background Overlay
const GrainyBackgroundOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
      135deg,
      rgba(170, 43, 209, ${({ percentage }) => (percentage / 100) * 0.4}),
      rgba(170, 43, 209, ${({ percentage }) => (percentage / 100) * 0.2})
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(120%) brightness(300%);
  pointer-events: none;
  border-radius: 4px;
`;

// Holographic Foil Effect - Like the example with simulated tilt
const holographicTilt = keyframes`
  from {
    transform: perspective(600px) rotateX(0deg) rotateY(0deg);
  }
  to {
    transform: perspective(600px) rotateX(5deg) rotateY(10deg);
  }
`;

const holographicShimmer = keyframes`
  from {
    filter: contrast(190%) brightness(500%);
  }
  to {
    filter: contrast(190%) brightness(130%);
  }
`;

const HolographicContainer = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  isolation: isolate;
  animation: ${holographicTilt}
    ${({ percentage }) => Math.max(2, 4 - (percentage / 100) * 2)}s infinite
    alternate ease-in-out;
  pointer-events: none;
  border-radius: 4px;
`;

const HolographicNoise = styled.div<{ percentage: number }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      24deg,
      rgba(170, 43, 209, ${({ percentage }) => (percentage / 100) * 0.2}),
      rgba(170, 43, 209, ${({ percentage }) => (percentage / 100) * 0.4})
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  animation: ${holographicShimmer} 2s infinite alternate;
  border-radius: 4px;
`;

const HolographicOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    170,
    43,
    209,
    ${({ percentage }) => (percentage / 100) * 0.3}
  );
  mix-blend-mode: multiply;
  border-radius: 4px;
`;

// Grainy Corner Triangle
const GrainyCornerOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0
    ${({ percentage }) => Math.max(0, 6 + (percentage / 100) * 14)}px
    ${({ percentage }) => Math.max(0, 6 + (percentage / 100) * 14)}px 0;
  border-color: transparent rgba(170, 43, 209, 0.8) transparent transparent;
  pointer-events: none;
`;

const GrainyCornerNoise = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ percentage }) => Math.max(0, 6 + (percentage / 100) * 14)}px;
  height: ${({ percentage }) => Math.max(0, 6 + (percentage / 100) * 14)}px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(180%) brightness(400%);
  clip-path: polygon(100% 0, 0 100%, 100% 100%);
  pointer-events: none;
`;

// Grainy Shimmer Spotlight
const grainyShimmer = keyframes`
  0% { 
    transform: translateX(-100%);
    filter: contrast(160%) brightness(400%);
  }
  50% {
    filter: contrast(180%) brightness(600%);
  }
  100% { 
    transform: translateX(100%);
    filter: contrast(160%) brightness(400%);
  }
`;

const GrainyShimmerOverlay = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      ellipse at center,
      rgba(170, 43, 209, ${({ percentage }) => (percentage / 100) * 0.6}),
      transparent 70%
    ),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  filter: contrast(160%) brightness(400%);
  animation: ${grainyShimmer}
    ${({ percentage }) => Math.max(2, 4 - (percentage / 100) * 2)}s infinite;
  pointer-events: none;
  border-radius: 4px;
  overflow: hidden;
`;

type AvailabilityIndicatorProps = {
  type: IndicatorType;
  percentage: number;
};

const AvailabilityIndicator = ({
  type,
  percentage,
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
      // Height-based dots texture - only show if percentage > 0
      if (percentage === 0) return null;
      return <TextureDotsOverlay percentage={percentage} />;
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
