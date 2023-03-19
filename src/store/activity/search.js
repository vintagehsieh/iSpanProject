import axios from "axios";

const state = {
  searchResults: [],
};

const getters = {
  getSearchResults(state) {
    return state.searchResults;
  },
};

const actions = {
  async searchActivities({ commit }, queryParameters) {
    try {
      const response = await axios.get(
        "https://localhost:7043/Activities/search",
        {
          params: queryParameters,
          withCredentials: true,
        }
      );
      commit("setSearchResults", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const mutations = {
  setSearchResults(state, searchResults) {
    state.searchResults = searchResults;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
