import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import PasscodeReminderModal from "./PasscodeReminderModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCreateMeeting from "../api/mutations/useCreateMeeting";
import useModal from "../hooks/useModal";
import { compareDates } from "../utilities/dates";
import { getPasscodeFromCookie } from "../utilities/cookie";
import { Container, PageContainer, StepContainer } from "./CreateMeeting.styles";

enum CreateMeetingSteps {
  SelectDates,
  CreateMeetingName,
  CreateUsername,
}

const CreateMeeting = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [step, setStep] = useState(CreateMeetingSteps.SelectDates);
  const [username, setUsername] = useState("");
  const createMeeting = useCreateMeeting();
  const navigate = useNavigate();
  const {
    openModal: openPasscodeReminder,
    closeModal: closePasscodeReminder,
    Modal: PasscodeReminderOverlay,
  } = useModal();

  const initialMonth = new Date().getMonth();
  const selectedDates = [startDate, endDate].filter(Boolean);

  const handleDateClick = (dateString: string) => {
    if (dateString === startDate) {
      setStartDate("");
      setEndDate("");
      return;
    }

    if (dateString === endDate) {
      setEndDate("");
      return;
    }

    if (!startDate) {
      setStartDate(dateString);
      return;
    }

    if (compareDates(dateString).isBefore(startDate)) {
      setStartDate(dateString);
      return;
    }

    setEndDate(dateString);
    if (step === CreateMeetingSteps.SelectDates) {
      setStep(CreateMeetingSteps.CreateMeetingName);
    }
    return;
  };

  const getCtaVerbiage = () => {
    if (!startDate) {
      return "TAP START DATE";
    }

    if (!endDate) {
      return "TAP END DATE";
    }

    return "";
  };

  const isInRange = (dateString: string) => {
    if (!startDate || !endDate) {
      return true;
    }

    const compare = compareDates(dateString);
    return compare.isWithinRange(startDate, endDate);
  };

  const handleMeetingNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMeetingName(event.currentTarget.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleNext = () => () => {
    const nextStep = getNextStep();

    if (!nextStep) {
      createMeeting.mutate(
        {
          name: meetingName,
          owner: username,
          startDate,
          endDate,
        },
        { onSuccess: openPasscodeReminder },
      );
      return;
    }

    setStep(nextStep);
  };

  const handlePasscodeReminderClose = () => {
    closePasscodeReminder();

    const newMeetingId = createMeeting.data?.data.createMeeting.id;
    if (newMeetingId) {
      navigate(`/meeting/${newMeetingId}`);
    }
  };

  const getNextStep = () => {
    switch (step) {
      case CreateMeetingSteps.SelectDates:
        return CreateMeetingSteps.CreateMeetingName;
      case CreateMeetingSteps.CreateMeetingName:
        return CreateMeetingSteps.CreateUsername;
      default:
        return undefined;
    }
  };

  const handleBack = () => {
    if (step === CreateMeetingSteps.CreateUsername) {
      return () => setStep(CreateMeetingSteps.CreateMeetingName);
    }

    return undefined;
  };

  const isButtonDisabled = () => {
    if (createMeeting.isPending) return true;

    if (step === CreateMeetingSteps.SelectDates) {
      return !startDate || !endDate;
    }

    if (step === CreateMeetingSteps.CreateMeetingName) {
      return !meetingName;
    }

    if (step === CreateMeetingSteps.CreateUsername) {
      return !username || !meetingName;
    }
  };

  const getInput = () => {
    if (step === CreateMeetingSteps.CreateMeetingName) {
      return {
        value: meetingName,
        onChange: handleMeetingNameChange,
        placeholder: "Event Name",
      };
    }

    if (step === CreateMeetingSteps.CreateUsername) {
      return {
        value: username,
        onChange: handleUsernameChange,
        placeholder: "Username",
      };
    }

    return undefined;
  };

  return (
    <PageContainer>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={initialMonth}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
            showRangeOutline
          />
        </StepContainer>
        <FloatingFooter
          nextDisabled={isButtonDisabled()}
          onNext={handleNext}
          onBack={handleBack}
          text={getCtaVerbiage()}
          input={getInput()}
        />
      </Container>
      <PasscodeReminderOverlay>
        <PasscodeReminderModal
          passcode={getPasscodeFromCookie(
            createMeeting.data?.data.createMeeting.id,
          )}
          onClose={handlePasscodeReminderClose}
        />
      </PasscodeReminderOverlay>
    </PageContainer>
  );
};

export default CreateMeeting;
