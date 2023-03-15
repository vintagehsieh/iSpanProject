import { createApp } from "vue";
import Shop from "./Shop.vue";
import router from "@/router/shopRouter";
import Card from "@/pages/shop/components/productCard.vue";
import store from "@/store/index.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { faMagnifyingGlass, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";

import { faCircleUser } from "@fortawesome/free-regular-svg-icons";


library.add(faMagnifyingGlass, faCircleUser, faCartShopping, faTrash);

createApp(Shop)
  .component("Card", Card)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#shop");
