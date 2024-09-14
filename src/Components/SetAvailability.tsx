import { useState } from "react";
import Calendar from "./Calendar/Calendar";

type SetAvailabilityProps = {
  startDate: string;
};

const SetAvailability = ({ startDate }: SetAvailabilityProps) => {
  const [availability, setAvailability] = useState<string[]>([]);

  const handleDateClick = (dateString: string) => {
    const previouslyClicked = availability.includes(dateString);
    let nextAvailability: string[] = [];
    if (previouslyClicked) {
      nextAvailability = availability.filter((date) => date !== dateString);
    } else {
      nextAvailability = [...availability, dateString];
    }

    setAvailability(nextAvailability);
  };

  return (
    <Calendar
      initialMonth={new Date(startDate).getMonth()}
      onDateClick={handleDateClick}
      selectedDates={availability}
    />
  );
};

export default SetAvailability;
