/* eslint-disable react-refresh/only-export-components -- showcase registry exports idea data alongside its cell components */
import styled from "styled-components";
import { ShowcaseCellComponent, ShowcaseIdea } from "./ShowcaseCalendar";

const PURPLE = "170, 43, 209";
const TEAL = "20, 184, 166";
const GOLD = "245, 179, 1";

const Shell = styled.div<{ $outOfMonth: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 7);
  height: 84px;
  overflow: hidden;
  background-color: ${({ $outOfMonth }) =>
    $outOfMonth ? "#481154" : "#551665"};
  border: 1px solid #601972;
  font-family: "copasetic";
  font-weight: 900;
  color: #f3e6f7;
  cursor: default;
  opacity: ${({ $outOfMonth }) => ($outOfMonth ? 0.55 : 1)};
`;

const DayNumber = styled.span<{ $winner?: boolean }>`
  position: relative;
  z-index: 3;
  color: ${({ $winner }) => ($winner ? "#ffe08a" : "#f3e6f7")};
  text-shadow: ${({ $winner }) =>
    $winner ? `0 0 10px rgba(${GOLD}, 0.95)` : "none"};
`;

const MineBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background: rgba(${TEAL}, 0.95);
  z-index: 2;
`;

const WinnerBorder = styled.div`
  position: absolute;
  inset: 0;
  border: 2px solid rgba(${GOLD}, 0.95);
  box-shadow: inset 0 0 14px rgba(${GOLD}, 0.35);
  pointer-events: none;
  z-index: 4;
`;

const WinnerStar = styled.div`
  position: absolute;
  top: 0;
  left: 4px;
  font-size: 13px;
  line-height: 1.1;
  color: #ffe08a;
  text-shadow: 0 0 8px rgba(${GOLD}, 0.95);
  z-index: 5;
`;

const Accents = ({
  isMine,
  isWinner,
}: {
  isMine: boolean;
  isWinner: boolean;
}) => (
  <>
    {isMine && <MineBar />}
    {isWinner && (
      <>
        <WinnerBorder />
        <WinnerStar>★</WinnerStar>
      </>
    )}
  </>
);

/* 1. Donut Ring - percentage as a conic arc in the corner */
const Ring = styled.div<{ $pct: number }>`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: conic-gradient(
    rgba(${PURPLE}, 0.95) 0 ${({ $pct }) => $pct * 3.6}deg,
    rgba(255, 255, 255, 0.15) ${({ $pct }) => $pct * 3.6}deg 360deg
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 5px),
    #000 calc(100% - 4px)
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 5px),
    #000 calc(100% - 4px)
  );
  z-index: 2;
`;

const DonutRingCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <Ring $pct={percentage} />
    <Accents isMine={isMine} isWinner={isWinner} />
  </Shell>
);

/* 2. Liquid Fill - cell fills from the bottom by percentage */
const Liquid = styled.div<{ $pct: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${({ $pct }) => $pct}%;
  background: linear-gradient(
    to top,
    rgba(${PURPLE}, 0.8),
    rgba(${PURPLE}, 0.3)
  );
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(${PURPLE}, 0.95);
  }
`;

const LiquidFillCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <Liquid $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <Accents isMine={isMine} isWinner={isWinner} />
  </Shell>
);

/* 3. Segmented Meter - five segments light up by percentage */
const Segments = styled.div`
  position: absolute;
  bottom: 7px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
  align-items: flex-end;
  z-index: 2;
`;

const Segment = styled.div<{ $on: boolean }>`
  width: 4px;
  height: 14px;
  border-radius: 1px;
  background: ${({ $on }) =>
    $on ? `rgba(${PURPLE}, 0.95)` : "rgba(255, 255, 255, 0.12)"};
