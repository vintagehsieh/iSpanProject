import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import ResetPassword from "@/pages/resetPassword/ResetPassword.vue";

const routes = [
  {
    path: "/",
    name: "resetPassword/:memberId/:confirmCode",
    component: ResetPassword,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
