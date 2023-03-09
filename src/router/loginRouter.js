import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from "@/pages/login/Login.vue";
import Register from "@/pages/member/components/Register.vue"

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
