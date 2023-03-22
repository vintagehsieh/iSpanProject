import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
import MemberHome from "../pages/member/views/MemberHome.vue";
import MemberInfo from "../pages/member/views/MemberInfo.vue";
import MemberSubscription from "../pages/member/views/MemberSubscription.vue";
import MemberOrder from "../pages/member/views/MemberOrder.vue";
import MusicLibrary from "../pages/member/views/MusicLibrary.vue";
import MemberActivate from "../pages/member/views/MemberActivate.vue";

const routes = [
    {
        path: "/",
        name: "member",
        component: MemberHome,
    },
    {
        path: "/memberInfo",
        name: "memberInfo",
        component: MemberInfo,
    },
    {
        path: "/memberSubscription",
        name: "memberSubscription",
        component: MemberSubscription,
    },
    {
        path: "/memberOrder",
        name: "memberOrder",
        component: MemberOrder,
    },
    {
        path: "/memberActivate/:memberId/:confirmCode",
        name: "memberActivate",
        component: MemberActivate,
    },
];

const router = createRouter({
    history: createWebHashHistory(),

    // history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
