import { useMutation } from "@tanstack/react-query";
import { request } from "../gql";
import { useNavigate } from "react-router-dom";

type CreateMeetingInput = {
  endDate: string;
  name: string;
  owner: string;
  startDate: string;
};

type CreateMeetingResponse = {
  data: {
    createMeeting: {
      endDate: string;
      locked: boolean;
      name: string;
      owner: string;
      startDate: string;
      createdAt: string;
      id: string;
    };
  };
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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (input: CreateMeetingInput) =>
      request<CreateMeetingResponse>(query, input),
    onSuccess: (res) => {
      navigate(`/meeting/${res.data.createMeeting.id}`);
    },
  });
};

export default useCreateMeeting;
