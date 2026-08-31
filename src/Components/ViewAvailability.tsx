import { useState } from "react";
import Calendar, { IndicatorType } from "./Calendar/Calendar";
import DayAvailabilityModal from "./DayAvailabilityModal";
import { Container, StepContainer } from "./CreateMeeting.styles";
import { MeetingAvailability } from "../api/queries/getAvailabilitiesByMeetingId";
import { compareDates } from "../utilities/dates";
import useModal from "../hooks/useModal";
import useUsername from "../hooks/useUsername";

type ViewAvailabilityProps = {
  availabilities: MeetingAvailability[];
  endDate: string;
  startDate: string;
  theme?: IndicatorType;
  userNameOverride?: string;
};

const ViewAvailability = ({
  availabilities,
  startDate,
  endDate,
  theme,
  userNameOverride,
}: ViewAvailabilityProps) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { Modal, closeModal, openModal } = useModal();

  const userNameFromState = useUsername();
  const userName = userNameOverride || userNameFromState || undefined;

  const totalPeople = new Set(availabilities.map((a) => a.userName)).size;

  const getPeopleForDate = (dateString: string) =>
    [
      ...new Set(
        availabilities
          .filter((a) => a.date === dateString)
          .map((a) => a.userName),
      ),
    ].sort((a, b) => {
      if (a === userName) return -1;
      if (b === userName) return 1;
      return a.localeCompare(b);
    });

  const peopleForSelectedDate = getPeopleForDate(selectedDate);

  const isInRange = (dateString: string) => {
    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);

    if (!isInRange(dateString)) return;

    openModal();
  };

  return (
    <div>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={new Date(startDate).getMonth()}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={[selectedDate]}
            availabilities={availabilities}
            theme={theme}
            userName={userName}
          />
        </StepContainer>
      </Container>
      <Modal>
        <DayAvailabilityModal
          date={selectedDate}
          onClose={closeModal}
          people={peopleForSelectedDate}
          totalPeople={totalPeople}
          userName={userName}
        />
      </Modal>
    </div>
  );
};

export default ViewAvailability;
