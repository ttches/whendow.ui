import { ChangeEvent, useState } from "react";
import Calendar, { IndicatorType } from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import PasscodeReminderModal from "./PasscodeReminderModal";
import useUsername from "../hooks/useUsername";
import useModal from "../hooks/useModal";
import useLogin from "../api/mutations/useLogin";
import useSetAvailability from "../api/mutations/useSetAvailability";
import { useParams } from "react-router-dom";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";
import { getPasscodeFromCookie } from "../utilities/cookie";

type SetAvailabilityProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  onSuccess: (availability: string[]) => void;
  startDate: string;
  theme?: IndicatorType;
};

enum InputSteps {
  None,
  Username,
  Passcode,
}

const SetAvailability = ({
  availabilities,
  endDate,
  onSuccess,
  startDate,
  theme,
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

  console.log("dates", dates);

  const login = useLogin();
  const setAvailabilityMutation = useSetAvailability();
  const { openModal, closeModal, Modal } = useModal();

  const handleLoginSuccess = () => {
    setStep(InputSteps.None);
    setDates((current) => [...new Set([...current, ...initialDates])]);
  };

  const handleDateClick = (dateString: string) => {
    const compare = compareDates(dateString);
    if (!compare.isWithinRange(startDate, endDate)) return;

    const previouslyClicked = dates.includes(dateString);
    const nextAvailability = previouslyClicked
      ? dates.filter((date) => date !== dateString)
      : [...dates, dateString];

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

      handleLoginSuccess();
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
        dates,
      },
      {
        onSuccess: () => onSuccess(dates),
      }
    );
  };

  const handleUsernameNext = async () => {
    if (!usernameInput) return;

    const existingUser = availabilities.some(
      (availability) => availability.userName === usernameInput
    );

    if (existingUser) {
      setStep(InputSteps.Passcode);

      return;
    }

    await login.mutateAsync({ username: usernameInput, meetingId: meetingId! });

    if (login.isError) {
      return;
    }

    handleLoginSuccess();
    openModal();
    handleSubmit();
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

    return false;
  };

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
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
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={dates}
            availabilities={availabilities}
            theme={theme}
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
      <Modal>
        <PasscodeReminderModal
          passcode={getPasscodeFromCookie(meetingId!)}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default SetAvailability;
