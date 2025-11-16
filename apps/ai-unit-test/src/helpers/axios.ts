import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const client: AxiosInstance = (() =>
  axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 20000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Authorization',
    },
  }))();

export const headers = (): AxiosRequestConfig | undefined => {
  const accessToken = Cookies.get('access_token');

  if (accessToken) {
    return {
      headers: {
        Authorization: accessToken,
      },
    };
  }
};

export const api = {
  get: <T = unknown>(url: string, params?: AxiosRequestConfig) =>
    client.get<T>(url, { ...params, ...headers() }),
  post: <T = unknown>(url: string, data?: unknown) =>
    client.post<T>(url, data, headers()),
  patch: <T = unknown>(url: string, data?: unknown) =>
    client.patch<T>(url, data, headers()),
  delete: <T = unknown>(url: string) => client.delete<T>(url, headers()),
};


