import { createRouter, createWebHistory } from "vue-router";
import ShopHome from "../pages/shop/views/shopHome.vue";
import ShopSecond from "@/pages/shop/views/shopSecond.vue";

const routes = [
  {
    path: "/",
    name: "shop",
    component: ShopHome,
  },
  {
    path: "/shopSecond",
    name: "second",
    component: ShopSecond,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
