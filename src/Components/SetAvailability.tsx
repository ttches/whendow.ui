import { ChangeEvent, useEffect, useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import useUsername from "../hooks/useUsername";
import useLogin from "../api/mutations/useLogin";
import useSetAvailability from "../api/mutations/useSetAvailability";
import { useParams } from "react-router-dom";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";

type SetAvailabilityProps = {
  availabilities: MeetingAvailability[];
  onSuccess: (availability: string[]) => void;
  startDate: string;
};

enum InputSteps {
  None,
  Username,
  Passcode,
  Submit,
}

const SetAvailability = ({
  availabilities,
  onSuccess,
  startDate,
}: SetAvailabilityProps) => {
  const usernameFromCookie = useUsername();
  const initialDates = availabilities
    .filter((availability) => availability.userName === usernameFromCookie)
    .map((availability) => availability.date);
  const { meetingId } = useParams();
  const [dates, setDates] = useState<string[]>(initialDates);
  const [usernameInput, setUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [step, setStep] = useState(
    usernameFromCookie ? InputSteps.None : InputSteps.Username
  );

  const login = useLogin();
  const setAvailabilityMutation = useSetAvailability();

  useEffect(() => {
    if (login.isSuccess) {
      setStep(InputSteps.None);

      const newDates = [...new Set([...dates, ...initialDates])];
      setDates(newDates);
    }
  }, [login.isSuccess]);

  const handleDateClick = (dateString: string) => {
    const previouslyClicked = dates.includes(dateString);
    let nextAvailability: string[] = [];
    if (previouslyClicked) {
      nextAvailability = dates.filter((date) => date !== dateString);
    } else {
      nextAvailability = [...dates, dateString];
    }

    setDates(nextAvailability);
  };

  const handleNext = () => async () => {
    if (step === InputSteps.Username) {
      return handleUsernameNext();
    }

    if (step === InputSteps.Passcode) {
      await login.mutateAsync({
        username: usernameInput,
        passcode: passcodeInput,
        meetingId: meetingId!,
      });

      if (login.isError) {
        return;
      }
    }

    handleSubmit();
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

  const handleSubmit = () => {
    setAvailabilityMutation.mutate(
      {
        meetingId: meetingId!,
        dates, // bugged, can set everyones availability, duplicates things
      },
      {
        onSuccess: () => onSuccess(dates),
      }
    );
  };

  const handleUsernameNext = () => {
    if (!usernameInput) return;

    const existingUser = availabilities.some(
      (availability) => availability.userName === usernameInput
    );

    if (existingUser) {
      setStep(InputSteps.Passcode);

      return;
    }

    setStep(InputSteps.Submit);
  };

  const isButtonDisabled = () => {
    if (login.isPending || setAvailabilityMutation.isPending) {
      return true;
    }

    if (step === InputSteps.Username) {
      return !usernameInput;
    }

    if (step === InputSteps.Passcode) {
      return !passcodeInput;
    }

    if (step === InputSteps.Submit) {
      const previousAvailability = availabilities.some(
        (availability) => availability.userName === usernameFromCookie
      );

      return !dates.length && !previousAvailability;
    }

    return false;
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
            selectedDates={dates}
          />
        </StepContainer>
        <FloatingFooter
          nextDisabled={isButtonDisabled()}
          onNext={handleNext}
          onBack={handleBack}
          text={usernameFromCookie || usernameInput}
          input={getInput()}
        />
      </Container>
    </div>
  );
};

export default SetAvailability;
