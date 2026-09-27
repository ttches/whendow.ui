/* eslint-disable react-refresh/only-export-components -- showcase registry exports idea data alongside its cell components */
import type {
  ShowcaseCellState,
  ShowcaseIdea,
} from "./ShowcaseCalendar";
import styled, { keyframes } from "styled-components";

const PURPLE = (a: number) => `rgba(170, 43, 209, ${a})`;
const TEAL = (a: number) => `rgba(20, 184, 166, ${a})`;
const GOLD = (a: number) => `rgba(245, 179, 1, ${a})`;

const litCount = (pct: number, total: number) =>
  Math.max(0, Math.min(total, Math.round((pct / 100) * total)));

const twinkle = keyframes`
  0%, 100% { opacity: 0.45; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(0.7); opacity: 0.9; }
  70% { transform: scale(1.9); opacity: 0; }
  100% { transform: scale(1.9); opacity: 0; }
`;

const fall = keyframes`
  0% { transform: translateY(-12px) rotate(45deg); opacity: 0; }
  12% { opacity: 0.95; }
  85% { opacity: 0.95; }
  100% { transform: translateY(92px) rotate(45deg); opacity: 0; }
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
  opacity: ${(p) => (p.$outOfMonth ? 0.4 : 1)};
  filter: ${(p) => (p.$outOfMonth ? "saturate(0.35) brightness(0.85)" : "none")};
  transition: opacity 0.2s ease;
  pointer-events: none;
`;

const Day = styled.span`
  position: relative;
  z-index: 5;
  font-size: 20px;
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
`;

const GoldBadge = styled.span`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  background: ${GOLD(1)};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  filter: drop-shadow(0 0 5px ${GOLD(0.9)});
  animation: ${twinkle} 1.8s ease-in-out infinite;
`;

const STAR_SLOTS = [
  { x: 16, y: 24 },
  { x: 72, y: 18 },
  { x: 44, y: 46 },
  { x: 82, y: 62 },
  { x: 26, y: 70 },
] as const;

const ConstellationSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Star = styled.span<{ $x: number; $y: number; $delay: number }>`
  position: absolute;
  left: ${(p) => p.$x}%;
  top: ${(p) => p.$y}%;
  width: 7px;
  height: 7px;
  margin: -3px 0 0 -3px;
  background: ${PURPLE(1)};
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  box-shadow: 0 0 6px ${PURPLE(0.85)};
  animation: ${twinkle} 2.4s ease-in-out infinite;
  animation-delay: ${(p) => p.$delay}s;
`;

const Orbit = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 42px;
  height: 42px;
  margin: -21px 0 0 -21px;
  border: 2px dashed ${TEAL(0.95)};
  border-radius: 50%;
  animation: ${spin} 9s linear infinite;
`;

const ConstellationCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const stars = litCount(percentage, STAR_SLOTS.length);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {stars > 1 && (
          <ConstellationSvg viewBox="0 0 100 84" preserveAspectRatio="none">
            <polyline
              points={STAR_SLOTS.slice(0, stars)
                .map((s) => `${s.x},${s.y}`)
                .join(" ")}
              fill="none"
              stroke={PURPLE(0.5)}
              strokeWidth={0.7}
              strokeDasharray="2 2"
            />
          </ConstellationSvg>
        )}
        {STAR_SLOTS.slice(0, stars).map((s, i) => (
          <Star key={i} $x={s.x} $y={s.y} $delay={i * 0.28} />
        ))}
        {isMine && <Orbit />}
        {isWinner && <GoldBadge />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const PADS = [
  { x: 18, y: 62 },
  { x: 40, y: 42 },
  { x: 63, y: 58 },
  { x: 84, y: 34 },
  { x: 32, y: 20 },
  { x: 70, y: 74 },
] as const;

const CircuitSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const PulseNode = styled.span`
  position: absolute;
  left: 15%;
  top: 78%;
  width: 12px;
  height: 12px;
  margin: -6px 0 0 -6px;
  border-radius: 50%;
  background: ${TEAL(0.95)};
  box-shadow: 0 0 8px ${TEAL(0.9)};
  &::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    border: 2px solid ${TEAL(0.8)};
    animation: ${pulse} 1.8s ease-out infinite;
  }
`;

const GoldLed = styled.span`
  position: absolute;
  right: 6px;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${GOLD(1)};
  box-shadow: 0 0 6px ${GOLD(1)}, 0 0 14px ${GOLD(0.7)};
  animation: ${twinkle} 1.2s ease-in-out infinite;
