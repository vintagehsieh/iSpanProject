import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/pages/login/Login.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
