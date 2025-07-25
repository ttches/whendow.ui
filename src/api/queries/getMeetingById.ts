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
  locked: boolean;
  name: string;
  owner: string;
  startDate: string;
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
  }
}`;

const QUERY_KEY = "GET_MEETING_BY_ID";

const useGetMeetingById = (input: GetMeetingByIdInput) => {
  return useQuery({
    queryKey: [QUERY_KEY, input.id],
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
