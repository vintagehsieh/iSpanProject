import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import MemberHome from "../pages/member/views/memberHome.vue";
import MemberSecond from "../pages/member/views/memberSecond.vue";
import MemberConfirm from "../pages/member/views/memberConfirm.vue"
import ForgetPassword from "../pages/member/views/forgetPassword.vue";
import ResetPassword from "../pages/member/views/resetPassword.vue";

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
  {
    path: "/memberConfirm/:memberId/:confirmCode",
    name: "memberConfirm",
    component: MemberConfirm,
  },
  {
    path: "/forgetPassword",
    name: "forgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/resetPassword/:memberId/:confirmCode",
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
