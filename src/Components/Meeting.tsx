import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SetAvailability from "./SetAvailability";
import useGetMeetingById from "../api/queries/getMeetingById";
import useAvailabilitiesByMeetingId from "../api/queries/getAvailabilitiesByMeetingId";
import ViewAvailability from "./ViewAvailability";
import SelectWinningDates from "./SelectWinningDates";
import LockedMeeting from "./LockedMeeting";
import useUsername from "../hooks/useUsername";

enum CalendarMode {
  View = "view",
  SetAvailability = "setAvailability",
  SelectWinners = "selectWinners",
}

const MeetingName = styled.h1`
  color: #e8e2f4;
  font-family: "copasetic";
  font-size: 36px;
  margin: 16px 0;
  text-align: center;
`;

const Meeting = () => {
  const [calendarMode, setCalendarMode] = useState(CalendarMode.View);
  const meetingId = useParams().meetingId!;
  const { data: meeting, isLoading } = useGetMeetingById({ id: meetingId });
  const { data: availabilities = [] } = useAvailabilitiesByMeetingId(meetingId);
  const usernameFromCookie = useUsername();

  const { name, startDate, endDate, owner, locked, winningDates } = meeting || {};
  const isOwner = Boolean(owner) && owner === usernameFromCookie;

  const onSetAvailabilitySuccess = () => {
    setCalendarMode(CalendarMode.View);
  };

  const toggleCalendarMode = () => {
    if (calendarMode === CalendarMode.SelectWinners) {
      setCalendarMode(CalendarMode.View);
      return;
    }

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
    </div>
  );
};

export default Meeting;
