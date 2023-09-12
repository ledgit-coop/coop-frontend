import { createStore } from 'vuex';
import auth from './auth.module';
import formSubmit, { type FormSubmitState } from './form-submit.module';
import type { AuthState } from './auth.module';

interface StoreState {
  auth: AuthState;
  formSubmit: FormSubmitState;
}

const store = createStore<StoreState>({
  modules: {
    auth,
    formSubmit,
  },
});

export default store;
