import { useNavigate, useParams } from "react-router-dom";
import { BASE } from "../Router";

const Meeting = () => {
  const meetingId = useParams().meetingId!;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Meeting {meetingId}</h1>
      <button onClick={() => navigate(`${BASE}/set-availability/${meetingId}`)}>
        Set Availability
      </button>
    </div>
  );
};

export default Meeting;
