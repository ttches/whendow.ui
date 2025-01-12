import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { StepContainer } from "./CreateMeeting";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";

type ViewAvailabilityProps = {
  availabilities: MeetingAvailability[];
  startDate: string;
};

const ViewAvailability = ({
  availabilities,
  startDate,
}: ViewAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
  };

  return (
    <div style={{ display: "grid" }}>
      <StepContainer>
        <Calendar
          initialMonth={new Date(startDate).getMonth()}
          onDateClick={handleDateClick}
          selectedDates={[selectedDate]}
        />
      </StepContainer>
    </div>
  );
};

export default ViewAvailability;
