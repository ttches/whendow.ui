import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import { useNavigate } from "react-router-dom";
import { BASE } from "../Router";

type SetAvailabilityProps = {
  meetingName: string;
  startDate: string;
};

const SetAvailability = ({ meetingName, startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleDateClick = (dateString: string) => {
    const previouslyClicked = availability.includes(dateString);
    let nextAvailability: string[] = [];
    if (previouslyClicked) {
      nextAvailability = availability.filter((date) => date !== dateString);
    } else {
      nextAvailability = [...availability, dateString];
    }

    setAvailability(nextAvailability);
  };

  const getCtaVerbiage = () => {
    if (!availability.length) {
      return "Tap available dates";
    }

    return "Save";
  };

  const handleSubmit = () => {
    navigate(`${BASE}/${encodeURIComponent(meetingName)}`);
  };

  const isButtonDisabled = () => !availability.length;

  return (
    <div style={{ display: "grid" }}>
      <StepContainer>
        <Calendar
          initialMonth={new Date(startDate).getMonth()}
          onDateClick={handleDateClick}
          selectedDates={availability}
        />
      </StepContainer>
      <FloatingFooter
        disabled={isButtonDisabled()}
        onButtonClick={handleSubmit}
        text={getCtaVerbiage()}
      />
    </div>
  );
};

export default SetAvailability;
