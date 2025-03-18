const getCookie = (cookieName: string) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";").map((cookie) => cookie.split("="));
  const target = cookies.find(([name]) => name.trim() === cookieName);
  return target?.[1];
};

const getUserNameFromCookie = (meetingId: string) => {
  const cookieName = `when-${meetingId}`;
  const cookie = getCookie(cookieName) || "";
  const decodedCookie = atob(decodeURIComponent(cookie));

  console.log("decodedCookie", decodedCookie);
  return decodedCookie.split(":")[0];
};

export { getCookie, getUserNameFromCookie };
