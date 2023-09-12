export interface FormSubmitState {
  [key: string]: {
    submitted: boolean;
    validated: {
      [key: string]: boolean;
    };
  };
}

export default {
  namespaced: true,
  state: {},
  mutations: {
    setSubmitted(state: FormSubmitState, { submitted, form }: { submitted: boolean; form: string }) {
      state[form] = {
        ...state[form],
        submitted,
      };
    },

    setChildValidation(
      state: FormSubmitState,
      { validated, form, parent }: { validated: boolean; form: string; parent: string }
    ) {
      state[parent] = {
        ...state[parent],
        validated: {
          [form]: validated,
        },
      };
    },
  },
  getters: {
    getSubmitted: (state: FormSubmitState) => state,
  },
};
