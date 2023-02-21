import { createRouter, createWebHistory } from "vue-router";
import MusicHome from "../pages/music/views/musicHome.vue";
import MusicSecond from "@/pages/music/views/musicSecond.vue";

const routes = [
  {
    path: "/",
    name: "music",
    component: MusicHome,
  },
  {
    path: "/musicSecond",
    name: "second",
    component: MusicSecond,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
