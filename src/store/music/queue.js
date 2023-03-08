import http from "@/plugins/http";

// count state 必須是 Object
const state = {
    queue: {},
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getQueue: state => state.queue,
    getCurrentSong: state => state.queue.songInfos[0],
}

// actions 也是以 Object 形式建構。
const actions = {
    async fetchQueueDataAsync({ commit }) {
        const response = await http(`https://localhost:7043/Members/Queue`);
        const responseQueue = await response.json();
        commit("setQueue", responseQueue);
    },
}

// mutations
const mutations = {
    setQueue(state, payload) {
        state.queue = payload;
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