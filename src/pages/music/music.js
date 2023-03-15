import { createApp } from "vue";
import Music from "./Music.vue";
import router from "@/router/musicRouter";
import store from "@/store/index.js";
import Card from "@/pages/music/components/MusicCard.vue";
import Song from "@/pages/music/components/MusicSong.vue";
import Options from "@/pages/music/components/MusicOption.vue";
import Modal from "@/pages/music/components/MusicModal.vue";

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
    faCaretUp,
    faAngleLeft,
    faPlus,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';

import {
    faHeart,
    faClock,
    faSquarePlus,
    faCopyright
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faBars, faHeart, solidHeart, faUpRightAndDownLeftFromCenter, faVolumeHigh, faVolumeLow, faVolumeXmark, faShuffle, faBackwardStep, faPlay, faPause, faForwardStep, faRepeat, faEllipsis, faClock, faMagnifyingGlass, faHouse, faMusic, faCaretDown, faCaretUp, faAngleLeft, faSquarePlus, faPlus, faCopyright, faXmark)

createApp(Music).component('Modal', Modal).component('Options', Options).component('Card', Card).component('Song', Song).component('font-awesome-icon', FontAwesomeIcon).use(router).use(store).mount("#music");

