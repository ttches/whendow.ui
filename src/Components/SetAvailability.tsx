import { ChangeEvent, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
// import useSetAvailabilities from "../api/mutations/useSetAvailabilities";
import { Form, FormInput } from "./Elements/FloatingInput";

type SetAvailabilityProps = {
  onSubmit: (availability: string[]) => void;
  startDate: string;
};

const SetAvailability = ({ onSubmit, startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);
  const [userNameInput, setUserNameInput] = useState("");

  // const setAvailabilities = useSetAvailabilities();

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

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\d+|\s|\W)/, "");

    setUserNameInput(sanitizedValue);
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
      <Form>
        <FormInput
          type="text"
          onChange={handleUserNameChange}
          placeholder="User Name"
          value={userNameInput}
        />
      </Form>
      <FloatingFooter
        disabled={isButtonDisabled()}
        onButtonClick={handleSubmit}
        text={getCtaVerbiage()}
      />
    </div>
  );
};

export default SetAvailability;
