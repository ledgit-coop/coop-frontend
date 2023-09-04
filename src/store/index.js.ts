import { createStore } from 'vuex';
import auth from './auth.module';
import type { AuthState } from './auth.module';

interface StoreState {
  auth: AuthState;
}

const store = createStore<StoreState>({
  modules: {
    auth,
  },
});

export default store;
