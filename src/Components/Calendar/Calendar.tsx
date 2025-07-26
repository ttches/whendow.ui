import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
import AvailabilityIndicator from "./AvailabilityIndicators";
import { MeetingAvailability } from "../../api/queries/getAvailabilitiesByMeetingId";
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

const CalendarContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
`;

const CellsContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const DateCell = styled.div`
  align-items: center;
  background-color: #551665;
  border: 1px solid #601972;
  cursor: pointer;
  display: flex;
  font-weight: 900;
  font-family: "copasetic";
  height: 80px;
  justify-content: center;
  width: calc(100% / 7);
  position: relative;

  &.out-of-month {
    background-color: #481154;
  }

  &.selected {
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 4px solid #aa2bd1;
      border-radius: 6px;
      margin: 2px;
    }
    background-color: #aa2bd1;
    &:hover {
      background-color: #0d7b7b;
    }
  }

  &.is-in-range {
    background-color: #601972;

    /* border-bottom: 4px solid #20a2a254; */
    /* border-bottom: 4px solid #aa2bd136; */
  }

  &.disabled {
    background-color: #4e3654;
    border: 1px solid #4e3654;
    color: #a8a8a8;
  }

  &:hover {
    background-color: #20a2a2;
  }
`;

const DayCell = styled.div`
  align-items: center;
  background-color: #d8b9ff;
  color: #4b015e;
  cursor: default;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  width: calc(100% / 7);
`;

const Month = styled.h3`
  color: #551665;
  font-family: "copasetic";
  font-size: 24px;
  margin: 0px;
  width: 140px;
  user-select: none;
`;

const ChangeMonth = styled.h3`
  cursor: pointer;
  color: #551665;
  font-family: "simplifica";
  font-size: 36px;
  margin: 0px;
  user-select: none;
  &:hover {
    color: #20a2a2;
  }
`;

const MonthContainer = styled.div`
  align-items: center;
  background-color: #d8b9ff;
  display: flex;
  height: 42px;
  justify-content: space-around;
  width: 100%;
`;

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
  initialMonth?: number;
  isInRange?: (dateString: string) => boolean;
  onDateClick: (dateString: string) => void;
  selectedDates: string[];
  indicatorType?: IndicatorType;
  availabilities?: MeetingAvailability[];
};

const Calendar = ({
  initialMonth,
  isInRange = (_dateString: string) => false,
  onDateClick,
  selectedDates,
  indicatorType = "texture",
  availabilities = [],
}: CalendarProps) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    initialMonth || new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const totalGroupSize =
    availabilities.length > 0
      ? [...new Set(availabilities.map((a) => a.userName))].length
      : 0;

  const getAvailabilityPercentage = (dateString: string): number => {
    if (!availabilities || totalGroupSize === 0) return 0;

    const availabilitiesForDate = availabilities.filter(
      (a) => a.date === dateString
    );

    if (availabilitiesForDate.length === 0) return 0;

    const uniqueUsersForDate = [
      ...new Set(availabilitiesForDate.map((a) => a.userName)),
    ];

    return Math.round((uniqueUsersForDate.length / totalGroupSize) * 100);
  };

  const thisMonthFirstDateTime = new Date(currentYear, currentMonthIndex, 1);
  const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1).getDay();

  const thisMonthLastDateTime = new Date(currentYear, currentMonthIndex + 1, 0);
  const lastDateOfMonth = thisMonthLastDateTime.getDate();
  const lastDayofMonth = thisMonthLastDateTime.getDay();

  const previousMonthLastDateTime = new Date(
    currentYear,
    currentMonthIndex || 12,
    0
  );
  const lastDateOfPreviousMonth = previousMonthLastDateTime.getDate();
  const lastDayOfPreviousMonth = previousMonthLastDateTime.getDay();

  const getDateArray = (
    firstDayOfMonth: number,
    lastDateOfMonth: number,
    lastDateOfPreviousMonth: number
  ) => {
    const previousMonthArray = new Array(firstDayOfMonth)
      .fill(0)
      .map(
        (_, i) =>
          `${currentMonthIndex !== 0 ? currentYear : currentYear - 1}/${
            currentMonthIndex || 12
          }/${lastDateOfPreviousMonth - i}`
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
          }/${i + 1}`
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
    lastDateOfPreviousMonth
  );

  return (
    <CalendarContainer>
      <MonthContainer>
        <ChangeMonth onClick={handleBackMonth}>{"<"}</ChangeMonth>
        <Month>{`${months[currentMonthIndex]}`}</Month>
        <ChangeMonth onClick={handleNextMonth}>{">"}</ChangeMonth>
      </MonthContainer>

      <CellsContainer>
        {daysOfWeek.map((day, i) => (
          <DayCell key={i}>{day}</DayCell>
        ))}
        {dateArray.map((dateString) => {
          const date = new Date(dateString);
          const availabilityPercentage = getAvailabilityPercentage(dateString);
          return (
            <DateCell
              key={dateString}
              className={classNames({
                selected: selectedDates.includes(dateString),
                "out-of-month": date.getMonth() != currentMonthIndex,
                // "is-in-range": isInRange(dateString),
                disabled: !isInRange(dateString),
              })}
              onClick={getHandleDateCellClick(dateString)}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                {date.getDate()}
              </span>
              <AvailabilityIndicator
                type={indicatorType}
                percentage={availabilityPercentage}
              />
            </DateCell>
          );
        })}
      </CellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;