`;

const CircuitCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const lit = litCount(percentage, PADS.length);
  const spine = PADS.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <CircuitSvg viewBox="0 0 100 84" preserveAspectRatio="none">
          <polyline points={spine} fill="none" stroke={PURPLE(0.35)} strokeWidth={0.8} />
          <polyline
            points={`${PADS[0].x},${PADS[0].y} ${PADS[4].x},${PADS[4].y}`}
            fill="none"
            stroke={PURPLE(0.3)}
            strokeWidth={0.8}
          />
          <polyline
            points={`${PADS[1].x},${PADS[1].y} ${PADS[3].x},${PADS[3].y}`}
            fill="none"
            stroke={PURPLE(0.3)}
            strokeWidth={0.8}
          />
          {PADS.map((p, i) => (
            <rect
              key={i}
              x={p.x - 3}
              y={p.y - 3}
              width={6}
              height={6}
              rx={1}
              fill={i < lit ? PURPLE(0.95) : PURPLE(0.12)}
              stroke={PURPLE(i < lit ? 1 : 0.4)}
              strokeWidth={0.6}
            />
          ))}
        </CircuitSvg>
        {isMine && <PulseNode />}
        {isWinner && <GoldLed />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const TopoSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const Pin = styled.span`
  position: absolute;
  left: 50%;
  top: 66%;
  width: 12px;
  height: 12px;
  margin: -12px 0 0 -6px;
  background: ${TEAL(0.95)};
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  box-shadow: 0 0 8px ${TEAL(0.8)};
`;

const Flag = styled.span`
  position: absolute;
  left: 72%;
  top: 8%;
  width: 2px;
  height: 22px;
  background: ${GOLD(0.95)};
  box-shadow: 0 0 6px ${GOLD(0.7)};
  &::after {
    content: "";
    position: absolute;
    left: 2px;
    top: 0;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 11px solid ${GOLD(0.95)};
  }
`;

const TopographicCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const rings = litCount(percentage, 5);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <TopoSvg viewBox="0 0 100 84" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse
              key={i}
              cx={50}
              cy={42}
              rx={14 + i * 9}
              ry={9 + i * 6}
              fill="none"
              stroke={i < rings ? PURPLE(0.9) : PURPLE(0.16)}
              strokeWidth={i < rings ? 1 : 0.6}
            />
          ))}
        </TopoSvg>
        {isMine && <Pin />}
        {isWinner && <Flag />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const IsoStack = styled.div`
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const IsoBlock = styled.div<{ $teal?: boolean }>`
  width: 30px;
  height: 15px;
  margin-top: -6px;
  background: ${(p) => (p.$teal ? TEAL(0.95) : PURPLE(0.85))};
  clip-path: polygon(50% 0, 100% 28%, 100% 72%, 50% 100%, 0 72%, 0 28%);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.45));
`;

const Crown = styled.span`
  width: 22px;
  height: 12px;
  margin-bottom: 3px;
  background: ${GOLD(1)};
  clip-path: polygon(0 100%, 0 20%, 22% 55%, 50% 0, 78% 55%, 100% 20%, 100% 100%);
  filter: drop-shadow(0 0 5px ${GOLD(0.9)});
`;

const IsometricCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const blocks = litCount(percentage, 5);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <IsoStack>
          {isMine && <IsoBlock $teal />}
          {Array.from({ length: blocks }).map((_, i) => (
            <IsoBlock key={i} />
          ))}
          {isWinner && <Crown />}
        </IsoStack>
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const SparkSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const SparkCell = ({
  dateString,
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const uid = dateString.replace(/[^a-z0-9]/gi, "");
  const amp = percentage / 100;
  const xs = [0, 16, 32, 48, 64, 80, 100];
  const points = xs.map((x, i) => {
    const wave = Math.sin((i + day) * 1.1) * 0.5 + 0.5;
    const y = 66 - wave * 34 * amp;
    return { x, y };
  });
  const line = points.map((p) => `${p.x},${p.y.toFixed(1)}`).join(" ");
  const area = `0,84 ${line} 100,84`;
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <SparkSvg viewBox="0 0 100 84" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`spark-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PURPLE(0.7)} />
              <stop offset="100%" stopColor={PURPLE(0.05)} />
            </linearGradient>
          </defs>
          <polygon points={area} fill={`url(#spark-${uid})`} />
          <polyline points={line} fill="none" stroke={PURPLE(0.95)} strokeWidth={1.4} />
          {isWinner && <rect x={70} y={0} width={3} height={84} fill={GOLD(0.9)} />}
          {isMine && (
            <>
              <circle cx={50} cy={points[3].y} r={6} fill="none" stroke={TEAL(0.6)} strokeWidth={1} />
              <circle cx={50} cy={points[3].y} r={3.4} fill={TEAL(1)} />
            </>
          )}
        </SparkSvg>
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const HatchSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const TealStamp = styled.span`
  position: absolute;
  left: 5px;
  bottom: 6px;
  width: 18px;
  height: 13px;
  background: ${TEAL(0.25)};
  border: 1.5px solid ${TEAL(0.95)};
  border-radius: 2px;
  transform: rotate(-8deg);
  box-shadow: 0 0 6px ${TEAL(0.6)};
  &::after {
    content: "";
    position: absolute;
    inset: 2px;
    border: 1px dashed ${TEAL(0.7)};
  }
`;

const CrosshatchCell = ({
  dateString,
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const uid = dateString.replace(/[^a-z0-9]/gi, "");
  const tile = 14 - (percentage / 100) * 9;
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <HatchSvg viewBox="0 0 100 84" preserveAspectRatio="none">
          <defs>
            <pattern
              id={`hatch-${uid}`}
              width={tile}
              height={tile}
              patternUnits="userSpaceOnUse"
            >
              <path d={`M0 0 L${tile} ${tile}`} stroke={PURPLE(0.85)} strokeWidth={0.9} />
              <path d={`M${tile} 0 L0 ${tile}`} stroke={PURPLE(0.85)} strokeWidth={0.9} />
            </pattern>
          </defs>
          <rect x={0} y={0} width={100} height={84} fill={`url(#hatch-${uid})`} />
        </HatchSvg>
        {isMine && <TealStamp />}
        {isWinner && <GoldBadge />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const WAVE_BARS = [0.3, 0.7, 0.45, 1, 0.55, 0.85, 0.4, 0.65, 0.25] as const;

const WaveSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const WaveCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const amp = percentage / 100;
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <WaveSvg viewBox="0 0 100 84" preserveAspectRatio="none">
          {WAVE_BARS.map((h, i) => {
            const x = 12 + i * 9.5;
            const half = h * 26 * amp + 1;
            return (
              <line
                key={i}
                x1={x}
                y1={42 - half}
                x2={x}
                y2={42 + half}
                stroke={PURPLE(0.9)}
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}
          {isMine && (
            <line
              x1={18}
              y1={6}
              x2={18}
              y2={78}
              stroke={TEAL(0.95)}
              strokeWidth={1.6}
              strokeDasharray="3 3"
            />
          )}
          {isWinner && (
            <>
              <line x1={82} y1={6} x2={82} y2={78} stroke={GOLD(0.95)} strokeWidth={1.6} />
              <circle cx={82} cy={6} r={3.5} fill={GOLD(1)} />
            </>
          )}
        </WaveSvg>
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const TallyRow = styled.div`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const TallyGroup = styled.div`
  position: relative;
  display: flex;
  gap: 4px;
`;

const Tally = styled.span`
  width: 2px;
  height: 20px;
  background: ${PURPLE(0.95)};
  box-shadow: 0 0 3px ${PURPLE(0.7)};
`;

const TallySlash = styled.span`
  position: absolute;
  left: -2px;
  bottom: 4px;
  width: 26px;
  height: 2px;
  background: ${PURPLE(0.95)};
  transform: rotate(-24deg);
  transform-origin: left center;
`;

const TallyFrame = styled.span`
  position: absolute;
  left: 50%;
  bottom: 4px;
  transform: translateX(-50%);
  width: 76px;
  height: 30px;
  border: 1.5px solid ${TEAL(0.9)};
  border-radius: 4px;
  box-shadow: 0 0 6px ${TEAL(0.5)};
`;

const TallyCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const count = litCount(percentage, 10);
  const groups = Math.floor(count / 5);
  const rem = count % 5;
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        <TallyRow>
          {Array.from({ length: groups }).map((_, g) => (
            <TallyGroup key={g}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Tally key={i} />
              ))}
              <TallySlash />
            </TallyGroup>
          ))}
          {Array.from({ length: rem }).map((_, i) => (
            <Tally key={`r${i}`} />
          ))}
        </TallyRow>
        {isMine && <TallyFrame />}
        {isWinner && <GoldBadge />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const RAIN_X = [12, 26, 40, 54, 68, 82, 34] as const;

const Drop = styled.span<{ $x: number; $delay: number }>`
  position: absolute;
  left: ${(p) => p.$x}%;
  top: -10px;
  width: 4px;
  height: 8px;
  background: ${PURPLE(0.9)};
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: ${fall} 1.8s linear infinite;
  animation-delay: ${(p) => p.$delay}s;
  box-shadow: 0 0 4px ${PURPLE(0.6)};
`;

const Umbrella = styled.span`
  position: absolute;
  left: 50%;
  bottom: 12px;
  width: 26px;
  height: 13px;
  margin-left: -13px;
  background: ${TEAL(0.95)};
  border-radius: 50% 50% 0 0;
  box-shadow: 0 0 6px ${TEAL(0.6)};
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 13px;
    width: 2px;
    height: 9px;
    margin-left: -1px;
    background: ${TEAL(0.95)};
  }
`;

const Sun = styled.span`
  position: absolute;
  right: 7px;
  top: 7px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${GOLD(1)};
  box-shadow: 0 0 8px ${GOLD(0.9)}, 0 0 16px ${GOLD(0.5)};
  &::before {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    border: 1.5px dashed ${GOLD(0.8)};
    animation: ${spin} 6s linear infinite;
  }
`;

const WeatherCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const drops = litCount(percentage, RAIN_X.length);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {RAIN_X.slice(0, drops).map((x, i) => (
          <Drop key={i} $x={x} $delay={i * 0.22} />
        ))}
        {isMine && <Umbrella />}
        {isWinner && <Sun />}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

const SHARDS = [
  "polygon(0 0, 36 0, 32 48, 0 44)",
  "polygon(36 0, 68 0, 66 50, 32 48)",
  "polygon(68 0, 100 0, 100 46, 66 50)",
  "polygon(0 44, 32 48, 36 100, 0 100)",
  "polygon(32 48, 66 50, 70 100, 36 100)",
  "polygon(66 50, 100 46, 100 100, 70 100)",
] as const;

const Shard = styled.span<{ $poly: string; $kind: "lit" | "dim" | "mine" | "win" }>`
  position: absolute;
  inset: 0;
  clip-path: ${(p) => p.$poly};
  background: ${(p) =>
    p.$kind === "mine"
      ? TEAL(0.85)
      : p.$kind === "win"
        ? GOLD(0.9)
        : p.$kind === "lit"
          ? PURPLE(0.75)
          : PURPLE(0.1)};
  box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.35);
`;

const StainedGlassCell = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}: ShowcaseCellState) => {
  const lit = litCount(percentage, SHARDS.length);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <Scene $outOfMonth={outOfMonth}>
        {SHARDS.map((poly, i) => {
          const kind =
            i === 0 && isMine ? "mine" : i === 3 && isWinner ? "win" : i < lit ? "lit" : "dim";
          return <Shard key={i} $poly={poly} $kind={kind} />;
        })}
      </Scene>
      <Day>{day}</Day>
    </Shell>
  );
};

export const showcaseIdeas2: ShowcaseIdea[] = [
  {
    id: "constellation",
    title: "11. Constellation Map",
    description:
      "Purple stars and dotted sight-lines count out availability, a teal orbit ring marks your pick, and a gold sparkle flags the winning date.",
    Cell: ConstellationCell,
  },
  {
    id: "blueprint-circuit",
    title: "12. Blueprint Circuit",
    description:
      "A schematic trace network lights purple solder pads in proportion to availability, with a pulsing teal node for your selection and a gold LED for the winner.",
    Cell: CircuitCell,
  },
  {
    id: "topographic-summit",
    title: "13. Topographic Summit",
    description:
      "Stacked purple contour rings reveal the availability elevation, a teal map pin marks your day, and a gold summit flag marks the winner.",
    Cell: TopographicCell,
  },
  {
    id: "isometric-stack",
    title: "14. Isometric Block Stack",
    description:
      "A 3D pile of purple isometric blocks grows with availability, a teal block grounds your selection, and a gold crown caps the winning day.",
    Cell: IsometricCell,
  },
  {
    id: "sparkline-area",
    title: "15. Sparkline Area Chart",
    description:
      "A purple filled sparkline rises with availability, a teal plotted point marks your selection, and a gold vertical rule marks the winner.",
    Cell: SparkCell,
  },
  {
    id: "crosshatch-etching",
    title: "16. Crosshatch Etching",
    description:
      "Engraved purple crosshatching thickens as availability rises, a teal postage stamp marks your selection, and a gold star seal marks the winner.",
    Cell: CrosshatchCell,
  },
  {
    id: "sound-waveform",
    title: "17. Sound Waveform",
    description:
      "A symmetric purple audio waveform swells with availability, a teal dashed needle marks your selection, and a gold needle-and-dot marks the winner.",
    Cell: WaveCell,
  },
  {
    id: "tally-marks",
    title: "18. Tally Marks",
    description:
      "Hand-drawn purple tally strokes and five-bar slashes count availability, a teal box frames your selection, and a gold star badge marks the winner.",
    Cell: TallyCell,
  },
  {
    id: "rain-gauge",
    title: "19. Rain Gauge",
    description:
      "Animated purple raindrops fall in proportion to availability, a teal umbrella shelters your selection, and a spinning gold sun marks the winner.",
    Cell: WeatherCell,
  },
  {
    id: "stained-glass",
    title: "20. Stained-Glass Mosaic",
    description:
      "Purple mosaic shards light up with availability, a teal shard marks your selection, and a gold shard marks the winning date.",
    Cell: StainedGlassCell,
  },
];
