import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserNameFromCookie } from "../utilities/cookie";

export type UserContextType = {
  username: string;
};

const UserContext = createContext<UserContextType>({
  username: "",
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [username, setUsername] = useState("");
  const { meetingId } = useParams();

  useEffect(() => {
    const handleCookieChange = () => {
      if (meetingId) {
        const newUsername = getUserNameFromCookie(meetingId);
        setUsername(newUsername);
      }
    };

    // Initial username check
    handleCookieChange();

    document.addEventListener("cookie-changed", handleCookieChange);
    return () =>
      document.removeEventListener("cookie-changed", handleCookieChange);
  }, [meetingId]);

  const state = useMemo(
    () => ({
      username,
    }),
    [username]
  );

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
