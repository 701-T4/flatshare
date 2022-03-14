import { getAuth } from 'firebase/auth';
import { useCallback } from 'react';
import useSWR from 'swr';
import { paths } from '../types/api-schema';

interface UseApiArgs<
  TUrl extends keyof paths,
  TMethod extends keyof paths[TUrl],
  TBodyContentType extends string = 'application/json',
  TResponseContentType extends string = 'application/json',
> {
  /** The method, i.e. GET, POST */
  method?: TMethod;
  /** The body of the request */
  // @ts-ignore
  body?: paths[TUrl][TMethod]['requestBody']['content'][TBodyContentType];
  /** Headers to pass onto the request, note Authorization is set by default, as
   * is Content-Type to json. */
  headers?: { [key: string]: string };
  /** Query parameters to pass onto the request, to avoid having to manually add
   * to the url. */
  queryParams?: { [key: string]: string | number };
  /** How to parse the response. Will by default parse as json. */
  parser?: (res: Response) => Promise<any>;
  /** Path arguments, i.e. /api/{id}, id is a path parameter. They should be
   * passed in the same order as declared in the URL. */
  pathParams?: ObjectFromUnion<
    AsUnion<RemoveNonVariable<SplitLiteral<TUrl, '/'>>>,
    string | number
  >;
  /** The content type of the body. */
  bodyContentType?: TBodyContentType;
  /** The content type of the response */
  responseContentType?: TResponseContentType;
}

/**
 * Make a request to our API. Do not manually use the type parameters, they are
 * used internally and should be implicitly generated based on your arguments.
 *
 * See {@link useUntypedApi} if the type system is causing issues.
 *
 * @param url the url to the api, i.e. /api/v1/ping
 * @param options the options to pass to the request
 * @returns the response from the api. If data is undefined, but there is no
 * error, then it is loading.
 *
 * @example const {data, error} = useApi("/api/v1/ping", {method: "GET"});
 */
export const useApi = <
  TUrl extends keyof paths,
  TMethod extends keyof paths[TUrl],
  TBodyContentType extends string = 'application/json',
  TResponseContentType extends string = 'application/json',
>(
  url: TUrl,
  {
    method,
    parser = (res) => res.json(),
    pathParams,
    ...options
  }: UseApiArgs<TUrl, TMethod, TBodyContentType, TResponseContentType> = {},
) => {
  const { data, error, ...rest } = useSWR<
    // @ts-ignore
    paths[TUrl][TMethod]['responses'][200]['content'][TResponseContentType],
    any
  >(
    substitutePathParams(url, pathParams),
    fetcher({ method, parser, ...options }),
  );
  const loading = !data && !error;

  return { data, error, ...rest, loading };
};

export const useApiMutation = <
  TUrl extends keyof paths,
  TMethod extends keyof paths[TUrl],
  TBodyContentType extends string = 'application/json',
  TResponseContentType extends string = 'application/json',
>(
  url: TUrl,
  {
    method,
    parser = (res) => res.json(),
    pathParams,
    ...options
  }: UseApiArgs<TUrl, TMethod, TBodyContentType, TResponseContentType> = {},
) => {
  const fn = useCallback(
    ({
      pathParams,
      ...newOptions
    }: UseApiArgs<TUrl, TMethod, TBodyContentType, TResponseContentType>) => {
      const newBody = JSON.stringify(newOptions.body ?? options.body ?? {});
      return fetcher({
        method,
        parser,
        ...{ ...options, ...newOptions },
        body: newBody,
      })(substitutePathParams(url, pathParams));
    },
    [method, options, parser, url],
  );

  return fn;
};

export const getUrl = (url: string) => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return process.env.REACT_APP_ENDPOINT + url;
};

/**
 * A request to our API that does not attempt to do any type manipulations.
 *
 * @param url the url to the api, i.e. /api/v1/ping
 * @param options the options to pass to the request
 * @returns the response from the api. If data is undefined, but there is no
 * error, then it is loading.
 */
