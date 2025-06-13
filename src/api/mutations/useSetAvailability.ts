import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../gql";
import {
  GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY,
  MeetingAvailability,
} from "../queries/getAvailabilitiesByMeetingId";
import {
  storeUserDataForDevelopment,
  getUsername,
} from "../../utilities/cookie";

type SetAvailabilityInput = {
  meetingId: string;
  dates: string[];
};

type SetAvailabilityResponse = {
  data: {
    setAvailability: MeetingAvailability[];
  };
};

const mutation = `mutation setAvailability($input: SetAvailabilityInput!) {
  setAvailability(input: $input) {
    id
    meetingId
    date
  }
}`;

const useSetAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SetAvailabilityInput) =>
      request<SetAvailabilityResponse>(mutation, { input }),
    onSuccess: (_, variables) => {
      const currentUsername = getUsername(variables.meetingId);
      if (currentUsername) {
        storeUserDataForDevelopment(variables.meetingId, currentUsername);
      }
      queryClient.invalidateQueries({
        queryKey: [
          GET_AVAILABILITY_BY_MEETING_ID_QUERY_KEY,
          variables.meetingId,
        ],
      });
    },
  });
};

export default useSetAvailability;
