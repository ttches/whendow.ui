import { useNavigate, useParams } from "react-router-dom";

const Meeting = () => {
  const meetingId = useParams().meetingId!;
  const navigate = useNavigate();

  return (
    <div>
      <h1>Meeting {meetingId}</h1>
      <button onClick={() => navigate(`/set-availability/${meetingId}`)}>
        Set Availability
      </button>
    </div>
  );
};

export default Meeting;
