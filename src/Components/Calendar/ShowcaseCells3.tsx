/* eslint-disable react-refresh/only-export-components -- showcase registry exports idea data alongside its cell components */
import type { ShowcaseCellState, ShowcaseIdea } from "./ShowcaseCalendar";
import styled, { keyframes } from "styled-components";

const PURPLE = (a: number) => `rgba(170, 43, 209, ${a})`;
const BLUE = (a: number) => `rgba(80, 150, 255, ${a})`;
const ORANGE = (a: number) => `rgba(255, 138, 0, ${a})`;

const litCount = (pct: number, total: number) =>
  Math.max(0, Math.min(total, Math.round((pct / 100) * total)));

const MAX_PARTICLES = 16;
const WINNER_EXTRA = 8;

type Particle = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
};

const buildParticles = (
  count: number,
  seed: number,
  speedScale = 1
): Particle[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + seed * 7 + 1;
    return {
      left: 4 + ((n * 37) % 90),
      size: 2.5 + ((n * 5) % 4),
      duration: (1.6 + ((n * 13) % 8) * 0.3) * speedScale,
      delay: -((n * 17) % 12) * 0.37,
      sway: (((n * 11) % 7) - 3) * 2,
    };
  });

const particleCount = (percentage: number) =>
  percentage <= 0
    ? 0
    : Math.max(1, Math.round((percentage / 100) * MAX_PARTICLES));

const particleColor = (
  index: number,
  isMine: boolean,
  availableCount: number,
  isWinner: boolean
) => {
  if (isMine && (availableCount === 1 || index % 3 === 0)) return BLUE(0.98);
  return isWinner ? ORANGE(0.92) : PURPLE(0.9);
};

const rise = keyframes`
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  12% { opacity: 1; }
  70% { opacity: 0.85; }
  100% { transform: translateY(-94px) scale(1.05); opacity: 0; }
`;

const riseSway = keyframes`
  0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
  12% { opacity: 1; }
  50% { transform: translate(var(--sway), -48px) scale(1); }
  72% { opacity: 0.85; }
  100% { transform: translate(0, -94px) scale(1.05); opacity: 0; }
`;

const blink = keyframes`
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  20% { opacity: 0; }
  30% { opacity: 0.8; }
  40% { opacity: 0; }
  62% { opacity: 0; }
  72% { opacity: 0.8; }
  82% { opacity: 0; }
  100% { transform: translateY(-94px) scale(1); opacity: 0; }
`;

const Shell = styled.div<{ $outOfMonth: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 7);
  height: 84px;
  overflow: hidden;
  background-color: ${(p) => (p.$outOfMonth ? "#481154" : "#551665")};
  border: 1px solid #601972;
  font-family: "copasetic";
  font-weight: 900;
  color: #f3e6f7;
  cursor: default;
`;

const Scene = styled.div<{ $outOfMonth: boolean }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: ${(p) => (p.$outOfMonth ? 0.4 : 1)};
  filter: ${(p) => (p.$outOfMonth ? "saturate(0.35) brightness(0.85)" : "none")};
  pointer-events: none;
`;

const Day = styled.span`
  position: relative;
  z-index: 5;
  font-size: 20px;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
`;

const Particle = styled.span<{
  $left: number;
  $size: number;
  $duration: number;
  $delay: number;
  $color: string;
  $sway: number;
  $animation: ReturnType<typeof keyframes>;
  $star: boolean;
}>`
  position: absolute;
  left: ${(p) => p.$left}%;
  bottom: -12px;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  margin-left: ${(p) => -p.$size / 2}px;
  background: ${(p) => p.$color};
  border-radius: ${(p) => (p.$star ? "0" : "50%")};
  clip-path: ${(p) =>
    p.$star
      ? "polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)"
      : "none"};
  box-shadow: 0 0 ${(p) => p.$size + 2}px ${(p) => p.$color};
  --sway: ${(p) => p.$sway}px;
  animation: ${(p) => p.$animation} ${(p) => p.$duration}s linear
    ${(p) => p.$delay}s infinite;
  will-change: transform, opacity;
`;

type ParticleConfig = Particle & { color: string };

const getCellParticles = (
  percentage: number,
  isMine: boolean,
  availableCount: number,
  isWinner: boolean,
  seed: number
): ParticleConfig[] => {
  const baseCount = particleCount(percentage);
  const base = buildParticles(baseCount, seed, isWinner ? 0.55 : 1);
  const winnerExtras = isWinner
    ? buildParticles(WINNER_EXTRA, seed + 50, 0.5).map((p) => ({
        ...p,
        size: p.size + 1.5,
      }))
    : [];
  return [...base, ...winnerExtras].map((p, i) => ({
    ...p,
    color:
      isWinner && i >= baseCount
        ? ORANGE(0.98)
        : particleColor(i, isMine, availableCount, isWinner),
  }));
};

