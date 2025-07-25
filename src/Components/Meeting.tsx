import { useState } from "react";
import { useParams } from "react-router-dom";
import SetAvailability from "./SetAvailability";
import useGetMeetingById from "../api/queries/getMeetingById";
import useAvailabilitiesByMeetingId from "../api/queries/getAvailabilitiesByMeetingId";
import ViewAvailability from "./ViewAvailability";

enum CalendarMode {
  View = "view",
  SetAvailability = "setAvailability",
}

const Meeting = () => {
  const [calendarMode, setCalendarMode] = useState(CalendarMode.View);
  const meetingId = useParams().meetingId!;
  const { data: meeting } = useGetMeetingById({ id: meetingId });
  const { data: availabilities = [] } = useAvailabilitiesByMeetingId(meetingId);

  console.log("availabilities", availabilities);

  const { name, startDate, endDate } = meeting || {};

  const onSetAvailabilitySuccess = () => {
    setCalendarMode(CalendarMode.View);
  };

  const toggleCalendarMode = () => {
    const nextMode =
      calendarMode === CalendarMode.View
        ? CalendarMode.SetAvailability
        : CalendarMode.View;

    setCalendarMode(nextMode);
  };

  const getButtonContent = () => {
    switch (calendarMode) {
      case CalendarMode.SetAvailability:
        return "View Availability";
      case CalendarMode.View:
        return "Set Availability";
    }
  };

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={() => toggleCalendarMode()}>{getButtonContent()}</button>
      {calendarMode === CalendarMode.View ? (
        <ViewAvailability
          availabilities={availabilities}
          endDate={endDate!}
          startDate={startDate!}
        />
      ) : (
        <SetAvailability
          availabilities={availabilities}
          endDate={endDate!}
          onSuccess={onSetAvailabilitySuccess}
          startDate={startDate!}
        />
      )}
    </div>
  );
};

export default Meeting;
