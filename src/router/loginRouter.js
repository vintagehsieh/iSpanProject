limport {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Login from '../pages/login/Login.vue';
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