/* 21. Rising Shimmer - a field of motes drifts upward, fading in and out */
const RisingShimmerCell = ({
  day,
  percentage,
  availableCount,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const particles = getCellParticles(
    percentage,
    isMine,
    availableCount,
    isWinner,
    3
  );
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {particles.map((p, i) => (
          <Particle
            key={i}
            $left={p.left}
            $size={p.size}
            $duration={p.duration}
            $delay={p.delay}
            $sway={p.sway}
            $color={p.color}
            $animation={rise}
            $star={false}
          />
        ))}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

/* 22. Shimmer Columns - motes rise inside vertical lanes, one speed per lane */
const LANE_COUNT = 5;

const buildColumnParticles = (
  percentage: number,
  isMine: boolean,
  availableCount: number,
  isWinner: boolean
): ParticleConfig[] => {
  const activeLanes = litCount(percentage, LANE_COUNT);
  const speedScale = isWinner ? 0.55 : 1;
  const laneParticles = Array.from({ length: activeLanes }).flatMap(
    (_, lane) => {
      const laneLeft = 10 + lane * 20;
      return [0, 1, 2].map((j) => {
        const n = lane * 5 + j + 1;
        return {
          left: laneLeft + (((n * 13) % 9) - 4),
          size: 3 + ((n * 3) % 2),
          duration: (1.5 + lane * 0.34) * speedScale,
          delay: -((n * 7) % 9) * 0.45,
          sway: 0,
        };
      });
    }
  );
  const winnerExtras = isWinner
    ? buildParticles(WINNER_EXTRA, 9, 0.5).map((p) => ({
        ...p,
        size: p.size + 1.5,
      }))
    : [];
  return [...laneParticles, ...winnerExtras].map((p, i) => ({
    ...p,
    color:
      isWinner && i >= laneParticles.length
        ? ORANGE(0.98)
        : particleColor(i, isMine, availableCount, isWinner),
  }));
};

const ShimmerColumnsCell = ({
  day,
  percentage,
  availableCount,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const particles = buildColumnParticles(
    percentage,
    isMine,
    availableCount,
    isWinner
  );
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {particles.map((p, i) => (
          <Particle
            key={i}
            $left={p.left}
            $size={p.size}
            $duration={p.duration}
            $delay={p.delay}
            $sway={p.sway}
            $color={p.color}
            $animation={rise}
            $star={false}
          />
        ))}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

/* 25. Shimmer Columns (Blink) - same lanes, but motes stay dark more than lit */
const ShimmerColumnsBlinkCell = ({
  day,
  percentage,
  availableCount,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const particles = buildColumnParticles(
    percentage,
    isMine,
    availableCount,
    isWinner
  );
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {particles.map((p, i) => (
          <Particle
            key={i}
            $left={p.left}
            $size={p.size}
            $duration={isWinner ? p.duration : p.duration * 2.6 + 2}
            $delay={p.delay}
            $sway={p.sway}
            $color={p.color}
            $animation={isWinner ? rise : blink}
            $star={false}
          />
        ))}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

/* 23. Firefly Drift - motes sway side to side as they rise */
const FireflyDriftCell = ({
  day,
  percentage,
  availableCount,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const particles = getCellParticles(
    percentage,
    isMine,
    availableCount,
    isWinner,
    8
  ).map((p) => ({
    ...p,
    size: p.size + 0.5,
    duration: p.duration + (isWinner ? 0.3 : 0.6),
    sway: p.sway + (p.sway >= 0 ? 4 : -4),
  }));
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {particles.map((p, i) => (
          <Particle
            key={i}
            $left={p.left}
            $size={p.size}
            $duration={p.duration}
            $delay={p.delay}
            $sway={p.sway}
            $color={p.color}
            $animation={riseSway}
            $star={false}
          />
        ))}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

/* 24. Starfall Ascent - sparkle-shaped motes rise and twinkle */
const StarfallCell = ({
  day,
  percentage,
  availableCount,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const particles = getCellParticles(
    percentage,
    isMine,
    availableCount,
    isWinner,
    12
  ).map((p) => ({
    ...p,
    size: p.size + 4,
    duration: p.duration + (isWinner ? 0.2 : 0.4),
  }));
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {particles.map((p, i) => (
          <Particle
            key={i}
            $left={p.left}
            $size={p.size}
            $duration={p.duration}
            $delay={p.delay}
            $sway={p.sway}
            $color={p.color}
            $animation={rise}
            $star
          />
        ))}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

export const showcaseIdeas3: ShowcaseIdea[] = [
  {
    id: "rising-shimmer",
    title: "21. Rising Shimmer",
    description:
      "Sparkly motes drift straight up, fading in and out at varied speeds and start times. More people available means more motes; blue motes mark days you chose, and all of them turn blue if you are the only one available that day. On winning dates every purple mote turns orange and extra, faster orange motes join in.",
    Cell: RisingShimmerCell,
  },
  {
    id: "shimmer-columns",
    title: "22. Shimmer Columns",
    description:
      "Motes rise inside vertical lanes, each lane at its own speed. The number of active lanes grows with availability; your chosen days carry blue motes (all blue when you are the only one available). On winners every purple mote turns orange and a burst of faster orange motes is added.",
    Cell: ShimmerColumnsCell,
  },
  {
    id: "firefly-drift",
    title: "23. Firefly Drift",
    description:
      "Larger glowing motes sway side to side as they rise, like fireflies. Density tracks availability, blue marks your chosen days, and on winning dates every purple firefly turns orange with extra faster ones added.",
    Cell: FireflyDriftCell,
  },
  {
    id: "starfall-ascent",
    title: "24. Starfall Ascent",
    description:
      "Sparkle-shaped particles rise and twinkle, their count driven by availability. Blue sparkles mark days you chose (all blue if you are the only one available), and on winners every purple sparkle turns orange with extra faster ones added.",
    Cell: StarfallCell,
  },
  {
    id: "shimmer-columns-blink",
    title: "25. Shimmer Columns (Blink)",
    description:
      "A quieter, more relaxed take on Shimmer Columns: motes rise slowly and blink just twice along the way, with gentle fades and long dark pauses. Availability sets how many lanes light, blue marks your chosen days, and winning dates switch to Shimmer Columns' steady, faster orange motes.",
    Cell: ShimmerColumnsBlinkCell,
  },
];
