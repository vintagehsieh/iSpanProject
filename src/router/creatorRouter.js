import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
  } from "vue-router";
 
  const routes = [
    {
      path: "/",
      name: "Creator",
      component: () => import("../pages/creator/Creator.vue") ,
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;
  