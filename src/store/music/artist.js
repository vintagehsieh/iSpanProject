import http from "@/plugins/http";
// count state 必須是 Object
const state = {
    artist: {},
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getArtist: state => state.artist
}

// actions 也是以 Object 形式建構。
const actions = {
    async setArtist({ commit }, artistId) {
        const response = await http(`https://localhost:7043/Artists/${artistId}/Detail`);
        const responseArtist = await response.json();
        commit("setArtist", responseArtist);
    },
}

// mutations
const mutations = {
    setArtist(state, payload) {
        state.artist = payload;
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