const API_BASE = import.meta.env.VITE_API_BASE;

const createGraphqlClient = (url: string) => {
  const request = async (
    query: string,
    variables: { [key: string]: string } = {}
  ) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
  };

  return { request };
};

const client = createGraphqlClient(`${API_BASE}/graphql/`);
const { request } = client;

export { request };
