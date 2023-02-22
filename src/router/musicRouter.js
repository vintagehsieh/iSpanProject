import { createRouter, createWebHistory } from "vue-router";
import MusicHome from "@/pages/music/views/musicHome.vue";
import musicSearch from "@/pages/music/views/musicSearch.vue";

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
    name: "second",
    component: musicSearch,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
