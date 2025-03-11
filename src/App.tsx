import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Router from "./Router";
import UserProvider from "./context/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </UserProvider>
    </>
  );
}

export default App;
