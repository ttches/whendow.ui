import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../gql";
import { GET_MEETING_BY_ID_QUERY_KEY } from "../queries/getMeetingById";

type UnlockMeetingInput = {
  meetingId: string;
};

type UnlockMeetingResponse = {
  data: {
    unlockMeeting: {
      id: string;
      locked: boolean;
      winningDates: string[];
    };
  };
};

const mutation = `mutation unlockMeeting($meetingId: UUID!) {
  unlockMeeting(meetingId: $meetingId) {
    id
    locked
    winningDates
  }
}`;

const useUnlockMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ meetingId }: UnlockMeetingInput) =>
      request<UnlockMeetingResponse>(mutation, { meetingId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_MEETING_BY_ID_QUERY_KEY, variables.meetingId],
      });
    },
  });
};

export default useUnlockMeeting;
