import { useState } from "react";
import Calendar, { IndicatorType } from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting.styles";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";
import useUsername from "../hooks/useUsername";

type ViewAvailabilityProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  startDate: string;
  theme?: IndicatorType;
  userNameOverride?: string;
};

const ViewAvailability = ({
  availabilities,
  startDate,
  endDate,
  theme,
  userNameOverride,
}: ViewAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState("");

  const userNameFromState = useUsername();
  const userName = userNameOverride || userNameFromState || undefined;

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
            theme={theme}
            userName={userName}
          />
        </StepContainer>
      </Container>
    </div>
  );
};

export default ViewAvailability;
