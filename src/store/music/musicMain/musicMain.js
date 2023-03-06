import { createStore } from "vuex";

export default createStore({
    state: {
        albumId: 0,
    },
    getters: {
        getAlbumId(state) {
            return state.albumId;
        }
    },
    mutations: {
        setAlbumId(state, payload) {
            state.isOpen = payload;
        },
    },
    actions: {
        setAlbumId(context) {
            const isOpen = !context.state.isOpen;
            context.commit("setAlbumId", isOpen);
        },
    },
});
