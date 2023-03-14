import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import ShopHome from "../pages/shop/views/shopHome.vue";
import ProductItem from "@/pages/shop/views/productItem.vue";
import Cart from "@/pages/shop/views/cart.vue";
import Checkout from "@/pages/shop/views/checkout.vue";
import ShopSearch from "@/pages/shop/views/shopSearch.vue";

const routes = [
  {
    path: "/",
    name: "shop",
    component: ShopHome,
  },
  {
    path: "/productItem/:id",
    name: "productItem_id",
    component: ProductItem,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/shopSearch",
    component: ShopSearch,
  },
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
