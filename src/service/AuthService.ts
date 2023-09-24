import { PUBLIC_ROUTES, ROUTE_PATH_LOGIN } from '@/constants';
import {
  API_ROUTE_LOGIN,
  API_ROUTE_LOGOUT,
  API_ROUTE_PASSWORD_RESET,
  API_ROUTE_PASSWORD_RESET_REQUEST,
} from '@/constants/api-routes';
import apiClient from '@/http-common';
import TokenService from '@/service/TokenService';
import type { AxiosPromise } from 'axios';
import type { RouteLocationNormalized } from 'vue-router';

class AuthService {
  getRegisterDropdowns() {
    return apiClient.get('/auth/register/dropdowns');
  }

  register(payload?: Record<string, any>): AxiosPromise {
    return apiClient.post('/auth/register', payload);
  }

  async login(payload?: Record<string, any>): AxiosPromise {
    await apiClient.get('/sanctum/csrf-cookie');
    return apiClient.post(API_ROUTE_LOGIN, {
      device_name: 'spa-coop-web',
      ...payload,
    });
  }

  logout(api_call: boolean = true): void {
    if (api_call)
      apiClient.post(API_ROUTE_LOGOUT).finally(() => {
        this.clearAuth();
      });
    else this.clearAuth();
  }

  clearAuth() {
    TokenService.removeAuthUser();
    window.location.replace(ROUTE_PATH_LOGIN);
  }

  refreshToken(payload?: Record<string, any>): AxiosPromise {
    return apiClient.post('/auth/refresh-token', payload);
  }

  me() {
    return apiClient.get('/auth/me');
  }

  getNewVerificationLink(payload: Record<string, string>): AxiosPromise {
    return apiClient.post('/auth/request-new-verification-link', payload);
  }

  validateEmailVerificationLink(link: string): AxiosPromise {
    return apiClient.get(link.replace(' ', '+'));
  }

  validatePasswordResetLink(link: string): AxiosPromise {
    return apiClient.get(link.replace(' ', '+'));
  }

  requestPasswordReset(payload?: Record<string, any>): AxiosPromise {
    return apiClient.post(API_ROUTE_PASSWORD_RESET_REQUEST, {
      ...payload,
    });
  }

  resetPassword(payload?: Record<string, any>): AxiosPromise {
    return apiClient.post(API_ROUTE_PASSWORD_RESET, {
      ...payload,
    });
  }

  setCookie = (cvalue: string) => {
    const expiryDate = new Date();
    const days = 60;
    expiryDate.setDate(expiryDate.getDate() + days);
    document.cookie = 'email=' + cvalue + ';expires=' + expiryDate.toUTCString() + ';path=/';
  };

  getCookie = (cname: string) => {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  checkCookie = (cname: string) => {
    const cval = this.getCookie(cname);
    return cval != '';
  };

  isAuthenticated(): boolean {
    const token = TokenService.getAuthToken();
    const user = TokenService.getAuthUser();
    return token !== null && user !== null;
  }

  canAccess(to: RouteLocationNormalized): boolean {
    // make sure the user is authenticated
    return (
      this.isAuthenticated() ||
      // ❗️ Avoid an infinite redirect
      PUBLIC_ROUTES.includes(<string>to.name)
    );
  }

  canAccessPage(): boolean {
    return true;
  }
}
export default new AuthService();
