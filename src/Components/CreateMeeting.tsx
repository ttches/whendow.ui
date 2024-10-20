import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import { useState } from "react";
import useCreateMeeting from "../api/mutations/useCreateMeeting";

export const StepContainer = styled.div`
  margin-bottom: 16px;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #d8b9ff;
  color: #4b015e;
  font-family: "copasetic";
  width: 100%;
  height: 120px;
  margin-top: 12px;
  max-width: 400px;
  border-radius: 9px;
  position: relative;
`;

const FormInput = styled.input`
  background-color: white;
  color: #4b015e;
  border-radius: 9px;
  border: 1px solid black;
  box-shadow: none;
  font-size: 28px;
  margin: 16px;
  padding: 8px;
  width: 80%;

  ::placeholder {
    color: #b096ce;
  }

  &:focus {
    outline: 16px solid #cb8adf;
    border: 4px solid #aa2bd1;
  }
`;

const CreateMeeting = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [step, setStep] = useState(0);
  const createMeeting = useCreateMeeting();

  const initialMonth = new Date().getMonth();
  const selectedDates = [startDate, endDate].filter(Boolean);

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

    return "CREATE";
  };

  const handleMeetingNameChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setMeetingName(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (step === 1) {
      createMeeting.mutate({
        name: meetingName,
        owner: "ty",
        startDate,
        endDate,
      });
      return;
    }

    setStep(step + 1);
  };

  const isInRange = (dateString: string) => {
    if (!startDate || !endDate) {
      return false;
    }

    const date = new Date(dateString);

    return date > new Date(startDate) && date < new Date(endDate);
  };

  const isButtonDisabled = () => {
    if (step === 0) {
      return !startDate || !endDate;
    }

    if (step === 1) {
      return !meetingName;
    }
  };

  return (
    <div>
      <div style={{ display: "grid" }}>
        <StepContainer>
          <Calendar
            initialMonth={initialMonth}
            isInRange={isInRange}
            onDateClick={handleDateClick}
            selectedDates={selectedDates}
          />
          {step === 1 && (
            <Form>
              <FormInput
                type="text"
                onChange={handleMeetingNameChange}
                placeholder="Event Name"
                value={meetingName}
              />
            </Form>
          )}
        </StepContainer>
        <FloatingFooter
          disabled={isButtonDisabled()}
          onButtonClick={handleSubmit}
          text={getCtaVerbiage()}
        />
      </div>
    </div>
  );
};

export default CreateMeeting;
