import { createStore } from "vuex";
import album from "./music/album";
import artist from "./music/artist";
import creator from "./music/creator";

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
    album,
    artist,
    creator
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
