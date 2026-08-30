import { ChangeEvent, useEffect, useState } from "react";
import Calendar, { IndicatorType } from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import LoginModal from "./LoginModal";
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

type LoginStep = "username" | "passcode";

const SetAvailability = ({
  availabilities,
  endDate,
  onSuccess,
  startDate,
  theme,
}: SetAvailabilityProps) => {
  const usernameFromCookie = useUsername();
  const isLoggedIn = Boolean(usernameFromCookie);
  const initialDates = availabilities
    .filter((availability) => availability.userName === usernameFromCookie)
    .map((availability) => availability.date);

  const { meetingId } = useParams();
  const [dates, setDates] = useState<string[]>(initialDates);
  const [usernameInput, setUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginStep, setLoginStep] = useState<LoginStep>("username");

  console.log("dates", dates);

  const login = useLogin();
  const setAvailabilityMutation = useSetAvailability();
  const {
    openModal: openLoginModal,
    closeModal: closeLoginModal,
    Modal: LoginModalOverlay,
  } = useModal();
  const {
    openModal: openPasscodeReminder,
    closeModal: closePasscodeReminder,
    Modal: PasscodeReminderOverlay,
  } = useModal();

  useEffect(() => {
    if (!isLoggedIn) {
      openLoginModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginSuccess = () => {
    closeLoginModal();
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

  const handleBack = () => undefined;

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\d+|\s|\W)/, "");

    setLoginError("");
    setUsernameInput(sanitizedValue);
  };

  const handlePasscodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget?.value || "";
    const sanitizedValue = newValue.replace(/(\W)/, "-");

    setLoginError("");
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
      setLoginStep("passcode");

      return;
    }

    const result = await login.mutateAsync({
      username: usernameInput,
      meetingId: meetingId!,
    });

    if (!result.data.login.success) {
      setLoginError(result.data.login.error || "Something went wrong");

      return;
    }

    handleLoginSuccess();
    openPasscodeReminder();
  };

  const handlePasscodeNext = async () => {
    const result = await login.mutateAsync({
      username: usernameInput,
      passcode: passcodeInput,
      meetingId: meetingId!,
    });

    if (!result.data.login.success) {
      setLoginError(result.data.login.error || "Incorrect passcode");

      return;
    }

    handleLoginSuccess();
  };

  const handleLoginModalSubmit = () => {
    if (loginStep === "username") {
      return handleUsernameNext();
    }

    return handlePasscodeNext();
  };

  const isLoginSubmitDisabled = () => {
    if (login.isPending) return true;

    return loginStep === "username" ? !usernameInput : !passcodeInput;
  };

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  return (
    <div>
      {isLoggedIn && (
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
            nextDisabled={setAvailabilityMutation.isPending}
            onNext={() => handleSubmit}
            onBack={handleBack}
            text={usernameFromCookie || usernameInput}
          />
        </Container>
      )}
      <LoginModalOverlay>
        <LoginModal
          errorMessage={loginError}
          onPasscodeChange={handlePasscodeChange}
          onSubmit={handleLoginModalSubmit}
          onUsernameChange={handleUsernameChange}
          passcodeInput={passcodeInput}
          step={loginStep}
          submitDisabled={isLoginSubmitDisabled()}
          usernameInput={usernameInput}
        />
      </LoginModalOverlay>
      <PasscodeReminderOverlay>
        <PasscodeReminderModal
          passcode={getPasscodeFromCookie(meetingId!)}
          onClose={closePasscodeReminder}
        />
      </PasscodeReminderOverlay>
    </div>
  );
};

export default SetAvailability;
