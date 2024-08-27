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
  overflow: hidden;
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const thisMonthFirstDateTime = new Date(currentYear, currentMonth, 1);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const thisMonthLastDateTime = new Date(currentYear, currentMonth + 1, 0);
  const lastDateOfMonth = thisMonthLastDateTime.getDate();
  const lastDayofMonth = thisMonthLastDateTime.getDay();

  const previousMonthLastDateTime = new Date(currentYear, currentMonth, 0);
  const lastDateOfPreviousMonth = previousMonthLastDateTime.getDate();
  const lastDayOfPreviousMonth = previousMonthLastDateTime.getDay();

  const createCellData = ({
    date,
    month,
    year,
  }: {
    date: number;
    month: number;
    year: number;
  }) => {
    return {
      date: date,
      month: month,
      year: year,
    };
  };

  const getDateArray = (
    firstDayOfMonth: number,
    lastDateOfMonth: number,
    lastDateOfPreviousMonth: number
  ) => {
    const previousMonthArray = new Array(firstDayOfMonth)
      .fill(0)
      .map((_, i) =>
        createCellData({
          date: lastDateOfPreviousMonth - i,
          month: currentMonth - 1,
          year: currentYear,
        })
      )
      .reverse();

    const thisMonthArray = new Array(lastDateOfMonth).fill(0).map((_, i) =>
      createCellData({
        date: i + 1,
        month: currentMonth,
        year: currentYear,
      })
    );

    const nextMonthArrayLength =
      42 - (previousMonthArray.length + thisMonthArray.length);

    const nextMonthArray = new Array(nextMonthArrayLength).fill(0).map((_, i) =>
      createCellData({
        date: i + 1,
        month: currentMonth + 1,
        year: currentYear,
      })
    );

    return [...previousMonthArray, ...thisMonthArray, ...nextMonthArray];
  };

  const handleBackMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const dateArray = getDateArray(
    firstDayOfMonth,
    lastDateOfMonth,
    lastDateOfPreviousMonth
  );

  return (
    <CalendarContainer>
      <MonthContainer>
        <ChangeMonth onClick={handleBackMonth}>{"-"}</ChangeMonth>
        <Month>{`${months[currentMonth]}`}</Month>
        <ChangeMonth onClick={handleNextMonth}>{"-"}</ChangeMonth>
      </MonthContainer>

      <CellsContainer>
        {daysOfWeek.map((day) => (
          <DayCell key={day}>{day}</DayCell>
        ))}
        {dateArray.map((date) => (
          <DateCell
            key={`${date?.year}-${date?.month}-${date?.date}`}
            className={classNames({
              "out-of-bounds": date?.month !== currentMonth,
            })}
          >
            {date?.date}
          </DateCell>
        ))}
      </CellsContainer>
    </CalendarContainer>
  );
};

export default Calendar;
