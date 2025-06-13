import { useMutation } from "@tanstack/react-query";
import { request } from "../gql";
import { storeUserDataForDevelopment } from "../../utilities/cookie";

type LoginInput = {
  username: string;
  passcode: string;
  meetingId: string;
};

type LoginResponse = {
  data: {
    login: {
      success: boolean;
      username?: string;
      error?: string;
    };
  };
};

const query = `mutation login($username: String!, $passcode: String!, $meetingId: UUID!) {
  login(username: $username, passcode: $passcode, meetingId: $meetingId) {
    success
    username
    error
  }
}`;

const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, passcode, meetingId }: LoginInput) =>
      request<LoginResponse>(query, { username, passcode, meetingId }),
    onSuccess: (data, variables) => {
      if (data.data.login.success && data.data.login.username) {
        storeUserDataForDevelopment(
          variables.meetingId,
          data.data.login.username
        );
      }
    },
  });
};

export default useLogin;
