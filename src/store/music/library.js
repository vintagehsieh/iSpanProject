import http from "@/plugins/http";
// count state 必須是 Object
const state = {
    albums: [],
    playlists: [],
    artists: [],
    creators: [],
    albumsRowNumber: 2,
    playlistsRowNumber: 2,
    artistsRowNumber: 2,
    creatorsRowNumber: 2,
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getAlbums: state => state.albums,
    getPlaylists: state => state.playlists,
    getArtists: state => state.artists,
    getCreators: state => state.creators,
    getAlbumsRowNumber: state => state.albumsRowNumber,
    getPlaylistsRowNumber: state => state.playlistsRowNumber,
    getArtistsRowNumber: state => state.artistsRowNumber,
    getCreatorsRowNumber: state => state.creatorsRowNumber,
}

// actions 也是以 Object 形式建構。
const actions = {
    async setAlbums({ commit, state }, query) {
        if (query == undefined) {
            query = {};
            query["Condition"] = "RecentlyAdded";
            query["Value"] = "";
        }

        var url = `https://localhost:7043/Members/LikedAlbums?RowNumber=${state.albumsRowNumber}&Condition=${query.Condition}`
        if (query.Value != "") {
            url += `&Input=${query.Value}`;
        }
        const response = await http(url);
        const responseAlbums = await response.json();
        commit("setAlbums", responseAlbums);
    },
    async setPlaylists({ commit, state }, query) {
        if (query == undefined) {
            query = {};
            query["IncludedLiked"] = true;
            query["Condition"] = "RecentlyAdded";
            query["Value"] = "";
        }

        var url = `https://localhost:7043/Members/Playlists?RowNumber=${state.playlistsRowNumber}&IncludedLiked=${query.IncludedLiked}&Condition=${query.Condition}`;
        if (query.Value != "") {
            url += `&Value=${query.Value}`;
        }
        const response = await http(url);
        const responsePlaylists = await response.json();
        commit("setPlaylists", responsePlaylists);
    },
    async setArtists({ commit }, query) {
        if (query == undefined) {
            query = {};
            query["Condition"] = "RecentlyAdded";
            query["Value"] = "";
        }
        var url = `https://localhost:7043/Members/LikedArtists?RowNumber=${state.artistsRowNumber}&Condition=${query.Condition}`;
        if (query.Value != "") {
            url += `&Input=${query.Value}`;
        }
        const response = await http(url);
        const responseArtists = await response.json();
        commit("setArtists", responseArtists);
    },
    async setCreators({ commit }, query) {
        if (query == undefined) {
            query = {};
            query["Condition"] = "RecentlyAdded";
            query["Value"] = "";
        }

        var url = `https://localhost:7043/Members/LikedCreators?RowNumber=${state.creatorsRowNumber}&Condition=${query.Condition}`;
        if (query.Value != "") {
            url += `&Input=${query.Value}`;
        }
        const response = await http(url);
        const responseCreators = await response.json();
        commit("setCreators", responseCreators);
    },
    increaseAlbumsRowNumber({ commit }) {
        commit("increaseAlbumsRowNumber");
    },
    increasePlaylistRowNumber({ commit }) {
        commit("increasePlaylistRowNumber");
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
    increaseAlbumsRowNumber(state) {
        state.albumsRowNumber++;
    },
    increasePlaylistRowNumber(state) {
        state.playlistsRowNumber++;
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