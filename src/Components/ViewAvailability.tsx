import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";

type ViewAvailabilityProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  startDate: string;
};

const ViewAvailability = ({
  availabilities,
  startDate,
  endDate,
}: ViewAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (dateString: string) => {
    console.log("Date clicked:", dateString);
    setSelectedDate(dateString);
  };

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  return (
    <div>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={new Date(startDate).getMonth()}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={[selectedDate]}
            availabilities={availabilities}
          />
        </StepContainer>
      </Container>
    </div>
  );
};

export default ViewAvailability;
