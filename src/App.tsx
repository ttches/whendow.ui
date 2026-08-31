import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AnimatedBackground from "./Components/AnimatedBackground";
import Router from "./Router";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AnimatedBackground />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
