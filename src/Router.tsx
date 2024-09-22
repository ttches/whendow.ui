import { Route, Routes, useParams, HashRouter } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import Meeting from "./Components/Meeting";
import SetAvailability from "./Components/SetAvailability";
import GetAWord from "./Components/GetAWord";

const AppRouter = () => {
  const params = useParams();
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<CreateMeeting />} />
        <Route
          path={`/set-availability/:meetingId`}
          element={
            <SetAvailability
              meetingName={params.meetingId!}
              startDate="2024/09/12"
            />
          }
        />
        <Route path={`/meeting/:meetingId`} element={<Meeting />} />
        <Route path={`/get-a-word`} element={<GetAWord />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
