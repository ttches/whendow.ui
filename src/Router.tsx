import { Route, Routes } from "react-router-dom";
import CreateMeeting from "./Components/CreateMeeting";
import Markie from "./Components/Markie";
import Meeting from "./Components/Meeting";
import GetAWord from "./Components/GetAWord";
import LandingTwo from "./Components/Landing/LandingTwo";
import Homepage from "./Components/Homepage";
import CalendarShowcase from "./Components/CalendarShowcase";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Homepage />} />
      <Route path={`/page2`} element={<LandingTwo />} />
      <Route path={`/create`} element={<CreateMeeting />} />
      <Route path={`/meeting/:meetingId`} element={<Meeting />} />
      <Route path={`/get-a-word`} element={<GetAWord />} />
      <Route path={`/markie`} element={<Markie />} />
      <Route path={`/calendar-showcase`} element={<CalendarShowcase />} />
    </Routes>
  );
};

export default AppRouter;
