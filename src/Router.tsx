import { Route, BrowserRouter, Routes, useParams } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import Meeting from "./Components/Meeting";
import SetAvailability from "./Components/SetAvailability";
import GetAWord from "./Components/GetAWord";

export const BASE = `/whendow.ui`;

const AppRouter = () => {
  const params = useParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${BASE}/create-meeting`} element={<CreateMeeting />} />
        <Route
          path={`${BASE}/set-availability/:meetingId`}
          element={
            <SetAvailability
              meetingName={params.meetingId!}
              startDate="2024/09/12"
            />
          }
        />
        <Route path={`${BASE}/meeting/:meetingId`} element={<Meeting />} />
        <Route path={`${BASE}/get-a-word`} element={<GetAWord />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
