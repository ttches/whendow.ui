import { Route, BrowserRouter, Routes } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import SetAvailability from "./Components/SetAvailability";

const AppRouter = () => {
  const BASE = `/whendow.ui`;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${BASE}/create-meeting`} element={<CreateMeeting />} />
        <Route
          path={`${BASE}/set-availability/:meetingId`}
          element={<SetAvailability startDate="2024/09/12" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
