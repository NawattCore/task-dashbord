import axios from 'axios';
import { getSession } from 'next-auth/react';

const authApi = axios.create({
  baseURL: 'https://server.callva.net/api/',
});

authApi.interceptors.request.use(async config => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

export default authApi;
