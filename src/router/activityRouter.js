import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import Activities from "../pages/activity/views/Activities/index.vue";
const routes = [
    {
        path: "/",
        name: "Activity",
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
