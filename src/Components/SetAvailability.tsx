import { ChangeEvent, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";

type SetAvailabilityProps = {
  onSubmit: (availability: string[]) => void;
  startDate: string;
};

const SetAvailability = ({ onSubmit, startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);
  const [userNameInput, setUserNameInput] = useState("");
  const [showUsernameInput, setShowUsernameInput] = useState(false);

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
    if (!showUsernameInput) {
      return "TAP AVAILABLE DATES";
    }

    return "";
  };

  const handleNext = () => () => {
    if (!showUsernameInput && availability.length > 0) {
      setShowUsernameInput(true);
      return;
    }

    onSubmit(availability);
  };

  const handleBack = () => {
    if (showUsernameInput) {
      return () => setShowUsernameInput(false);
    }

    return undefined;
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\d+|\s|\W)/, "");

    setUserNameInput(sanitizedValue);
  };

  const isButtonDisabled = () => {
    if (!showUsernameInput) {
      return !availability.length;
    }
    return !userNameInput;
  };

  const getInput = () => {
    if (showUsernameInput) {
      return {
        value: userNameInput,
        onChange: handleUserNameChange,
        placeholder: "Username",
      };
    }

    return undefined;
  };

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
        nextDisabled={isButtonDisabled()}
        onNext={handleNext}
        onBack={handleBack}
        text={getCtaVerbiage()}
        input={getInput()}
      />
    </div>
  );
};

export default SetAvailability;
