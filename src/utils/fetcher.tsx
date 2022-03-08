interface FetcherArgs {
  endpoint: string;
  options?: any;
}

export const fetcher = async ({endpoint, options}: FetcherArgs) => {
  const res = await fetch(endpoint, options);

  const data = await res.json();
  return data;
};
