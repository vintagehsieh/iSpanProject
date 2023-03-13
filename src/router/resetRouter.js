import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Reset from "@/pages/reset/Reset.vue";
import ResetPassword from "@/pages/reset/ResetPassword.vue";

const routes = [
  {
    path: "/",
    name: "reset",
    component: Reset,
  },
  {
    path: "/resetPassword",
    name: "resetPassword",
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
