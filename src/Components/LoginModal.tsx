import { ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

const ContentOverlay = styled.div`
  align-items: center;
  background-color: #eab9ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 480px;
  padding: 32px 24px;
  width: calc(100% - 32px);
`;

const Title = styled.h1`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 32px;
  margin: 0 0 24px 0;
  text-align: center;
`;

const Input = styled.input`
  background-color: white;
  color: #4b015e;
  border-radius: 9px;
  border: 1px solid black;
  box-shadow: none;
  font-size: 28px;
  padding: 12px;
  width: 100%;
  font-family: "copasetic";
  height: 48px;
  margin-bottom: 32px;

  ::placeholder {
    color: #b096ce;
  }

  &:focus {
    outline: 12px solid #cb8adf;
    border: 4px solid #aa2bd1;
  }
`;

const ErrorText = styled.span`
  color: #4b015e;
  font-family: "simplifica";
  font-size: 16px;
  margin: -20px 0 20px 0;
  text-align: center;
`;

const SubmitButton = styled.button`
  align-items: center;
  background-color: #aa2bd1;
  border: 3px solid #4b015e;
  color: white;
  cursor: pointer;
  border-radius: 80px;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  width: 100%;

  &:hover:not(:disabled) {
    background-color: #0d7b7b;
    border-color: #aa2bd1;
  }

  &:disabled {
    background-color: transparent;
    border-color: #b096ce;
    color: #b096ce;
    cursor: not-allowed;
  }
`;

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
