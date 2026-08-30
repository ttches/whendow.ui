import { useEffect, useState } from "react";
import styled from "styled-components";

const ContentOverlay = styled.div`
  align-items: center;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  margin: 16px;
  max-width: 480px;
  padding: 32px 24px;
  width: calc(100% - 32px);
`;

const Title = styled.h1`
  color: white;
  font-family: "copasetic";
  font-size: 32px;
  margin: 0 0 16px 0;
  text-align: center;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Description = styled.p`
  color: white;
  font-family: "simplifica";
  font-size: 20px;
  margin: 0 0 32px 0;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PasscodeRow = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 9px;
  border: 1px solid black;
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 12px;
  padding: 16px 20px;
  width: 100%;
`;

const PasscodeText = styled.span`
  color: #4b015e;
  flex-grow: 1;
  font-family: "copasetic";
  font-size: 36px;
  overflow-wrap: anywhere;
  text-align: center;
`;

const ShowButton = styled.button`
  background: transparent;
  border: 1px solid #4b015e;
  border-radius: 9px;
  color: #4b015e;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "simplifica";
  font-size: 16px;
  padding: 8px 12px;

  &:hover {
    background-color: #eab9ff;
  }
`;

const CopyButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  color: #4b015e;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: 4px;

  &:hover {
    color: #aa2bd1;
  }
`;

const CopiedLabel = styled.span`
  color: white;
  font-family: "simplifica";
  font-size: 16px;
  height: 20px;
  margin-bottom: 20px;
`;

const ContinueButton = styled.button`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 80px;
  color: #4b015e;
  cursor: pointer;
  display: flex;
  font-family: "simplifica";
  font-size: 32px;
  height: 64px;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CopyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        You'll need this passcode to get back in if you switch devices or
        clear your cookies. Write it down now — it won't be shown again.
      </Description>
      <PasscodeRow>
        <PasscodeText>{isRevealed ? passcode : censor(passcode)}</PasscodeText>
        <ShowButton onClick={() => setIsRevealed((current) => !current)}>
          {isRevealed ? "Hide" : "Show"}
        </ShowButton>
        <CopyButton onClick={handleCopy} aria-label="Copy passcode">
          <CopyIcon />
        </CopyButton>
      </PasscodeRow>
      <CopiedLabel>{copied ? "Copied!" : ""}</CopiedLabel>
      <ContinueButton onClick={onClose}>Got it</ContinueButton>
    </ContentOverlay>
  );
};

export default PasscodeReminderModal;