export const useUntypedApi = (
  url: string,
  { parser, pathParams, method, ...options }: UseApiArgs<any, any, any, any>,
) => {
  const { data, error, ...rest } = useSWR(
    substitutePathParams(url, pathParams),
    fetcher({ method, parser, ...options }),
  );
  const loading = !data && !error;

  return { data, error, ...rest, loading };
};

/**
 * Take a URL with path parameters, like /api/vi/{id}, and substitute the path
 * parameters with the params record.
 *
 * @example substitutePathParams("/api/{id}", {id: 3}) // => "/api/3"
 */
export const substitutePathParams = (
  url: string,
  params?: Record<string, number | string>,
) => {
  const regex = /\{.*?\}/g;
  let urlCopy = url;

  let match = regex.exec(url);
  while (match !== null) {
    const sub = params?.[match[0].slice(1, -1)];
    if (!sub) {
      throw new Error(`No path parameter found for ${match[0]}`);
    }
    urlCopy = urlCopy.replace(match[0], sub.toString());
    match = regex.exec(url);
  }

  return urlCopy;
};

const fetcher = ({
  headers,
  method,
  body,
  queryParams,
  parser,
  bodyContentType,
}: UseApiArgs<any, any, any, any>) => {
  return async (url: string) => {
    const currentUser = getAuth().currentUser;

    const Authorization = currentUser
      ? 'Bearer ' + (await currentUser.getIdToken())
      : '';

    const request = new URL(getUrl(url));
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        request.searchParams.append(key, queryParams[key].toString());
      });
    }

    const result = await fetch(request.toString(), {
      method,
      body,
      headers: {
        Authorization,
        'Content-Type': bodyContentType ?? 'application/json',
        ...headers,
      },
    });
    return await parser?.(result);
  };
};

/**
 * These types are used to produce type hinting for path parameters in the API.
 * For example, with the api call /api/v1/{id}/{name}, the path parameters would
 * be {id} and {name}. These types allow for the pathParams input object to be
 * type hinted with an object of {id: number | string, name: number|string}.
 *
 * The general flow is this:
 * 0. Get the URL as a literal type => "/api/v1/{id}/{name}"
 * 1. Extract parts of the URL into a tuple => ["api", "v1", "{id}", "{name}"]
 * 2. Extract the path parameters from the components => ["{id}", "{name}"]
 * 3. Convert this tuple into a union => "id" | "name"
 * 4. Create an object with the union as the key and string | number as the
 *    parameter
 */

/**
 * Will split a string literal type (TArg 1) into a tuple of string literals
 * split by (TArg 2)
 */
type SplitLiteral<
  TString extends string,
  TDelimiter extends string,
> = string extends TString
  ? string[]
  : TString extends ''
  ? []
  : TString extends `${infer TStart}${TDelimiter}${infer TEnd}`
  ? [TStart, ...SplitLiteral<TEnd, TDelimiter>]
  : [TString];

/**
 * Will remove any literals from the literal array that are not the pattern of a
 * path parameter.
 *
 * For example, ["api", "v1", "user", "{id}", "{game}", "results"] has the path
 * parameters "{id}" and "{game}". This type will turn the example input into
 * ["game", "id"] (removing the braces).
 */
type RemoveNonVariable<TLiterals extends unknown[]> = TLiterals extends []
  ? []
  : TLiterals extends [infer THead, ...infer TRest]
  ? THead extends `{${infer T}}`
    ? [T, ...RemoveNonVariable<TRest>]
    : RemoveNonVariable<TRest>
  : TLiterals;

/**
 * Will convert a tuple of literals to a union, for example, ["api", "v1"] will
 * become "api | v1".
 */
type AsUnion<T extends string[]> = T[number];

/**
 * Will convert a literal union to an object whose keys are from that union.
 */
type ObjectFromUnion<TUnion extends string, TValue = string | number> = {
  [K in TUnion]: TValue;
};
