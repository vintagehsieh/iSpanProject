import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import ActivityHome from "../pages/activity/views/activityHome.vue";
import ActivitySecond from "../pages/activity/views/activitySecond.vue";
import Activities from "../pages/activity/views/Activities/index.vue";
const routes = [
  {
    path: "/",
    name: "Activity",
    component: ActivityHome,
  },
  {
    path: "/activitySecond",
    name: "second",
    component: ActivitySecond,
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities,
  },
  {
    path: "/activities/:id",
    name: "Activities_id",
    component: () => import("@/pages/activity/views/Activities/_id.vue"),
  },
  {
    path: "/:pathMatch(.*)",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
