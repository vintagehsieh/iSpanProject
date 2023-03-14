import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import ShopHome from "../pages/shop/views/shopHome.vue";
import ShopSecond from "@/pages/shop/views/shopSecond.vue";
import ProductItem from "@/pages/shop/views/productItem.vue";
import Cart from "@/pages/shop/views/cart.vue";
import Checkout from "@/pages/shop/views/checkout.vue";


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
  {
    path: "/productItem/:id",
    name: "productItem_id",
    component: ProductItem
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/checkout",
    component: Checkout
  }
];

const router = createRouter({
  history: createWebHashHistory(),

  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
