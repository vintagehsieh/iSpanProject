import { createRouter, createWebHistory } from "vue-router";
import ActivityHome from "../pages/activity/views/activityHome.vue";
import ActivitySecond from "../pages/activity/views/activitySecond.vue";

const routes = [
  {
    path: "/",
    name: "activity",
    component: ActivityHome,
  },
  {
    path: "/activitySecond",
    name: "second",
    component: ActivitySecond,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
