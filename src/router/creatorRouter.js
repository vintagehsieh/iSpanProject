import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
  } from "vue-router";
  import CreatorHome from "../pages/creator/Creator.vue";
 
  const routes = [
    {
      path: "/",
      name: "Creator",
      component: CreatorHome,
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;
  