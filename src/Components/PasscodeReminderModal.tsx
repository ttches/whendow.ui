import { useEffect, useState } from "react";
import {
  ContentOverlay,
  ContinueButton,
  CopyButton,
  Description,
  PasscodeRow,
  PasscodeText,
  ShowButton,
  Title,
} from "./PasscodeReminderModal.styles";

const CopyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="9"
      y="9"
      width="12"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

type PasscodeReminderModalProps = {
  passcode?: string;
  onClose: () => void;
};

const censor = (passcode: string) => passcode.replace(/[^-]/g, "•");

const PasscodeReminderModal = ({
  passcode = "",
  onClose,
}: PasscodeReminderModalProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(passcode);
    setCopied(true);
  };

  return (
    <ContentOverlay>
      <Title>Save Your Passcode</Title>
      <Description>
        You'll need this passcode to get back in if you switch devices or clear
        your cookies. Write it down now — it won't be shown again.
      </Description>
      <PasscodeRow $revealed={isRevealed} $copied={copied}>
        <PasscodeText>{isRevealed ? passcode : censor(passcode)}</PasscodeText>
        <ShowButton onClick={() => setIsRevealed((current) => !current)}>
          {isRevealed ? "Hide" : "Show"}
        </ShowButton>
        <CopyButton onClick={handleCopy} aria-label="Copy passcode">
          <CopyIcon />
        </CopyButton>
      </PasscodeRow>
      <ContinueButton onClick={onClose}>Got it</ContinueButton>
    </ContentOverlay>
  );
};

export default PasscodeReminderModal;
