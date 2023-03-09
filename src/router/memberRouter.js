import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import MemberHome from "../pages/member/views/memberHome.vue";
import MemberSecond from "../pages/member/views/memberSecond.vue";

const routes = [
  {
    path: "/",
    name: "member",
    component: MemberHome,
  },
  {
    path: "/memberSecond",
    name: "second",
    component: MemberSecond,
  },

];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
