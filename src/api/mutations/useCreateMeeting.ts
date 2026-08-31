import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../gql";
import { GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY } from "../queries/getAvailabilitiesByMeetingId";

type CreateMeetingInput = {
  endDate: string;
  name: string;
  owner: string;
  startDate: string;
};

type CreateMeetingResponse = {
  data: {
    createMeeting: MeetingFromResponse;
  };
};

export type MeetingFromResponse = {
  endDate: string;
  locked: boolean;
  name: string;
  owner: string;
  startDate: string;
  createdAt: string;
  id: string;
};

const query = `mutation createMeeting($input: CreateMeetingInput!) {
  createMeeting(input: $input) {
    endDate
    locked
    name
    owner
    startDate
    createdAt
    id
  }
}`;

const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateMeetingInput) =>
      request<CreateMeetingResponse>(query, { input }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY],
      });
    },
  });
};

export default useCreateMeeting;
