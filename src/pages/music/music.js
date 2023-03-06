import { createApp } from "vue";
import Music from "./Music.vue";
import router from "@/router/musicRouter";
import store from "@/store/index.js";
import Card from "@/pages/music/components/MusicCard.vue";
import Song from "@/pages/music/components/MusicSong.vue";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
    faBars,
    faUpRightAndDownLeftFromCenter,
    faCaretDown,
    faHeart as solidHeart,
    faVolumeHigh,
    faVolumeLow,
    faVolumeXmark,
    faShuffle,
    faBackwardStep,
    faPlay,
    faPause,
    faForwardStep,
    faRepeat,
    faEllipsis,
    faMagnifyingGlass,
    faHouse,
    faMusic,
    faCaretUp
} from '@fortawesome/free-solid-svg-icons';

import {
    faHeart,
    faClock,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faBars, faHeart, solidHeart, faUpRightAndDownLeftFromCenter, faVolumeHigh, faVolumeLow, faVolumeXmark, faShuffle, faBackwardStep, faPlay, faPause, faForwardStep, faRepeat, faEllipsis, faClock, faMagnifyingGlass, faHouse, faMusic, faCaretDown, faCaretUp)

createApp(Music).component('Card', Card).component('Song', Song).component('font-awesome-icon', FontAwesomeIcon).use(router).use(store).mount("#music");

