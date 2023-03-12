import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Register from "@/pages/register/Register.vue";

const routes = [
  {
    path: "/",
    name: "register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
