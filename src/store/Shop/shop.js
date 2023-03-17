import http from "@/plugins/http";
// count state 必須是 Object
const state = {
    coupon: {
        couponText: "",
        discount: ""
    },
    membercart: {
        value: []
    },
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getCoupon: state => state.coupon,
    getMembercart: state => state.membercart.value,
}

// actions 也是以 Object 形式建構。
const actions = {
    async setCoupon({ commit }, coupon) {
        commit("setCoupon", coupon);
    },
    async setMembercart({ commit }) {
        let membercart = []
        await fetch("https://localhost:7043/Carts/CartItem", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                membercart = data;
            });
        commit("setMembercart", membercart);
    },
}

// mutations
const mutations = {
    setCoupon(state, payload) {
        state.coupon.couponText = payload[0];
        state.coupon.discount = payload[1];
    },
    setMembercart(state, payload) {
        state.membercart.value = payload;
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