import styled, { keyframes } from "styled-components";

const PURPLE = (a: number) => `rgba(170, 43, 209, ${a})`;
const BLUE = (a: number) => `rgba(80, 150, 255, ${a})`;
const ORANGE = (a: number) => `rgba(255, 138, 0, ${a})`;

const LANE_COUNT = 5;
const ORBS_PER_LANE = 3;
const WINNER_EXTRA = 8;

const litCount = (pct: number, total: number) =>
  Math.max(0, Math.min(total, Math.round((pct / 100) * total)));

const rise = keyframes`
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  12% { opacity: 1; }
  70% { opacity: 0.85; }
  100% { transform: translateY(-94px) scale(1.05); opacity: 0; }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Orb = styled.span<{
  $left: number;
  $size: number;
  $duration: number;
  $delay: number;
  $color: string;
}>`
  position: absolute;
  left: ${(p) => p.$left}%;
  bottom: -12px;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin-left: ${(p) => -p.$size / 2}px;
  background: ${(p) => p.$color};
  border-radius: 50%;
  box-shadow: 0 0 ${(p) => p.$size + 2}px ${(p) => p.$color};
  animation: ${rise} ${(p) => p.$duration}s linear ${(p) => p.$delay}s infinite;
  will-change: transform, opacity;
`;

type OrbConfig = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
};

const buildOrbs = (
  percentage: number,
  isMine: boolean,
  isWinner: boolean,
  availableCount: number
): OrbConfig[] => {
  const activeLanes = litCount(percentage, LANE_COUNT);
  const speedScale = isWinner ? 0.55 : 1;

  const laneOrbs = Array.from({ length: activeLanes }).flatMap((_, lane) => {
    const laneLeft = 10 + lane * 20;
    return Array.from({ length: ORBS_PER_LANE }, (_, j) => {
      const n = lane * 5 + j + 1;
      return {
        left: laneLeft + (((n * 13) % 9) - 4),
        size: 3 + ((n * 3) % 2),
        duration: (1.5 + lane * 0.34) * speedScale,
        delay: -((n * 7) % 9) * 0.45,
      };
    });
  });

  const winnerOrbs = isWinner
    ? Array.from({ length: WINNER_EXTRA }, (_, i) => {
        const n = i + 51;
        return {
          left: 4 + ((n * 37) % 90),
          size: 2.5 + ((n * 5) % 4) + 1.5,
          duration: (1.6 + ((n * 13) % 8) * 0.3) * 0.5,
          delay: -((n * 17) % 12) * 0.37,
        };
      })
    : [];

  const soleAvailable = isMine && availableCount === 1;

  return [...laneOrbs, ...winnerOrbs].map((orb, i) => {
    const isWinnerOrb = isWinner && i >= laneOrbs.length;
    const isMineOrb = isMine && (soleAvailable || i % 3 === 0);
    return {
      ...orb,
      color: isWinnerOrb
        ? ORANGE(0.98)
        : isMineOrb
          ? BLUE(0.98)
          : isWinner
            ? ORANGE(0.92)
            : PURPLE(0.9),
    };
  });
};

type ShimmerColumnsOverlayProps = {
  percentage: number;
  isMine: boolean;
  isWinner: boolean;
  availableCount: number;
};

const ShimmerColumnsOverlay = ({
  percentage,
  isMine,
  isWinner,
  availableCount,
}: ShimmerColumnsOverlayProps) => {
  const orbs = buildOrbs(percentage, isMine, isWinner, availableCount);

  if (orbs.length === 0) return null;

  return (
    <Overlay>
      {orbs.map((orb, i) => (
        <Orb
          key={i}
          $left={orb.left}
          $size={orb.size}
          $duration={orb.duration}
          $delay={orb.delay}
          $color={orb.color}
        />
      ))}
    </Overlay>
  );
};

export default ShimmerColumnsOverlay;
