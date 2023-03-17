import axios from "axios";
import Cookies from "js-cookie";

const state = {
    isLogin: false,
    loginInfo: {
        memberAccount: "",
        memberPassword: "",
    },
    UserID: "",
};

const getters = {
    getIsLogin(state) {
        return state.isLogin;
    },
    getLoginInfo(state) {
        return state.loginInfo;
    },
    getMemberAccount(state) {
        return state.memberAccount;
    },
    getUserID(state) {
        return state.UserID;
    },
};

const actions = {
    async login({ commit }, loginInfo) {
        try {
            const res = await axios.post(
                "https://localhost:7043/Members/MemberLogin",
                loginInfo,
                { withCredentials: true }
            );
            if (res.status === 200) {
                const bool = !state.isLogin;
                commit("setIsLogin", bool);
                commit("setLoginInfo", loginInfo);
                commit("setMemberAccount", loginInfo.memberAccount);
                Cookies.set("UserID", res.data, { expires: 1 });
                return true;
            }
        } catch (err) {
            return false;
        }
    },
    async updateUserID({ commit }) {
        let User = "";
        await axios
            .get("https://localhost:7043/Members", { withCredentials: true })
            .then((res) => {
                User = res.data.memberNickName;
            });
        commit("setUserID", User);
    },
};

const mutations = {
    setIsLogin(state, bool) {
        state.isLogin = bool;
    },
    setLoginInfo(state, loginInfo) {
        state.loginInfo = loginInfo;
    },
    setMemberAccount(state, memberAccount) {
        state.memberAccount = memberAccount;
    },
    setUserID(state, payload) {
        state.UserID = payload;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
