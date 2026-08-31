import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../gql";
import { GET_MEETING_BY_ID_QUERY_KEY } from "../queries/getMeetingById";

type LockMeetingInput = {
  meetingId: string;
  winningDates: string[];
};

type LockMeetingResponse = {
  data: {
    lockMeeting: {
      id: string;
      winningDates: string[];
    };
  };
};

const mutation = `mutation lockMeeting($input: LockMeetingInput!) {
  lockMeeting(input: $input) {
    id
    winningDates
  }
}`;

const useLockMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ meetingId, winningDates }: LockMeetingInput) =>
      request<LockMeetingResponse>(mutation, {
        input: { meetingId, winningDates },
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_MEETING_BY_ID_QUERY_KEY, variables.meetingId],
      });
    },
  });
};

export default useLockMeeting;
