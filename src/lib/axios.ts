import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { auth } from '@/lib/auth';
import {
  AvailableMethods,
  FetchOptions,
  HttpMethod,
  Path,
  SuccessResponse,
} from '@/types/custom-fetch';

// Prefer configured API URL, otherwise fall back to same-origin.
// On Vercel server, we can also derive origin from VERCEL_URL (no protocol).
const resolveBaseURL = (isServer: boolean): string => {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (configured) return configured;
  if (isServer) {
    const vercelUrl = process.env.VERCEL_URL?.trim();
    if (vercelUrl) return `https://${vercelUrl}`;
    return '';
  }
  if (typeof window !== 'undefined') {
    try {
      return window.location.origin;
    } catch {
      return '';
    }
  }
  return '';
};

// Client-side API client
export const createClientApi = (): AxiosInstance => {
  const authApi = axios.create({
    baseURL: resolveBaseURL(false),
    headers: { 'Content-Type': 'application/json' },
  });

  authApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const { getSession } = await import('next-auth/react');
      const session = await getSession();
      if (session?.accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    },
  );

  return authApi;
};

// Server-side API client
export const createServerApi = async (): Promise<AxiosInstance> => {
  const authApi = axios.create({
    baseURL: resolveBaseURL(true),
    headers: { 'Content-Type': 'application/json' },
  });

  const session = await auth();
  if (session?.accessToken) {
    authApi.interceptors.request.use(config => {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${session.accessToken}`;
      return config;
    });
  }

  return authApi;
};

// Strictly typed fetch function with all fixes
export const customFetch = async <P extends Path, M extends HttpMethod>(
  url: P,
  options: M extends AvailableMethods<P> ? FetchOptions<P, M> : never,
  isServer: boolean = false,
): Promise<AxiosResponse<SuccessResponse<P, M>>> => {
  const api = isServer ? await createServerApi() : createClientApi();

  let finalUrl = url as string;
  if ('path' in options && options.path) {
    Object.entries(options.path).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`{${key}}`, String(value));
    });
  }

  return api({
    url: finalUrl,
    method: options.method,
    data: 'data' in options ? options.data : undefined,
    params: 'params' in options ? options.params : undefined,
    headers: options.headers,
  });
};
