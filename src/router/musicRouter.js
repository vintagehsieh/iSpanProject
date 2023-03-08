import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import MusicHome from "@/pages/music/views/musicHome.vue";
import MusicSearch from "@/pages/music/views/musicSearch.vue";
import MusicLibrary from "@/pages/music/views/musicLibrary.vue";
import MusicPlaylist from "@/pages/music/views/musicPlaylist.vue"
import CategorySearch from "@/pages/music/views/categorySearch.vue";
import MusicAlbum from "@/pages/music/views/musicAlbum.vue";
import MusicArtist from "@/pages/music/views/musicArtist.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MusicHome,
  },
  {
    path: "/music.html",
    name: "music",
    component: MusicHome,
  },
  {
    path: "/search",
    name: "search",
    component: MusicSearch,
  },
  {
    path: "/library",
    name: "library",
    component: MusicLibrary,
  },
  {
    path: "/playlist",
    name: "playlist",
    component: MusicPlaylist,
  },
  {
    path: "/categorySearch",
    name: "categorySearch",
    component: CategorySearch,
  },
  {
    path: "/album",
    name: "album",
    component: MusicAlbum,
  },
  {
    path: "/artist",
    name: "artist",
    component: MusicArtist,
  }
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

export default router;
