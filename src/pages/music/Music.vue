<script>
import SideBar from '@/pages/music/components/SideBar.vue';
import PlayerFooter from '@/pages/music/components/MusicPlayer.vue'
import { ref } from 'vue'
import Cookies from "js-cookie";

export default {
  props: {
    handLogout: {
      type: Function,
      default: () => {

      },
    },
  },
  setup(props) {
    const memberNickname = ref("");

    if (Cookies.get("UserID") !== undefined) {
      memberNickname.value = Cookies.get("UserID");
    }

    return { props, memberNickname };
  },
  components: {
    SideBar,
    PlayerFooter
  },
  data() {
    return {
      memberOptionOpen: false,
    }
  },
  methods: {
    setAlbumId(id) {
      this.$store.dispatch('setAlbumId', id);
    },
    changeOpacity(e) {
      const parent = document.querySelector('.Root_top-container'); // select the parent element
      const firstChild = parent.firstElementChild;

      const scrollPosition = e.target.scrollTop;
      if (scrollPosition > 0) {
        const opacityValue = (scrollPosition / 300); // Calculate the opacity value based on the scroll position
        firstChild.style.opacity = opacityValue.toFixed(2); // Round the opacity value to two decimal places and set it as the opacity of the div
      } else {
        firstChild.style.opacity = '0'; // Reset the opacity when at top of page
      }
    },
    toggleMemberOption() {
      this.memberOptionOpen = !this.memberOptionOpen;
    }
  }
};
</script>
<template>
  <div class="Root_top-container">
    <div class="Root_top-bar">
    </div>
    <div id="member" @click="toggleMemberOption">
      <div class="picture">
        <img src="" alt="">
      </div>
      <div id="memberName">
        {{ memberNickname }}
      </div>
      <div id="caret"><font-awesome-icon icon="fa-solid fa-caret-down" v-if="memberOptionOpen == false" />
        <font-awesome-icon icon="fa-solid fa-caret-up" v-else />
      </div>
      <div id="memberOption" v-if="memberOptionOpen">
        <a href="member.html">
          <div id="memberCenter" class="option">
            會員中心
          </div>
        </a>
        <a href="shop.html#/cart">
          <div id="memberCart" class="option">
            購物車
          </div>
        </a>
        <a></a>
        <div id="memberCalendar" class="option">
          行事曆
        </div>
        <a href="index.html#">
          <div id="memberLogOut" class="option" @click="props.handLogout">

            登出
          </div>
        </a>
      </div>
    </div>
    <SideBar class="Root_nav-bar" />
    <PlayerFooter class="Root_now-playing-bar" />
    <div class="Root_main-view" @scroll="changeOpacity">
      <router-view class="routerView" />
    </div>
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  // 改字體
  font-family: "Microsoft JhengHei", "Heiti TC", "sans-serif";
  list-style: none;
}

.Root_top-container {
  >.Root_top-bar {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 18rem;
    width: 100%;
    height: 4rem;
    background-color: #212121;
    opacity: 0;
    transition: opacity 0.1s;

    /* Add a transition for a smooth effect */
  }

  #member {
    width: 9rem;
    height: 35px;
    position: absolute;
    background-color: #2c2c2c;
    border-radius: 50px;
    right: 3rem;
    top: 1rem;
    z-index: 11;
    padding: 3px 5px;
    display: flex;
    cursor: context-menu;

    &:hover {
      background-color: #616161;
    }

    .picture {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: #fff;
    }

    #memberName {
      width: 85px;
      height: 100%;
      margin-left: 5px;
      color: white;
      vertical-align: text-bottom;
      overflow-x: hidden;
    }

    #caret {
      color: white;
      display: flex;
      align-items: center;
    }

    #memberOption {
      position: absolute;
      top: 40px;
      left: -20px;
      width: 180px;
      height: 160px;
      background-color: #212121;
      border-radius: 10px;
      overflow: hidden;

      .option {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;

        &:hover {
          background-color: #fff;
          color: #f6973f;
        }
      }
    }
  }

  >.Root_nav-bar {
    width: 18rem;
    height: 88vh;
    top: 0;
    position: fixed;
    z-index: 10;
  }

  >.Root_now-playing-bar {
    width: 100%;
    height: 12vh;
    position: fixed;
    bottom: 0;
    background-color: black;
    display: flex;
  }

  >.Root_main-view {
    height: 100vh;
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    background-color: #202020;

    /* for Firefox */
    &::-webkit-scrollbar {
      display: none;
      /* for Chrome, Safari, and Opera */
    }

    margin-left: 18rem;

    >.routerView {
      margin-bottom: 5rem;
    }
  }
}

.link {
  text-decoration: none;
  color: white;

  &:hover {
    text-decoration: underline;
  }
}

.routerLink {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: lightgray;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: white;
    text-decoration: none;
  }

  >h3 {
    margin-left: 1rem;
  }
}
</style>
