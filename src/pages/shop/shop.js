import { createApp } from "vue";
import Shop from "./Shop.vue";
import router from "@/router/shopRouter";
import SideBar from "@/pages/shop/components/shopSideBar.vue";
import Card from "@/pages/shop/components/productCard.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

library.add(faMagnifyingGlass, faCircleUser);

createApp(Shop).component('SideBar', SideBar).component('Card', Card).component('font-awesome-icon', FontAwesomeIcon).use(router).mount("#shop");
