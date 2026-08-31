import { ChangeEvent, useState } from "react";
import LoginModal from "./LoginModal";
import PasscodeReminderModal from "./PasscodeReminderModal";
import useLogin from "../api/mutations/useLogin";
import { Overlay } from "../hooks/useModal";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { getPasscodeFromCookie } from "../utilities/cookie";

type LoginFlowStep = "username" | "passcode" | "passcodeReminder";

type LoginFlowProps = {
  availabilities: MeetingAvailability[];
  meetingId: string;
  onClose: () => void;
};

const LoginFlow = ({ availabilities, meetingId, onClose }: LoginFlowProps) => {
  const [step, setStep] = useState<LoginFlowStep>("username");
  const [usernameInput, setUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const login = useLogin();

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

  const handleUsernameNext = async () => {
    if (!usernameInput) return;

    const existingUser = availabilities.some(
      (availability) => availability.userName === usernameInput
    );

    if (existingUser) {
      setStep("passcode");

      return;
    }

    const result = await login.mutateAsync({
      username: usernameInput,
      meetingId,
    });

    if (!result.data.login.success) {
      setLoginError(result.data.login.error || "Something went wrong");

      return;
    }

    setStep("passcodeReminder");
  };

  const handlePasscodeNext = async () => {
    const result = await login.mutateAsync({
      username: usernameInput,
      passcode: passcodeInput,
      meetingId,
    });

    if (!result.data.login.success) {
      setLoginError(result.data.login.error || "Incorrect passcode");

      return;
    }

    onClose();
  };

  const handleSubmit = () => {
    if (step === "username") {
      return handleUsernameNext();
    }

    return handlePasscodeNext();
  };

  const isSubmitDisabled = () => {
    if (login.isPending) return true;

    return step === "username" ? !usernameInput : !passcodeInput;
  };

  return (
    <Overlay>
      {step === "passcodeReminder" ? (
        <PasscodeReminderModal
          passcode={getPasscodeFromCookie(meetingId)}
          onClose={onClose}
        />
      ) : (
        <LoginModal
          errorMessage={loginError}
          onPasscodeChange={handlePasscodeChange}
          onSubmit={handleSubmit}
          onUsernameChange={handleUsernameChange}
          passcodeInput={passcodeInput}
          step={step}
          submitDisabled={isSubmitDisabled()}
          usernameInput={usernameInput}
        />
      )}
    </Overlay>
  );
};

export default LoginFlow;
