import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import Activities from "../pages/activity/views/Activities/index.vue";
import ActivitiesCalendar from "../pages/activity/views/activityCalendar.vue";
import ActivityApply from "@/pages/activity/views/activityApply.vue";
const routes = [
  {
    path: "/",
    name: "Activity",
    component: Activities,
  },
  {
    path: "/Activities/single/:id",
    name: "Activities_id",
    component: () => import("@/pages/activity/views/Activities/_id.vue"),
  },
  {
    path: "/activityCalendar",
    name: "Calendar",
    component: ActivitiesCalendar,
  },
  {
    path: "/activityApply",
    name: "Apply",
    component: ActivityApply,
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
