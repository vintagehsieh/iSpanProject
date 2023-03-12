import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
  } from "vue-router";
  import CreatorHome from "../pages/creator/Creator.vue";
  import UploadSong from "../pages/creator/UploadSong.vue";
 
  const routes = [
    {
      path: "/",
      name: "Creator",
      component: CreatorHome,
    },
    {
      path: "/UploadSong",
      name: "UploadSong",
      component: UploadSong,
    },
  ];
  
  const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  export default router;
  