import axios from "axios";

const state = {
  isLogin: false,
  loginInfo: {
    memberAccount: "",
    memberPassword: "",
  },
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
        commit("setIsLogin", true);
        commit("setLoginInfo", loginInfo);
        commit("setMemberAccount", loginInfo.memberAccount);
        return true;
      }
    } catch (err) {
      return false;
    }
  },
};

const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin;
 
  },
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  setMemberAccount(state, memberAccount) {
    state.memberAccount = memberAccount;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
