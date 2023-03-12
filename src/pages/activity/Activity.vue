<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import emitter from "@/mitt";

export default {
  setup() {
    // 轉導頁面var
    const route = useRoute();
    const routeArr = ["", "activitySecond", "activities"];
    const idx = ref(0);
    // 側欄開關var
    const isOpen = ref(false);

    //轉倒頁面fn
    watch(
      () => route.path,
      () => {
        routeArr.forEach((item, index) => {
          const rp = route.path.substr(1).split("/")[0];
          if (rp === item) {
            idx.value = index;
          }
        });
      }
    );
    const isOpenMitt = () => {
      emitter.emit("isOpenMitt", isOpen);
    };

    //側欄開關fn
    const handToggleSideBar = () => {
      isOpen.value = !isOpen.value;
      isOpenMitt();
    };

    return { idx, isOpen, isOpenMitt, handToggleSideBar };
  },
};
</script>
<template>
  <div :class="['navbar', { open: isOpen }]">
    <div :class="['side-navLogo', { open: isOpen }]">
      <a class="closeBtn" @click="handToggleSideBar">
        <i class="fa-solid fa-xmark"></i>
      </a>
      <a class="logo">
        <img src="@/assets/logo.png" alt="" />
      </a>
    </div>
    <router-link to="/" :class="{ active: idx === 0 }"
      >ActivityHome</router-link
    >
    <router-link to="/activitySecond" :class="{ active: idx === 1 }"
      >ActivitySecond</router-link
    >
    <router-link to="/activities" :class="{ active: idx === 2 }"
      >Activities</router-link
    >
  </div>
  <div class="content">
    <div class="head">
      <div class="navLogo" v-if="isOpen">
        <a class="menuBtn" @click="handToggleSideBar">
          <i class="fas fa-bars fa-3x"></i>
        </a>
        <a class="logo" href="index.html">
          <img src="@/assets/logo.png" alt="" />
        </a>
      </div>
      <div :class="['search', { open: isOpen }]">
        <span class="searchIcon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          class="searchInput"
          placeholder="請輸入活動名稱、時間、地點"
        />
      </div>
      <div class="login"></div>
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
#activity {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
  display: flex;
  .navbar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
    color: white;
    width: 20vw;
    height: 100%;
    transition: all 0.3s ease-in-out;
    &.open {
      margin-left: -20vw;
    }
    > .side-navLogo {
      display: flex;
      position: absolute;
      top: 1rem;
      left: 0.5rem;
      align-items: center;
      justify-content: center;
      width: 18vw;
      overflow: hidden;
      transition: all 0.3s ease-in-out;
      &.open {
        margin-left: -20vw;
      }
      > .closeBtn {
        cursor: pointer;
        font-size: 2rem;
        text-align: center;
        color: white;
        z-index: 1;
      }
      > .logo {
        position: relative;
        width: 180px;
        height: 60px;
        overflow: hidden;
        margin-left: -1rem;
        > img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          scale: 1.5;
          object-fit: cover;
          padding-top: 8px;
          padding-left: 4px;
        }
      }
    }
    > a {
      padding: 2.5rem;
      font-weight: bold;
      color: white;
      &.active {
        color: #42b983;
      }
    }
  }
  .content {
    overflow-x: hidden;
    .head {
      width: 100%;
      height: 10vh;
      position: sticky;
      top: 0;
      background-color: darkcyan;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 1;
      .navLogo {
        display: flex;
        position: absolute;
        left: -4rem;
        align-items: center;
        justify-content: center;
        width: 30vw;
        height: 50%;
        overflow: hidden;
        > .menuBtn {
          color: white;
          cursor: pointer;
          font-size: min(2vw, 10px);
          z-index: 1;
        }
        > .logo {
          position: relative;
          width: 200px;
          height: 60px;
          overflow: hidden;
          > img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            scale: 1.5;
            object-fit: cover;
            padding-top: 8px;
            padding-left: 4px;
            margin-left: -1rem;
          }
        }
      }
      .search {
        border: 1px solid white;
        border-radius: 35px;
        margin-left: -4rem;
        transition: all 0.2s ease-in-out;
        &.open {
          margin-left: 20vw;
        }
        > .searchIcon {
          margin-left: 1rem;
          margin-top: 1rem;
          font-size: 1rem;
          color: white;
        }
        > .searchInput {
          background-color: transparent;
          border: transparent;
          height: 45px;
          width: 500px;
          padding: 0 1rem;
          color: white;
          font-size: 1rem;
          &:focus {
            outline: none;
          }
        }
      }
      .login {
        width: 100px;
        height: 50px;
        border: 2px solid black;
      }
    }
    .view {
      display: flex;
      flex-direction: column;
      align-items: start;
      overflow-y: scroll;
      width: 100vw;
      background-color: #000;
      height: auto;
      padding-left: 5.75rem;
    }
  }
}
</style>