`;

const SegmentedMeterCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <Segments>
      {Array.from({ length: 5 }, (_, i) => (
        <Segment key={i} $on={percentage >= (i + 1) * 20} />
      ))}
    </Segments>
    <Accents isMine={isMine} isWinner={isWinner} />
  </Shell>
);

/* 4. Underline Gauge - progress bar beneath the date number */
const GaugeTrack = styled.div`
  position: absolute;
  bottom: 13px;
  left: 16%;
  width: 68%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  z-index: 2;
`;

const GaugeFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: 2px;
  background: rgba(${PURPLE}, 0.95);
`;

const NumberRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(${TEAL}, 0.95);
  z-index: 2;
`;

const UnderlineGaugeCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    {isMine && <NumberRing />}
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <GaugeTrack>
      <GaugeFill $pct={percentage} />
    </GaugeTrack>
    {isWinner && (
      <>
        <WinnerBorder />
        <WinnerStar>★</WinnerStar>
      </>
    )}
  </Shell>
);

/* 5. Dot Matrix - a 5x2 grid of dots fills by percentage */
const Matrix = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(5, 4px);
  gap: 2px;
  z-index: 2;
`;

const MatrixDot = styled.div<{ $on: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${({ $on }) =>
    $on ? `rgba(${PURPLE}, 0.95)` : "rgba(255, 255, 255, 0.12)"};
`;

const DotMatrixCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => {
  const lit = Math.round((percentage / 100) * 10);
  return (
    <Shell $outOfMonth={outOfMonth}>
      <DayNumber $winner={isWinner}>{day}</DayNumber>
      <Matrix>
        {Array.from({ length: 10 }, (_, i) => (
          <MatrixDot key={i} $on={i < lit} />
        ))}
      </Matrix>
      <Accents isMine={isMine} isWinner={isWinner} />
    </Shell>
  );
};

/* 6. Layered Borders - percentage on the left edge, mine bottom, winner outline */
const PctEdge = styled.div<{ $pct: number }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ $pct }) => 2 + ($pct / 100) * 8}px;
  background: rgba(
    ${PURPLE},
    ${({ $pct }) => 0.35 + ($pct / 100) * 0.65}
  );
  z-index: 2;
`;

const LayeredBordersCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <PctEdge $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    {isMine && <MineBar />}
    {isWinner && (
      <>
        <WinnerBorder />
        <WinnerStar>★</WinnerStar>
      </>
    )}
  </Shell>
);

/* 7. Radial Spotlight - a purple glow grows with percentage */
const Spotlight = styled.div<{ $pct: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ $pct }) => 10 + ($pct / 100) * 80}px;
  height: ${({ $pct }) => 10 + ($pct / 100) * 80}px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(${PURPLE}, 0.8),
    rgba(${PURPLE}, 0) 70%
  );
  z-index: 1;
`;

const RadialSpotlightCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <Spotlight $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <Accents isMine={isMine} isWinner={isWinner} />
  </Shell>
);

/* 8. Corner Ribbon - gold ribbon for the winner, hatch density for percentage */
const Hatch = styled.div<{ $pct: number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 62%;
  height: 62%;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(${PURPLE}, 0.85) 0 2px,
    transparent 2px ${({ $pct }) => 7 - ($pct / 100) * 4}px
  );
  z-index: 1;
`;

const Ribbon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 30px solid rgba(${GOLD}, 0.92);
  border-left: 30px solid transparent;
  z-index: 4;
`;

const RibbonStar = styled.div`
  position: absolute;
  top: 2px;
  right: 3px;
  font-size: 11px;
  line-height: 1;
  color: #551665;
  z-index: 5;
`;

const CornerRibbonCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <Hatch $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    {isMine && <MineBar />}
    {isWinner && (
      <>
        <Ribbon />
        <RibbonStar>★</RibbonStar>
      </>
    )}
  </Shell>
);

/* 9. Heatmap Tint - the whole cell tints by percentage */
const Tint = styled.div<{ $pct: number }>`
  position: absolute;
  inset: 0;
  background: rgba(${PURPLE}, ${({ $pct }) => 0.08 + ($pct / 100) * 0.5});
  z-index: 1;
