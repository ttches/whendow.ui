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

const client = createGraphqlClient("http://157.230.173.18:7148/graphql/");
const { request } = client;

export { request };
