import TokenService from '@/service/TokenService';
import type { User } from '@/types/user';

export interface AuthState {
  user: User | null | undefined;
  isLoggedIn: boolean;
  token: string | null | undefined;
}
const authUser = TokenService.getAuthUser();
const authToken = TokenService.getAuthToken();

export default {
  namespaced: true,
  state: {
    user: authUser,
    token: authToken,
  },
  mutations: {
    loginSuccess(state: AuthState, { user, token }: { user: User; token: string }) {
      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
    },
    refreshToken(state: AuthState, authToken: string) {
      state.isLoggedIn = true;
      state.token = authToken;
    },
  },
  getters: {
    user: (state: AuthState) => state.user,
    token: (state: AuthState) => state.token,
    isLoggedIn: (state: AuthState) => state.isLoggedIn,
  },
};
