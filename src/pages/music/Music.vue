<script>
import SideBar from '@/pages/music/components/SideBar.vue';
import PlayerFooter from '@/pages/music/components/MusicPlayer.vue'
import { useStore } from 'vuex';

export default {
  setup() {
  },
  components: {
    SideBar,
    PlayerFooter
  },
  methods: {
    setAlbumId(id) {
      this.$store.dispatch('setAlbumId', id);
    }
  }
};
</script>
<template>
  <div class="Root_top-container">
    <div class="Root_top-bar">
    </div>
    <SideBar class="Root_nav-bar" />
    <PlayerFooter class="Root_now-playing-bar" />
    <div class="Root_main-view">
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
    width: 82rem;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0.0);
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
    margin-left: 18rem;
    background-color: #1F2124;

    >.routerView {
      margin-bottom: 5rem;
    }
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
