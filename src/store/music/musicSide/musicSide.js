import { createStore } from "vuex";

export default createStore({
  state: {
    isOpen: false,
  },
  getters: {
    isOpen(state) {
      return state.isOpen;
    },
  },
  mutations: {
    OpenState(state, payload) {
      state.isOpen = payload;
    },
  },
  actions: {
    handOpenState(context) {
      const isOpen = !context.state.isOpen;
      context.commit("OpenState", isOpen);
    },
  },
});
