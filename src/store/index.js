import { createStore } from "vuex";
// import MusicSide from "./music/musicSide/musicSide";

const homeModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

const musicModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    // MusicSide,
  },
};

const activityModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

const shopModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

export default createStore({
  modules: {
    home: homeModule,
    music: musicModule,
    activity: activityModule,
    shop: shopModule,
  },
});
