import { useEffect } from "react";
import confetti from "canvas-confetti";
import styled, { keyframes } from "styled-components";
import ViewAvailability from "./ViewAvailability";
import useUnlockMeeting from "../api/mutations/useUnlockMeeting";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SummaryCard = styled.div`
  align-items: center;
  background: linear-gradient(-45deg, #d971d5, #252133, #191831, #d971d5);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(217, 113, 213, 0.2);
  color: #e8e2f4;
  display: flex;
  flex-direction: column;
  margin: 16px auto;
  max-width: 400px;
  padding: 24px 16px;
  text-align: center;
`;

const SummaryLabel = styled.p`
  font-family: "simplifica";
  font-size: 18px;
  margin: 0 0 8px 0;
  opacity: 0.85;
`;

const SummaryDates = styled.h2`
  font-family: "copasetic";
  font-size: 28px;
  margin: 0;
`;

const UnlockButton = styled.button`
  background-color: transparent;
  border: 2px solid #e8e2f4;
  border-radius: 80px;
  color: #e8e2f4;
  cursor: pointer;
  font-family: "simplifica";
  font-size: 16px;
  margin-top: 16px;
  padding: 8px 24px;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const formatWinningDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

type LockedMeetingProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  isOwner: boolean;
  meetingId: string;
  startDate: string;
  winningDates: string[];
};

const LockedMeeting = ({
  availabilities,
  endDate,
  isOwner,
  meetingId,
  startDate,
  winningDates,
}: LockedMeetingProps) => {
  const unlockMeeting = useUnlockMeeting();

  useEffect(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  }, []);

  return (
    <div>
      <SummaryCard>
        <SummaryLabel>This event is happening on</SummaryLabel>
        <SummaryDates>{winningDates.map(formatWinningDate).join(" & ")}</SummaryDates>
        {isOwner && (
          <UnlockButton
            disabled={unlockMeeting.isPending}
            onClick={() => unlockMeeting.mutate({ meetingId })}
          >
            Unlock
          </UnlockButton>
        )}
      </SummaryCard>
      <ViewAvailability
        availabilities={availabilities}
        endDate={endDate}
        startDate={startDate}
      />
    </div>
  );
};

export default LockedMeeting;
