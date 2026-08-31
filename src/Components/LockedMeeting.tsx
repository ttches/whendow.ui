import { useEffect } from "react";
import confetti from "canvas-confetti";
import ViewAvailability from "./ViewAvailability";
import useUnlockMeeting from "../api/mutations/useUnlockMeeting";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import {
  SummaryCard,
  SummaryDates,
  SummaryLabel,
  UnlockButton,
} from "./LockedMeeting.styles";

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
