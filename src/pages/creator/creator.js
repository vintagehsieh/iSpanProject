
import { createApp } from "vue";
import Creator from "./Creator.vue";
import router from "@/router/creatorRouter";
import store from "@/store/index.js";
import Antd from 'ant-design-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

createApp(Creator).use(router).use(store).use(Antd).mount("#creator");
