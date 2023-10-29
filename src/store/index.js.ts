import { createStore } from 'vuex';
import auth from './auth.module';
import system from './system.module';
import formSubmit, { type FormSubmitState } from './form-submit.module';
import type { AuthState } from './auth.module';
import type { SystemState } from './system.module';

interface StoreState {
  auth: AuthState;
  system: SystemState;
  formSubmit: FormSubmitState;
}

const store = createStore<StoreState>({
  modules: {
    auth,
    formSubmit,
    system,
  },
});

export default store;
