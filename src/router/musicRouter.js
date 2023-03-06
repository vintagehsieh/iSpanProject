import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import MusicHome from "@/pages/music/views/musicHome.vue";
import musicSearch from "@/pages/music/views/musicSearch.vue";
import musicLibrary from "@/pages/music/views/musicLibrary.vue";
import musicPlaylist from "@/pages/music/views/musicPlaylist.vue"
import categorySearch from "@/pages/music/views/categorySearch.vue";

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
    component: musicSearch,
  },
  {
    path: "/library",
    name: "library",
    component: musicLibrary,
  },
  {
    path: "/playlist",
    name: "playlist",
    component: musicPlaylist,
  },
  {
    path: "/categorySearch",
    name: "categorySearch",
    component: categorySearch,
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
