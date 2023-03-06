// count state 必須是 Object
const state = {
    creator: {},
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getCreator: state => state.creator
}

// actions 也是以 Object 形式建構。
const actions = {
    async setCreator({ commit }, creatorId) {
        const response = await fetch(`https://localhost:7043/Creators/${creatorId}`);
        const responseCreator = await response.json();
        commit("setCreator", responseCreator);
    }
}

// mutations
const mutations = {
    setCreator(state, payload) {
        state.creator = payload;
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