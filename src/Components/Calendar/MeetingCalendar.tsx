import { useState } from "react";
import Calendar from "./Calendar";

const MeetingCalendar = () => {
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

  return (
    <Calendar
      initialMonth={initialMonth}
      onDateClick={handleDateClick}
      selectedDates={selectedDates}
    />
  );
};

export default MeetingCalendar;
