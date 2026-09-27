import type { ComponentType } from "react";
import styled from "styled-components";
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

export type ShowcaseCellState = {
  dateString: string;
  day: number;
  percentage: number;
  availableCount: number;
  isMine: boolean;
  isWinner: boolean;
  outOfMonth: boolean;
};

export type ShowcaseCellComponent = ComponentType<ShowcaseCellState>;

export type ShowcaseIdea = {
  id: string;
  title: string;
  description: string;
  Cell: ShowcaseCellComponent;
};

const CalendarFrame = styled.div`
  border-radius: 10px;
  overflow: hidden;
  user-select: none;
  width: 100%;
`;

const MonthHeader = styled.div`
  align-items: center;
  background-color: #d8b9ff;
  color: #551665;
  display: flex;
  font-family: "copasetic";
  font-size: 20px;
  height: 42px;
  justify-content: center;
  width: 100%;
`;

const Grid = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const WeekdayCell = styled.div`
  align-items: center;
  background-color: #d8b9ff;
  color: #4b015e;
  display: flex;
  font-family: "simplifica";
  justify-content: center;
  width: calc(100% / 7);
  padding: 4px 0;
`;

type ShowcaseCalendarProps = {
  availabilities: MeetingAvailability[];
  currentUser: string;
  winningDates: string[];
  month: number;
  year: number;
  Cell: ShowcaseCellComponent;
};

const getDateArray = (year: number, monthIndex: number) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
  const lastDateOfMonth = new Date(year, monthIndex + 1, 0).getDate();
  const lastDateOfPreviousMonth = new Date(year, monthIndex, 0).getDate();

  const previousMonth = new Array(firstDayOfMonth)
    .fill(0)
    .map(
      (_, i) =>
        `${monthIndex !== 0 ? year : year - 1}/${
          monthIndex || 12
        }/${lastDateOfPreviousMonth - i}`
    )
    .reverse();

  const thisMonth = new Array(lastDateOfMonth)
    .fill(0)
    .map((_, i) => `${year}/${monthIndex + 1}/${i + 1}`);

  const nextMonthLength =
    42 - (previousMonth.length + thisMonth.length);

  const nextMonth = new Array(nextMonthLength)
    .fill(0)
    .map(
      (_, i) =>
        `${monthIndex !== 11 ? year : year + 1}/${
          (monthIndex + 2) % 12 || 12
        }/${i + 1}`
    );

  return [...previousMonth, ...thisMonth, ...nextMonth];
};

const ShowcaseCalendar = ({
  availabilities,
  currentUser,
  winningDates,
  month,
  year,
  Cell,
}: ShowcaseCalendarProps) => {
  const totalGroupSize = new Set(availabilities.map((a) => a.userName)).size;

  const getAvailableUsers = (dateString: string) =>
    new Set(
      availabilities
        .filter((a) => a.date === dateString)
        .map((a) => a.userName)
    );

  const dateArray = getDateArray(year, month);

  return (
    <CalendarFrame>
      <MonthHeader>{`${months[month]} ${year}`}</MonthHeader>
      <Grid>
        {daysOfWeek.map((day, i) => (
          <WeekdayCell key={i}>{day}</WeekdayCell>
        ))}
        {dateArray.map((dateString) => {
          const availableUsers = getAvailableUsers(dateString);
          const percentage =
            totalGroupSize === 0
              ? 0
              : Math.round((availableUsers.size / totalGroupSize) * 100);
          return (
            <Cell
              key={dateString}
              dateString={dateString}
              day={new Date(dateString).getDate()}
              percentage={percentage}
              availableCount={availableUsers.size}
              isMine={availableUsers.has(currentUser)}
              isWinner={winningDates.includes(dateString)}
              outOfMonth={new Date(dateString).getMonth() !== month}
            />
          );
        })}
      </Grid>
    </CalendarFrame>
  );
};

export default ShowcaseCalendar;
