import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import Meeting from "./Components/Meeting";
import GetAWord from "./Components/GetAWord";
import LandingTwo from "./Components/Landing/LandingTwo";
import Homepage from "./Components/Homepage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Homepage />} />
        <Route path={`/page2`} element={<LandingTwo />} />
        <Route path={`/create`} element={<CreateMeeting />} />
        <Route path={`/meeting/:meetingId`} element={<Meeting />} />
        <Route path={`/get-a-word`} element={<GetAWord />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
