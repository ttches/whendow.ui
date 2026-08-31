import { useParams } from "react-router-dom";
import { getUserNameFromCookie } from "../utilities/cookie";

export const useUsername = () => {
  const { meetingId } = useParams();
  return meetingId ? getUserNameFromCookie(meetingId) : "";
};

export default useUsername;
