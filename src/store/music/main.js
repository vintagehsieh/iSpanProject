import http from "@/plugins/http";

// count state 必須是 Object
const state = {
    popSongRowNumber: 2,
    popAlbumRowNumber: 2,
    popPlaylistRowNumber: 2,
    popArtistRowNumber: 2,
    popCreatorRowNumber: 2,
    popularSongs: {
        headerName: "熱門歌曲",
        items: []
    },
    popularAlbums: {
        headerName: "熱門專輯",
        items: {}
    },
    popularPlaylists: {
        headerName: "精選播放清單",
        items: {}
    },
    popularArtists: {
        headerName: "推薦藝人",
        items: {}
    },
    popularCreators: {
        headerName: "最受歡迎創作者",
        items: {}
    },
    playlist: {},
}

// getters 也可以整理到這邊直接返回 count 內容
const getters = {
    getPopSongRowNumber: state => state.popSongRowNumber,
    getPopAlbumRowNumber: state => state.popAlbumRowNumber,
    getPopPlaylistRowNumber: state => state.popPlaylistRowNumber,
    getPopArtistRowNumber: state => state.popArtistRowNumber,
    getPopCreatorRowNumber: state => state.popCreatorRowNumber,
    getPopSongs: state => state.popularSongs,
    getPopAlbums: state => state.popularAlbums,
    getPopPlaylists: state => state.popularPlaylists,
    getPopArtists: state => state.popularArtists,
    getPopCreators: state => state.popularCreators,
}

// actions 也是以 Object 形式建構。
const actions = {
    async fetchSongDataAsync({ state, commit }) {
        const responseSongs = await http(`https://localhost:7043/Songs/Popular?rowNumber=${state.popSongRowNumber}`);
        const songs = await responseSongs.json();
        commit("setPopSongs", songs);
    },
    async fetchAlbumDataAsync({ state, commit }) {
        const responseAlbums = await http(`https://localhost:7043/Albums/Recommended?rowNumber=${state.popAlbumRowNumber}`);
        const albums = await responseAlbums.json();
        commit("setPopAlbums", albums);
    },
    async fetchPlaylistDataAsync({ state, commit }) {
        const responsePlaylists = await http(`https://localhost:7043/Playlists/Recommended?rowNumber=${state.popPlaylistRowNumber}`);
        const playlists = await responsePlaylists.json();
        commit("setPopPlaylists", playlists);
    },
    async fetchArtistDataAsync({ state, commit }) {
        const responseArtists = await http(`https://localhost:7043/Artists/Recommended?rowNumber=${state.popArtistRowNumber}`);
        const artists = await responseArtists.json();
        commit("setPopArtists", artists);
    },
    async fetchCreatorDataAsync({ state, commit }) {
        const responseCreators = await http(`https://localhost:7043/Creators/Recommended?rowNumber=${state.popCreatorRowNumber}`);
        const creators = await responseCreators.json();
        commit("setPopCreators", creators);
    },
    increasePopSongRowNumber({ commit }) {
        commit("increasePopSongRowNumber");
    },
    setPopAlbumRowNumber({ commit }, newRowNumber) {
        commit("setPopAlbumRowNumber", newRowNumber);
    },
}

// mutations
const mutations = {
    setPopSongs(state, payload) {
        payload.forEach(element => {
            state.popularSongs.items.push(element);
        });
    },
    setPopAlbums(state, payload) {
        state.popularAlbums.items = payload
    },
    setPopPlaylists(state, payload) {
        state.popularPlaylists.items = payload
    },
    setPopArtists(state, payload) {
        state.popularArtists.items = payload
    },
    setPopCreators(state, payload) {
        state.popularCreators.items = payload
    },
    increasePopSongRowNumber(state) {
        state.popSongRowNumber++;
    },
    setPopAlbumRowNumber(state, payload) {
        state.popAlbumRowNumber = payload
    },

}

export default {
    state,
    getters,
    actions,
    mutations
}