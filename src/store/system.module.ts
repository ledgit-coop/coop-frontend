export interface SystemState {
  isMaintenance: boolean;
}

export default {
  namespaced: true,
  state: {},
  mutations: {
    setIsMaintenance(state: SystemState, value: boolean) {
      state.isMaintenance = value;
    },
  },
  getters: {
    isMaintenance: (state: SystemState) => state.isMaintenance,
  },
};
