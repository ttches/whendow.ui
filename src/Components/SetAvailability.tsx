import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";

type SetAvailabilityProps = {
  meetingName: string;
  onSubmit: (availability: string[]) => void;
  startDate: string;
};

const SetAvailability = ({ onSubmit, startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);

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
    onSubmit(availability);
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
