import { createApp } from "vue";
import Member from "./Member.vue";
import router from "@/router/memberRouter";



import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(Member).use(router).mount("#member");
