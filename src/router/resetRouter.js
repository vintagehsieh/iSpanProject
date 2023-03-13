import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Reset from "@/pages/reset/Reset.vue";

const routes = [
  {
    path: "/",
    name: "reset",
    component: Reset,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
