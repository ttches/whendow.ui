import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
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
    <div>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={new Date(startDate).getMonth()}
            onDateClick={handleDateClick}
            selectedDates={[selectedDate]}
          />
        </StepContainer>
      </Container>
    </div>
  );
};

export default ViewAvailability;
