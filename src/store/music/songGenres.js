import http from "@/plugins/http";

// count state 必須是 Object
const state = {
    SongGenres: {},
    category: {},
    songs: {}
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getSongGenre: state => state.SongGenres,
    getCategory: state => state.category,
    getGenreSongs: state => state.songs,
}

// actions 也是以 Object 形式建構。
const actions = {
    async loadData({ commit }) {
        const response = await http('https://localhost:7043/Songs/SongGenres');
        const responseSongGenres = await response.json();
        commit("setSongGenre", responseSongGenres);
    },
    setGenre({ commit }, category) {
        commit('setGenre', category);
    },
    async loadGenreSongData({ state, commit }) {
        const response = await http(`https://localhost:7043/Albums/SongGenres/${state.category.id}?rowNumber=2`);
        const responseSongs = await response.json();
        commit("setGenreSongs", responseSongs)
    }
}

// mutations
const mutations = {
    setSongGenre(state, payload) {
        state.SongGenres = payload;
    },
    setGenre(state, payload) {
        state.category = payload;
    },
    setGenreSongs(state, payload) {
        state.songs = payload;
    }
}

/*
  因為我們把 vuex 所有職權都寫在同一隻檔案，
  所以必須要 export 出去給最外層 index.js 組合使用
*/
export default {
    state,
    getters,
    actions,
    mutations
}