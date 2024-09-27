import { useQuery } from "@tanstack/react-query";
import { request } from "../gql";

type GetMeetingByIdInput = {
  id: string;
};

type GetMeetingByIdResponse = {
  data: {
    meetingById: {
      name: string;
    };
  };
};

const query = `query getMeetingById($input: GetMeetingByIdInput!) {
  meetingById(input: $input) {
    name
  }
}`;

const useGetMeetingById = (input: GetMeetingByIdInput) => {
  return useQuery({
    queryKey: [input.id],
    queryFn: async () => {
      return request<GetMeetingByIdResponse>(query, input);
    },
    select: (data) => data.data.meetingById,
  });
};

export default useGetMeetingById;
