import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "../views/Login.vue";
import Home from '@/App.vue'

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
