import { ChangeEvent, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import useUsername from "../hooks/useUsername";

type SetAvailabilityProps = {
  onSubmit: (availability: string[]) => void;
  startDate: string;
};

const SetAvailability = ({ onSubmit, startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);
  const [userNameInput, setUserNameInput] = useState("");
  const username = useUsername();

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

  const handleNext = () => () => {
    onSubmit(availability);
  };

  const handleBack = () => undefined;

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\d+|\s|\W)/, "");

    setUserNameInput(sanitizedValue);
  };

  const isButtonDisabled = () => {
    if (username) {
      return !availability.length;
    }
    return !availability.length || !userNameInput;
  };

  const getInput = () => {
    if (!username) {
      return {
        value: userNameInput,
        onChange: handleUserNameChange,
        placeholder: "Username",
      };
    }

    return undefined;
  };

  return (
    <div>
      <Container>
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
          text={username}
          input={getInput()}
        />
      </Container>
    </div>
  );
};

export default SetAvailability;