`;

const MineInsetRing = styled.div`
  position: absolute;
  inset: 3px;
  border: 2px solid rgba(${TEAL}, 0.9);
  border-radius: 5px;
  z-index: 2;
`;

const HeatmapTintCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <Tint $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    {isMine && <MineInsetRing />}
    {isWinner && (
      <>
        <WinnerBorder />
        <WinnerStar>★</WinnerStar>
      </>
    )}
  </Shell>
);

/* 10. Progress Arc - a conic arc wraps the date number */
const Arc = styled.div<{ $pct: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: conic-gradient(
    rgba(${PURPLE}, 0.95) 0 ${({ $pct }) => $pct * 3.6}deg,
    rgba(255, 255, 255, 0.12) ${({ $pct }) => $pct * 3.6}deg 360deg
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 4px),
    #000 calc(100% - 3px)
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 4px),
    #000 calc(100% - 3px)
  );
  z-index: 2;
`;

const ProgressArcCell: ShowcaseCellComponent = ({
  day,
  percentage,
  isMine,
  isWinner,
  outOfMonth,
}) => (
  <Shell $outOfMonth={outOfMonth}>
    <Arc $pct={percentage} />
    <DayNumber $winner={isWinner}>{day}</DayNumber>
    <Accents isMine={isMine} isWinner={isWinner} />
  </Shell>
);

export const showcaseIdeas: ShowcaseIdea[] = [
  {
    id: "donut-ring",
    title: "1. Donut Ring",
    description:
      "Percentage reads as a small conic arc in the top-right corner. Teal bar marks your own days; a gold star and outline mark winning dates.",
    Cell: DonutRingCell,
  },
  {
    id: "liquid-fill",
    title: "2. Liquid Fill",
    description:
      "The cell fills from the bottom up to the availability percentage, like a gauge. Teal baseline for your days, gold cap and star for winners.",
    Cell: LiquidFillCell,
  },
  {
    id: "segmented-meter",
    title: "3. Segmented Meter",
    description:
      "Five segments light up in steps of 20% so a glance gives a rough availability band. Teal bar for your days, gold star for winners.",
    Cell: SegmentedMeterCell,
  },
  {
    id: "underline-gauge",
    title: "4. Underline Gauge",
    description:
      "A progress underline sits beneath the date number. Your days get a teal ring around the number; winners get a glowing gold number and star.",
    Cell: UnderlineGaugeCell,
  },
  {
    id: "dot-matrix",
    title: "5. Dot Matrix",
    description:
      "A 5x2 dot grid fills proportionally to the percentage. Teal bar marks your days and a gold star plus outline marks winners.",
    Cell: DotMatrixCell,
  },
  {
    id: "layered-borders",
    title: "6. Layered Borders",
    description:
      "Each state owns an edge: the left border grows with percentage, a teal bottom border marks your days, and a gold outline marks winners.",
    Cell: LayeredBordersCell,
  },
  {
    id: "radial-spotlight",
    title: "7. Radial Spotlight",
    description:
      "A purple spotlight in the middle expands and brightens with availability. Teal bar for your days, gold star and outline for winners.",
    Cell: RadialSpotlightCell,
  },
  {
    id: "corner-ribbon",
    title: "8. Corner Ribbon",
    description:
      "Diagonal hatch density encodes percentage; winning dates get a gold corner ribbon and star, while your days keep the teal baseline.",
    Cell: CornerRibbonCell,
  },
  {
    id: "heatmap-tint",
    title: "9. Heatmap Tint",
    description:
      "The whole cell tints deeper purple as more people are available. A teal inset ring marks your days and gold marks the winners.",
    Cell: HeatmapTintCell,
  },
  {
    id: "progress-arc",
    title: "10. Progress Arc",
    description:
      "A conic arc wraps the date number and fills with the percentage. Teal bar for your days, gold star and outline for winning dates.",
    Cell: ProgressArcCell,
  },
];
