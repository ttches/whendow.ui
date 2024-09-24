import { useState } from "react";
import { useParams } from "react-router-dom";
import SetAvailability from "./SetAvailability";

const Meeting = () => {
  const [showModal, setShowModal] = useState(false);

  const meetingId = useParams().meetingId!;

  const handleSubmit = () => setShowModal(false);

  return (
    <div>
      <h1>{meetingId}</h1>
      <button onClick={() => setShowModal(true)}>Set Availability</button>
      {showModal && (
        <SetAvailability
          onSubmit={handleSubmit}
          meetingName={meetingId}
          startDate="2024/09/12"
        />
      )}
    </div>
  );
};

export default Meeting;
