import classNames from "classnames";
import { useState } from "react";
import AvailabilityIndicator from "./AvailabilityIndicators";
import { MeetingAvailability } from "../../api/queries/getAvailabilitiesByMeetingId";
import {
  CalendarContainer,
  CellsContainer,
  ChangeMonth,
  DateCell,
  DayCell,
  Month,
  MonthContainer,
} from "./Calendar.styles";
const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ transform: direction === "right" ? "rotate(180deg)" : undefined }}
  >
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type IndicatorType =
  | "none"
  | "gradient-border"
  | "gradient-triangle"
  | "gradient-glow"
  | "gradient-glow-strong"
  | "gradient-background"
  | "dots"
  | "bars"
  | "texture"
  | "texture-squares";

type CalendarProps = {
  availabilities?: MeetingAvailability[];
  initialMonth?: number;
  isInRange?: (dateString: string) => boolean;
  onDateClick: (dateString: string) => void;
  selectedDates: string[];
  showRangeOutline?: boolean;
  theme?: IndicatorType;
  userName?: string;
  winningDates?: string[];
};

const Calendar = ({
  availabilities = [],
  initialMonth,
  isInRange = (_dateString: string) => false,
  onDateClick,
  selectedDates,
  showRangeOutline = false,
  theme = "texture",
  userName,
  winningDates = [],
}: CalendarProps) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    initialMonth ?? new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const totalGroupSize =
    availabilities.length > 0
      ? [...new Set(availabilities.map((a) => a.userName))].length
      : 0;

  const getAvailabilityPercentage = (dateString: string): number => {
    if (!availabilities || totalGroupSize === 0) return 0;

    const availabilitiesForDate = availabilities.filter(
      (a) => a.date === dateString,
    );

    if (availabilitiesForDate.length === 0) return 0;

    const uniqueUsersForDate = [
      ...new Set(availabilitiesForDate.map((a) => a.userName)),
    ];

    return Math.round((uniqueUsersForDate.length / totalGroupSize) * 100);
  };

  const hasCurrentUserAvailability = (dateString: string): boolean => {
    if (!availabilities || !userName) return false;

    return availabilities.some(
      (a) => a.date === dateString && a.userName === userName,
    );
  };

  const thisMonthFirstDateTime = new Date(currentYear, currentMonthIndex, 1);
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

  const thisMonthLastDateTime = new Date(currentYear, currentMonthIndex + 1, 0);
  const lastDateOfMonth = thisMonthLastDateTime.getDate();
  const lastDayofMonth = thisMonthLastDateTime.getDay();

  const previousMonthLastDateTime = new Date(
    currentYear,
    currentMonthIndex || 12,
    0,
  );
  const lastDateOfPreviousMonth = previousMonthLastDateTime.getDate();
  const lastDayOfPreviousMonth = previousMonthLastDateTime.getDay();

  const getDateArray = (
    firstDayOfMonth: number,
    lastDateOfMonth: number,
    lastDateOfPreviousMonth: number,
  ) => {
    const previousMonthArray = new Array(firstDayOfMonth)
      .fill(0)
      .map(
        (_, i) =>
          `${currentMonthIndex !== 0 ? currentYear : currentYear - 1}/${
            currentMonthIndex || 12
          }/${lastDateOfPreviousMonth - i}`,
      )
      .reverse();

    const thisMonthArray = new Array(lastDateOfMonth)
      .fill(0)
      .map((_, i) => `${currentYear}/${currentMonthIndex + 1}/${i + 1}`);

    const nextMonthArrayLength =
      42 - (previousMonthArray.length + thisMonthArray.length);

    const nextMonthArray = new Array(nextMonthArrayLength)
      .fill(0)
      .map(
        (_, i) =>
          `${currentMonthIndex !== 11 ? currentYear : currentYear + 1}/${
            (currentMonthIndex + 2) % 12 || 12
          }/${i + 1}`,
      );

    return [...previousMonthArray, ...thisMonthArray, ...nextMonthArray];
  };

  const handleBackMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const getHandleDateCellClick = (dateString: string) => () =>
    onDateClick(dateString);

  const dateArray = getDateArray(
    firstDayOfMonth,
    lastDateOfMonth,
    lastDateOfPreviousMonth,
  );

  const hideRangeOutline = (dateString: string) =>
    !showRangeOutline || !isInRange(dateString);

  const getSelectionBorders = (dateString: string, index: number) => {
    if (hideRangeOutline(dateString)) return {};
    const col = index % 7;
    return {
      $borderTop: index < 7 || !isInRange(dateArray[index - 7]),
      $borderBottom: index >= 35 || !isInRange(dateArray[index + 7]),
      $borderLeft: col === 0 || !isInRange(dateArray[index - 1]),
      $borderRight: col === 6 || !isInRange(dateArray[index + 1]),
    };
  };

  return (
    <CalendarContainer>
      <MonthContainer>
        <ChangeMonth
          aria-label="Previous month"
          className="left"
          onClick={handleBackMonth}
        >
          <ChevronIcon direction="left" />
        </ChangeMonth>
        <Month>{`${months[currentMonthIndex]}`}</Month>
        <ChangeMonth
          aria-label="Next month"
          className="right"
          onClick={handleNextMonth}
        >
          <ChevronIcon direction="right" />
        </ChangeMonth>
      </MonthContainer>

      <CellsContainer>
        {daysOfWeek.map((day, i) => (
          <DayCell key={i}>{day}</DayCell>
        ))}
        {dateArray.map((dateString, index) => {
          const date = new Date(dateString);
          const availabilityPercentage = getAvailabilityPercentage(dateString);
          const userHasAvailability = hasCurrentUserAvailability(dateString);
          const borders = getSelectionBorders(dateString, index);
          return (
            <DateCell
              key={dateString}
              className={classNames({
                selected: selectedDates.includes(dateString),
                "in-range":
                  !hideRangeOutline(dateString) &&
                  !selectedDates.includes(dateString),
                "out-of-month": date.getMonth() != currentMonthIndex,
                disabled: !isInRange(dateString),
                winning: winningDates.includes(dateString),
              })}
              onClick={getHandleDateCellClick(dateString)}
              {...borders}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                {date.getDate()}
              </span>
              <AvailabilityIndicator
                hasCurrentUserAvailability={userHasAvailability}
                percentage={availabilityPercentage}
                type={theme}
              />
            </DateCell>
          );
        })}
      </CellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;
