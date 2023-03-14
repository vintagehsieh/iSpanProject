import { createStore } from "vuex";
import album from "./music/album";
import artist from "./music/artist";
import creator from "./music/creator";
import playlist from "./music/playlist";
import main from "./music/main";
import queue from "./music/queue";
import SongGenres from "./music/songGenres";
import Login from "./login/login";

const loginModule = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Login,
  },
};

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
    creator,
    playlist,
    main,
    queue,
    SongGenres,
    library,
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
  modules: {shop},
  
};

export default createStore({
  modules: {
    login: loginModule,
    home: homeModule,
    music: musicModule,
    activity: activityModule,
    shop: shopModule,
  },
});
