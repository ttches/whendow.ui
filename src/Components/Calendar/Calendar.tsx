import classNames from "classnames";
import { useState } from "react";
import styled from "styled-components";
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
  max-width: 550px;
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

  &.out-of-bounds {
    background-color: #481154;
  }

  &.selected {
    background-color: #aa2bd1;
    &:hover {
      background-color: #0d7b7b;
    }
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
  height: 40px;
  justify-content: center;
  width: calc(100% / 7);
`;

const Month = styled.h3`
  color: #551665;
  font-family: "copasetic";
  font-size: 36px;
  margin: 0px;
  width: 140px;
  user-select: none;
`;

const ChangeMonth = styled.h3`
  cursor: pointer;
  color: #551665;
  font-family: "copasetic";
  font-size: 36px;
  margin: 0px;
  user-select: none;
  &:hover {
    color: #20a2a2;
  }
`;

const MonthContainer = styled.div`
  background-color: #d8b9ff;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

type CalendarProps = {
  initialMonth?: number;
  onDateClick: (dateString: string) => void;
  selectedDates: string[];
};

const Calendar = ({
  initialMonth,
  onDateClick,
  selectedDates,
}: CalendarProps) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    initialMonth || new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  console.log(dateArray.join("\n"));
  console.log("current month", currentMonthIndex);

  return (
    <CalendarContainer>
      <MonthContainer>
        <ChangeMonth onClick={handleBackMonth}>{"-"}</ChangeMonth>
        <Month>{`${months[currentMonthIndex]}`}</Month>
        <ChangeMonth onClick={handleNextMonth}>{"-"}</ChangeMonth>
      </MonthContainer>

      <CellsContainer>
        {daysOfWeek.map((day, i) => (
          <DayCell key={i}>{day}</DayCell>
        ))}
        {dateArray.map((dateString) => {
          const date = new Date(dateString);
          return (
            <DateCell
              key={dateString}
              className={classNames({
                selected: selectedDates.includes(dateString),
                "out-of-bounds": date.getMonth() != currentMonthIndex,
              })}
              onClick={getHandleDateCellClick(dateString)}
            >
              {date.getDate()}
            </DateCell>
          );
        })}
      </CellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;
