import { paths } from '../../api-schema/schema';

export type Path = keyof paths;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

// Extract available methods for a path
export type AvailableMethods<P extends Path> = {
  [M in HttpMethod]: paths[P][M] extends { responses: object } ? M : never;
}[HttpMethod];

// Enhanced type to extract required path parameters
export type StrictPathParams<
  P extends Path,
  M extends HttpMethod,
> = paths[P][M] extends { parameters: { path: infer PathParams } }
  ? PathParams extends Record<string, never>
    ? never
    : PathParams
  : never;

// Enhanced request body type
export type StrictRequestBody<
  P extends Path,
  M extends HttpMethod,
> = paths[P][M] extends {
  requestBody: { content: { 'application/json': infer D } };
}
  ? D
  : never;

// Enhanced query parameters type
export type StrictQueryParams<
  P extends Path,
  M extends HttpMethod,
> = paths[P][M] extends { parameters: { query: infer Q } } ? Q : never;

// Response type
export type SuccessResponse<
  P extends Path,
  M extends HttpMethod,
> = paths[P][M] extends {
  responses: { 200: { content: { 'application/json': infer R } } };
}
  ? R
  : paths[P][M] extends {
        responses: { 201: { content: { 'application/json': infer R } } };
      }
    ? R
    : never;

// Modified to require data when endpoint expects it
export type FetchOptions<P extends Path, M extends HttpMethod> =
  StrictPathParams<P, M> extends never
    ? StrictRequestBody<P, M> extends never
      ? {
          method: M;
          data?: never;
          params?: StrictQueryParams<P, M>;
          headers?: Record<string, string>;
        }
      : {
          method: M;
          data: StrictRequestBody<P, M>; // Now required
          params?: StrictQueryParams<P, M>;
          headers?: Record<string, string>;
        }
    : StrictRequestBody<P, M> extends never
      ? {
          method: M;
          path: StrictPathParams<P, M>;
          data?: never;
          params?: StrictQueryParams<P, M>;
          headers?: Record<string, string>;
        }
      : {
          method: M;
          path: StrictPathParams<P, M>;
          data: StrictRequestBody<P, M>; // Now required
          params?: StrictQueryParams<P, M>;
          headers?: Record<string, string>;
        };
