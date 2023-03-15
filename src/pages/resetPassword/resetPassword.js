import { createApp } from "vue";
import ResetPassword from "./ResetPassword.vue";
import router from "@/router/resetPasswordRouter";

createApp(ResetPassword).use(router).mount("#resetPassword");
