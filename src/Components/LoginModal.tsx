import { ChangeEvent, KeyboardEvent } from "react";
import {
  ContentOverlay,
  ErrorText,
  Input,
  SubmitButton,
  Title,
} from "./LoginModal.styles";

type LoginModalStep = "username" | "passcode";

type LoginModalProps = {
  errorMessage?: string;
  onPasscodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  passcodeInput: string;
  step: LoginModalStep;
  submitDisabled: boolean;
  usernameInput: string;
};

const LoginModal = ({
  errorMessage,
  onPasscodeChange,
  onSubmit,
  onUsernameChange,
  passcodeInput,
  step,
  submitDisabled,
  usernameInput,
}: LoginModalProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !submitDisabled) {
      onSubmit();
    }
  };

  return (
    <ContentOverlay>
      <Title>
        {step === "username" ? "What should we call you?" : "Enter your passcode"}
      </Title>
      {step === "username" ? (
        <Input
          autoFocus
          onChange={onUsernameChange}
          onKeyDown={handleKeyDown}
          placeholder="Username"
          value={usernameInput}
        />
      ) : (
        <Input
          autoFocus
          onChange={onPasscodeChange}
          onKeyDown={handleKeyDown}
          placeholder="Passcode"
          value={passcodeInput}
        />
      )}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      <SubmitButton disabled={submitDisabled} onClick={onSubmit}>
        {step === "username" ? "Next" : "Log In"}
      </SubmitButton>
    </ContentOverlay>
  );
};

export default LoginModal;
