const sanitizeUsername = (username: string = "") =>
  username.replace(/(\d+|\s|\W)/, "");

export default sanitizeUsername;
