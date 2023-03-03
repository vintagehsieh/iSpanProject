import { createApp } from "vue";
import Member from "./Member.vue";
import router from "@/router/memberRouter";

createApp(Member).use(router).mount("#member");
