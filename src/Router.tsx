import { Route, Routes, HashRouter } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import Meeting from "./Components/Meeting";
import GetAWord from "./Components/GetAWord";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={`/`} element={<CreateMeeting />} />
        <Route path={`/meeting/:meetingId`} element={<Meeting />} />
        <Route path={`/get-a-word`} element={<GetAWord />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
