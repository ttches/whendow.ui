import { useQuery } from "@tanstack/react-query";
import { request } from "../gql";
import { formatDate } from "../../utilities/dates";

type GetMeetingByIdInput = {
  id: string;
};

export type Meeting = {
  createdAt: string;
  endDate: string;
  id: string;
  name: string;
  owner: string;
  startDate: string;
  winningDates: string[];
};

type GetMeetingByIdResponse = {
  data: {
    meetingById: Meeting;
  };
};

const query = `query getMeetingById($input: GetMeetingByIdInput!) {
  meetingById(input: $input) {
    name
    endDate
    startDate
    owner
    winningDates
  }
}`;

export const GET_MEETING_BY_ID_QUERY_KEY = "GET_MEETING_BY_ID";

const useGetMeetingById = (input: GetMeetingByIdInput) => {
  return useQuery({
    queryKey: [GET_MEETING_BY_ID_QUERY_KEY, input.id],
    queryFn: async () => {
      return request<GetMeetingByIdResponse>(query, { input });
    },
    select: (data) => ({
      ...data.data.meetingById,
      startDate: formatDate(data.data.meetingById.startDate),
      endDate: formatDate(data.data.meetingById.endDate),
    }),
  });
};

export default useGetMeetingById;
