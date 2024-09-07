const createGraphqlClient = (url: string) => {
  const request = async (
    query: string,
    variables: { [key: string]: string } = {}
  ) => {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
  };

  return { request };
};

const client = createGraphqlClient("http://localhost:5045/graphql/");
const { request } = client;

export { request };
