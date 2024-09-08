import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import { useState } from "react";

const CalendarContainer = styled.div`
  margin-bottom: 16px;
`;

const CreateMeeting = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const initialMonth = new Date().getMonth();
  const selectedDates = [startDate, endDate].filter(Boolean);

  const handleDateClick = (dateString: string) => {
    if (dateString === startDate) {
      setStartDate("");
      setEndDate("");
      return;
    }

    if (dateString === endDate) {
      setEndDate("");
      return;
    }

    if (!startDate) {
      setStartDate(dateString);
      return;
    }

    if (!endDate) {
      setEndDate(dateString);
      return;
    }
  };

  const getCtaVerbiage = () => {
    if (!startDate) {
      return "START DATE";
    }

    if (!endDate) {
      return "END DATE";
    }

    return "CREATE MEETING";
  };

  return (
    <div>
      <div>
        <CalendarContainer>
          <Calendar
            initialMonth={initialMonth}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
          />
        </CalendarContainer>
        <FloatingFooter
          disabled={!startDate || !endDate}
          text={getCtaVerbiage()}
        />
      </div>
    </div>
  );
};

export default CreateMeeting;
