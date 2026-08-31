import { useEffect, useState } from "react";
import Calendar, { IndicatorType } from "./Calendar/Calendar";
import { Container, StepContainer } from "./CreateMeeting.styles";
import FloatingFooter from "./FloatingFooter";
import useUsername from "../hooks/useUsername";
import useSetAvailability from "../api/mutations/useSetAvailability";
import { useParams } from "react-router-dom";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";

type SetAvailabilityProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  onCancel?: () => void;
  onSuccess: (availability: string[]) => void;
  startDate: string;
  theme?: IndicatorType;
};

const SetAvailability = ({
  availabilities,
  endDate,
  onCancel,
  onSuccess,
  startDate,
  theme,
}: SetAvailabilityProps) => {
  const usernameFromCookie = useUsername();
  const initialDates = availabilities
    .filter((availability) => availability.userName === usernameFromCookie)
    .map((availability) => availability.date);

  const { meetingId } = useParams();
  const [dates, setDates] = useState<string[]>(initialDates);

  const setAvailabilityMutation = useSetAvailability();

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  const handleDateClick = (dateString: string) => {
    const compare = compareDates(dateString);
    if (!compare.isWithinRange(startDate, endDate)) return;

    const previouslyClicked = dates.includes(dateString);
    const nextAvailability = previouslyClicked
      ? dates.filter((date) => date !== dateString)
      : [...dates, dateString];

    setDates(nextAvailability);
  };

  const handleBack = () => onCancel;

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

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  return (
    <Container>
      <StepContainer>
        <Calendar
          initialMonth={new Date(startDate).getMonth()}
          isInRange={isInRange}
          onDateClick={handleDateClick}
          selectedDates={dates}
          availabilities={availabilities}
          theme={theme}
          showRangeOutline
        />
      </StepContainer>
      <FloatingFooter
        backLabel="×"
        nextDisabled={setAvailabilityMutation.isPending}
        onNext={() => handleSubmit}
        onBack={handleBack}
        text="Update"
      />
    </Container>
  );
};

export default SetAvailability;
