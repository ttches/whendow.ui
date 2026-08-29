import { useState } from "react";
import Calendar from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting";
import FloatingFooter from "./FloatingFooter";
import useLockMeeting from "../api/mutations/useLockMeeting";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";

type SelectWinningDatesProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  meetingId: string;
  onSuccess: () => void;
  startDate: string;
};

const SelectWinningDates = ({
  availabilities,
  endDate,
  meetingId,
  onSuccess,
  startDate,
}: SelectWinningDatesProps) => {
  const [winningDates, setWinningDates] = useState<string[]>([]);
  const lockMeeting = useLockMeeting();

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  const handleDateClick = (dateString: string) => {
    if (!isInRange(dateString)) return;

    const alreadySelected = winningDates.includes(dateString);
    setWinningDates(
      alreadySelected
        ? winningDates.filter((date) => date !== dateString)
        : [...winningDates, dateString]
    );
  };

  const handleLockIn = () => () => {
    lockMeeting.mutate({ meetingId, winningDates }, { onSuccess });
  };

  return (
    <div>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={new Date(startDate).getMonth()}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={winningDates}
            availabilities={availabilities}
          />
        </StepContainer>
        <FloatingFooter
          nextDisabled={!winningDates.length || lockMeeting.isPending}
          onNext={handleLockIn}
          onBack={() => undefined}
          text={
            winningDates.length ? "Lock In Winning Date(s)" : "Tap Winning Date(s)"
          }
        />
      </Container>
    </div>
  );
};

export default SelectWinningDates;
