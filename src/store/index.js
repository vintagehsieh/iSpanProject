import { createStore } from "vuex";
import MusicSide from "./music/musicSide/musicSide";
import MusicMain from "./music/musicMain/musicMain";

const homeModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

const musicModule = {
  state: {
    albumId: 0,
  },
  getters: {
    getAlbumId(state) {
      return state.albumId;
    }
  },
  mutations: {
    setAlbumId(state, payload) {
      state.albumId = payload;
    },
  },
  actions: {
    setAlbumId({ commit }, id) {
      commit("setAlbumId", id);
    },
  },
  modules: {
    // MusicSide,
    //MusicMain
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
