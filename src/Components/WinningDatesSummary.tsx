import { useEffect } from "react";
import confetti from "canvas-confetti";
import useUnlockMeeting from "../api/mutations/useUnlockMeeting";
import {
  SummaryCard,
  SummaryDates,
  SummaryLabel,
  UnlockButton,
} from "./WinningDatesSummary.styles";

const formatWinningDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString(undefined, {
    weekday: "short",
    month: "long",
    day: "numeric",
  });

type WinningDatesSummaryProps = {
  isOwner: boolean;
  meetingId: string;
  winningDates: string[];
};

const WinningDatesSummary = ({
  isOwner,
  meetingId,
  winningDates,
}: WinningDatesSummaryProps) => {
  const unlockMeeting = useUnlockMeeting();

  useEffect(() => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
  }, []);

  return (
    <SummaryCard>
      <SummaryLabel>This event is happening on</SummaryLabel>
      <SummaryDates>
        {winningDates.map(formatWinningDate).join(" & ")}
      </SummaryDates>
      {isOwner && (
        <UnlockButton
          disabled={unlockMeeting.isPending}
          onClick={() => unlockMeeting.mutate({ meetingId })}
        >
          Clear Winning Dates
        </UnlockButton>
      )}
    </SummaryCard>
  );
};

export default WinningDatesSummary;
