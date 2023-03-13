import http from "@/plugins/http";
// count state 必須是 Object
const state = {
    albums: {},
    playlists: {},
    artists: {},
    creators: {},
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getAlbums: state => state.albums,
    getPlaylists: state => state.playlists,
    getArtists: state => state.artists,
    getCreators: state => state.Creators,
}

// actions 也是以 Object 形式建構。
const actions = {
    async setAlbums({ commit }) {
        const response = await http(`https://localhost:7043/Members/LikedAlbums`);
        const responseAlbums = await response.json();
        commit("setAlbums", responseAlbums);
    },
    async setPlaylists({ commit }) {
        const response = await http(`https://localhost:7043/Members/Playlists`);
        const responsePlaylists = await response.json();
        commit("setPlaylists", responsePlaylists);
    },
    async setArtists({ commit }) {
        const response = await http(`https://localhost:7043/Members/LikedArtists`);
        const responseArtists = await response.json();
        commit("setArtists", responseArtists);
    },
    async setCreators({ commit }) {
        const response = await http(`https://localhost:7043/Members/LikedCreators`);
        const responseCreators = await response.json();
        commit("setCreators", responseCreators);
    },
}

// mutations
const mutations = {
    setAlbums(state, payload) {
        state.albums = payload;
    },
    setPlaylists(state, payload) {
        state.playlists = payload;
    },
    setArtists(state, payload) {
        state.artists = payload;
    },
    setCreators(state, payload) {
        state.creators = payload;
    },
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