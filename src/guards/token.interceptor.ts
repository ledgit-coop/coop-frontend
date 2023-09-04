import { computed } from 'vue';
import apiClient from '@/http-common';
import TokenService from '@/service/TokenService';
import AuthService from '@/service/AuthService';

import { RESPONSE_UNAUTHORIZED } from '@/constants';

import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Store } from 'vuex';
import { API_PUBLIC_ROUTES } from '@/constants/api-routes';

const setup = (store: Store<any>) => {
  apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = TokenService.getAuthToken();
      const isLoggedIn = computed(() => store.getters('auth/token'));
      if (config.headers && isLoggedIn) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    (res: AxiosResponse) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      // Added false in the condition to disable refresh token temporarily
      // TODO: remove refreshTokenEnabled in the condition to enable refresh access token
      const refreshTokenEnabled = false;
      if (!API_PUBLIC_ROUTES.includes(originalConfig.url) && err.response) {
        // Access Token was expired
        if (err.response.status === RESPONSE_UNAUTHORIZED && !originalConfig._retry) {
          originalConfig._retry = true;
          if (refreshTokenEnabled) {
            try {
              const { data } = await AuthService.refreshToken({
                refreshToken: TokenService.getRefreshToken(),
              });

              TokenService.setAuthToken(data.token);
              store.commit('auth/refreshToken', data.token);

              return apiClient(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
          return AuthService.logout(false);
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
