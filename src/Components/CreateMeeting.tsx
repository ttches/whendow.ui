import styled from "styled-components";
import Calendar from "./Calendar/Calendar";
import FloatingFooter from "./FloatingFooter";
import { useState } from "react";
import useCreateMeeting from "../api/mutations/useCreateMeeting";
import { Form, FormInput } from "./FloatingInput";

export const StepContainer = styled.div`
  margin-bottom: 16px;
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
