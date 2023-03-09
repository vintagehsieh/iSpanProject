import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import http from '@/plugins/http.js'

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

createApp(App).use(http).use(store).use(router).mount("#app");

