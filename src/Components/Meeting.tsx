import { useState } from "react";
import { useParams } from "react-router-dom";
import SetAvailability from "./SetAvailability";
import useGetMeetingById from "../api/queries/getMeetingById";
import useAvailabilitiesByMeetingId from "../api/queries/getAvailabilitiesByMeetingId";
import ViewAvailability from "./ViewAvailability";
import SelectWinningDates from "./SelectWinningDates";
import LockedMeeting from "./LockedMeeting";
import LoginFlow from "./LoginFlow";
import useUsername from "../hooks/useUsername";
import { MeetingName } from "./Meeting.styles";

enum CalendarMode {
  View = "view",
  SetAvailability = "setAvailability",
  SelectWinners = "selectWinners",
}

const Meeting = () => {
  const [calendarMode, setCalendarMode] = useState(CalendarMode.View);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const meetingId = useParams().meetingId!;
  const { data: meeting, isLoading } = useGetMeetingById({ id: meetingId });
  const { data: availabilities = [] } = useAvailabilitiesByMeetingId(meetingId);
  const usernameFromCookie = useUsername();

  const { name, startDate, endDate, owner, locked, winningDates } = meeting || {};
  const isLoggedIn = Boolean(usernameFromCookie);
  const isOwner = Boolean(owner) && owner === usernameFromCookie;

  const onSetAvailabilitySuccess = () => {
    setCalendarMode(CalendarMode.View);
  };

  const toggleCalendarMode = () => {
    if (calendarMode !== CalendarMode.View) {
      setCalendarMode(CalendarMode.View);
      return;
    }

    if (!isLoggedIn) {
      setIsLoggingIn(true);
      return;
    }

    setCalendarMode(CalendarMode.SetAvailability);
  };

  const getButtonContent = () => {
    switch (calendarMode) {
      case CalendarMode.SetAvailability:
        return "View Availability";
      case CalendarMode.SelectWinners:
        return "Cancel";
      case CalendarMode.View:
        return "Set Availability";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MeetingName>{name}</MeetingName>
      {locked ? (
        <LockedMeeting
          availabilities={availabilities}
          endDate={endDate!}
          isOwner={isOwner}
          meetingId={meetingId}
          startDate={startDate!}
          winningDates={winningDates || []}
        />
      ) : (
        <>
          <button onClick={() => toggleCalendarMode()}>{getButtonContent()}</button>
          {isOwner && calendarMode === CalendarMode.View && (
            <button onClick={() => setCalendarMode(CalendarMode.SelectWinners)}>
              Pick Winning Date(s)
            </button>
          )}
          {calendarMode === CalendarMode.View && (
            <ViewAvailability
              availabilities={availabilities}
              endDate={endDate!}
              startDate={startDate!}
            />
          )}
          {calendarMode === CalendarMode.SetAvailability && (
            <SetAvailability
              availabilities={availabilities}
              endDate={endDate!}
              onSuccess={onSetAvailabilitySuccess}
              startDate={startDate!}
            />
          )}
          {calendarMode === CalendarMode.SelectWinners && (
            <SelectWinningDates
              availabilities={availabilities}
              endDate={endDate!}
              meetingId={meetingId}
              onSuccess={() => setCalendarMode(CalendarMode.View)}
              startDate={startDate!}
            />
          )}
        </>
      )}
      {isLoggingIn && (
        <LoginFlow
          availabilities={availabilities}
          meetingId={meetingId}
          onClose={() => setIsLoggingIn(false)}
        />
      )}
    </div>
  );
};

export default Meeting;
