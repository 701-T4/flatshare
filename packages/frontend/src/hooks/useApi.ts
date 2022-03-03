import useSWR from "swr";

interface UseApiArgs {
  /** The method, i.e. GET, POST */
  method?: string;
  /** The body of the request */
  body?: string;
  /** Headers to pass onto the request, note Authorization is set by default, as is Content-Type to json. */
  headers?: { [key: string]: string };
  /** Query parameters to pass onto the request, to avoid having to manually add to the url. */
  queryParams?: { [key: string]: string | number };
}

const fetcher = (
  { headers, method, body, queryParams }: UseApiArgs,
  bearer?: Promise<string>
) => {
  return async (url: string) => {
    const bearerValue = await bearer;

    const request = new URL(getUrl(url));
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        request.searchParams.append(key, queryParams[key].toString());
      });
    }

    return fetch(request.toString(), {
      method,
      body,
      headers: {
        Authorization: `Bearer ${bearerValue}`,
        "Content-Type": "application/json",
        ...headers,
      },
    }).then((r) => r.json());
  };
};

/**
 * Make a request to our API
 *
 * @param url the url to the api, i.e. /api/ping
 * @param options the options to pass to the request
 * @returns the response from the api. If data is undefined, but there is no error, then it is loading.
 *
 * @example const {data: pingData, error: pingError} = useApi("/api/ping", {method: "GET"});
 */
export const useApi = (
  url: string,
  { method = "GET", ...options }: UseApiArgs = {}
) => {
  const { data, error, ...rest } = useSWR(url, fetcher({ method, ...options }));
  const loading = !data && !error;

  return { data, error, ...rest, loading };
};

const getUrl = (url: string) => {
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  return process.env.REACT_APP_ENDPOINT + url;
};
