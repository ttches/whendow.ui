import { request } from "../gql";

const query = `
  query {
    meetings {
      id
      owner
    }
  }
`;

const getMeetings = async () => {
  return await request(query);
};

export default getMeetings;
