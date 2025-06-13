import { useParams } from "react-router-dom";
import { getUsername } from "../utilities/cookie";

export const useUsername = () => {
  const { meetingId } = useParams();
  return meetingId ? getUsername(meetingId) : "";
};

export default useUsername;
