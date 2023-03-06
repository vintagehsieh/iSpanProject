import { createStore } from "vuex";
import album from "./music/album";

const homeModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
};

const musicModule = {
  state: {
    // album: {},
    artist: {},
    creator: {},
  },
  getters: {
    // getAlbum(state) {
    //   return state.album;
    // },
    getArtist(state) {
      return state.artist;
    },
    getCreator(state) {
      return state.creator;
    }
  },
  mutations: {
    // setAlbum(state, payload) {
    //   state.album = payload;
    // },
    setArtist(state, payload) {
      state.artist = payload;
    },
    setCreator(state, payload) {
      state.creator = payload;
    },
  },
  actions: {
    // async setAlbum({ commit }, albumId) {
    //   const response = await fetch(`https://localhost:7043/Albums/${albumId}`);
    //   const responseAlbum = await response.json();
    //   commit("setAlbum", responseAlbum);
    // },
    async setArtist({ commit }, artistId) {
      const response = await fetch(`https://localhost:7043/Artists/${artistId}`);
      const responseArtist = await response.json();
      commit("setArtist", responseArtist);
    },
    async setCreator({ commit }, creatorId) {
      const response = await fetch(`https://localhost:7043/Creators/${creatorId}`);
      const responseCreator = await response.json();
      commit("setCreator", responseCreator);
    }
  },
  modules: {
    album
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
