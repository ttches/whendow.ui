const API_BASE = import.meta.env.VITE_API_BASE;

const createGraphqlClient = (url: string) => {
  const request = async <T>(
    query: string,
    variables: { [key: string]: string } = {}
  ): Promise<T> => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { input: variables } }),
    });

    return await res.json();
  };

  return { request };
};

const client = createGraphqlClient(`${API_BASE}/graphql/`);
const { request } = client;

export { request };
