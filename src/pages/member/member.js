import { createApp } from "vue";
import Member from "./Member.vue";
import router from "@/router/memberRouter";
import modal from "@/pages/member/components/MemberModal.vue"


import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(Member).component('modal', modal).use(router).mount("#member");
