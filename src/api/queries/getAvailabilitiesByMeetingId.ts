import { useQuery } from "@tanstack/react-query";
import { request } from "../gql";
import { formatDate } from "../../utilities/dates";

const query = `query($meetingId: UUID!) {
  availabilityByMeetingId(meetingId: $meetingId) {
    date
    id
    meetingId
    userName
  }
}`;

export type MeetingAvailability = {
  date: string;
  id: number;
  meetingId: string;
  userName: string;
};

type GetAvailabilityByMeetingIdResponse = {
  data: {
    availabilityByMeetingId: MeetingAvailability[];
  };
};

export const GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY =
  "GET_AVAILABILITY_BY_MEETING_ID";

const useAvailabilitiesByMeetingId = (meetingId: string) => {
  return useQuery({
    queryKey: [GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY, meetingId],
    queryFn: async () =>
      request<GetAvailabilityByMeetingIdResponse>(query, { meetingId }),
    select: (data) =>
      data.data.availabilityByMeetingId.map((availability) => ({
        ...availability,
        date: formatDate(availability.date),
      })),
  });
};

export default useAvailabilitiesByMeetingId;
