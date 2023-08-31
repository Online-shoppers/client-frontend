import axios, { InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_KEY } from 'app/auth/constants';

import i18n from 'i18n';

import storage from 'storage/client';

const { REACT_APP_API_URL } = process.env;

const repository = axios.create({
  baseURL: REACT_APP_API_URL,
});

repository.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = storage.get(ACCESS_TOKEN_KEY);

    if (accessToken && config?.headers) {
      config.headers['x-lang'] = i18n.language;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
);

export default repository;
