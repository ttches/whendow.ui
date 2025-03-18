import { ChangeEvent, useEffect, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import useUsername from "../hooks/useUsername";
import useLogin from "../api/mutations/useLogin";
import { useParams } from "react-router-dom";

type SetAvailabilityProps = {
  onSubmit: (availability: string[]) => void;
  startDate: string;
};

enum InputSteps {
  None,
  Username,
  Passcode,
}

const SetAvailability = ({ onSubmit, startDate }: SetAvailabilityProps) => {
  const usernameFromCookie = useUsername();
  const { meetingId } = useParams();
  const [availability, setAvailability] = useState<string[]>([]);
  const [usernameInput, setUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [step, setStep] = useState(
    usernameFromCookie ? InputSteps.None : InputSteps.Username
  );

  const login = useLogin();

  useEffect(() => {
    if (login.isSuccess) {
      setStep(InputSteps.None);
    }
  }, [login.isSuccess]);

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
    if (step === InputSteps.Username) {
      setStep(InputSteps.Passcode);
      return;
    }

    if (step === InputSteps.Passcode) {
      login.mutate({
        username: usernameInput,
        passcode: passcodeInput,
        meetingId: meetingId!,
      });
      return;
    }

    onSubmit(availability);
  };

  const handleBack = () => undefined;

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\d+|\s|\W)/, "");

    setUsernameInput(sanitizedValue);
  };

  const handlePasscodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\W)/, "-");

    setPasscodeInput(sanitizedValue);
  };

  const isButtonDisabled = () => {
    if (step === InputSteps.Username) {
      return !usernameInput;
    }

    if (step === InputSteps.Passcode) {
      return !passcodeInput;
    }

    return login.isPending;
  };

  const getInput = () => {
    if (step === InputSteps.Username) {
      return {
        value: usernameInput,
        onChange: handleUsernameChange,
        placeholder: "Username",
      };
    }

    if (step === InputSteps.Passcode) {
      return {
        value: passcodeInput,
        onChange: handlePasscodeChange,
        placeholder: "Passcode",
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
          text={usernameFromCookie}
          input={getInput()}
        />
      </Container>
    </div>
  );
};

export default SetAvailability;
