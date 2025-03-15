import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import { useState, useEffect } from "react";
import useCreateMeeting from "../api/mutations/useCreateMeeting";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 16px;
  max-width: 550px;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

enum CreateMeetingSteps {
  SelectDates,
  CreateMeetingName,
  CreateUserName,
}

const CreateMeeting = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [step, setStep] = useState(CreateMeetingSteps.SelectDates);
  const [username, setUsername] = useState("");
  const createMeeting = useCreateMeeting();

  const initialMonth = new Date().getMonth();
  const selectedDates = [startDate, endDate].filter(Boolean);

  useEffect(() => {
    if (step === CreateMeetingSteps.SelectDates && endDate) {
      setStep(CreateMeetingSteps.CreateMeetingName);
    }
  }, [step, endDate]);

  const handleDateClick = (dateString: string) => {
    const date = new Date(dateString);

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

    if (date < new Date(startDate)) {
      setStartDate(dateString);
      return;
    }

    setEndDate(dateString);
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

  const handleMeetingNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMeetingName(event.currentTarget.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleNext = () => () => {
    const nextStep = getNextStep();

    if (!nextStep) {
      createMeeting.mutate({
        name: meetingName,
        owner: username,
        startDate,
        endDate,
      });
      return;
    }

    setStep(nextStep);
  };

  const getNextStep = () => {
    switch (step) {
      case CreateMeetingSteps.SelectDates:
        return CreateMeetingSteps.CreateMeetingName;
      case CreateMeetingSteps.CreateMeetingName:
        return CreateMeetingSteps.CreateUserName;
      default:
        return undefined;
    }
  };

  const handleBack = () => {
    if (step === CreateMeetingSteps.CreateUserName) {
      return () => setStep(CreateMeetingSteps.CreateMeetingName);
    }

    return undefined;
  };

  const isInRange = (dateString: string) => {
    if (!startDate || !endDate) {
      return false;
    }

    const date = new Date(dateString);

    return date > new Date(startDate) && date < new Date(endDate);
  };

  const isButtonDisabled = () => {
    if (createMeeting.isPending) return true;

    if (step === CreateMeetingSteps.SelectDates) {
      return !startDate || !endDate;
    }

    if (step === CreateMeetingSteps.CreateMeetingName) {
      return !meetingName;
    }

    if (step === CreateMeetingSteps.CreateUserName) {
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

    if (step === CreateMeetingSteps.CreateUserName) {
      return {
        value: username,
        onChange: handleUsernameChange,
        placeholder: "Username",
      };
    }

    return undefined;
  };

  return (
    <div>
      <Container>
        <StepContainer>
          <Calendar
            initialMonth={initialMonth}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
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
    </div>
  );
};

export default CreateMeeting;
