<script>
import { ref, watch, onMounted, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import emitter from "@/mitt";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  setup() {
    // 轉導頁面var
    const route = useRoute();
    const routeArr = ["", "calender", "applyCalender"];
    const idx = ref(0);
    // 側欄開關var
    const isOpen = ref(false);
    const isLogin = ref(false);
    const store = useStore();
    const searchWord = ref("");

    const queryParameters = computed(() => {
      return {
        ActivityName: searchWord.value,
        ActivityLocation: searchWord.value,
        ActivityTypeName: searchWord.value,
      };
    });

    const username = computed(() => {
      return store.getters.getUserID;
    });

    onMounted(() => {
      const isLoginLocalStorage = localStorage.getItem("isLogin");
      if (isLoginLocalStorage) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }

      store.dispatch("updateUserID");
    });

    const handLogout = () => {
      // 把isLogin改回false
      isLogin.value = false;

      // 清除cookie和localstorage
      Cookies.remove("UserID");
      localStorage.clear();

      deleteCookie();
      setTimeout(() => {
        redirect();
      }, 1000);
    };

    const redirect = () => {
      window.history.pushState({}, "", "/");
      window.location.reload();
    };

    const deleteCookie = () => {
      axios
        .post(
          "https://localhost:7043/Members/MemberLogOut",
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          { withCredentials: true }
        )
        .then((res) => {})
        .catch((err) => {});
    };

    watchEffect(() => {
      emitter.emit("searchInputChange", searchWord.value);
    });

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

    return {
      idx,
      isOpen,
      isLogin,
      username,
      searchWord,
      queryParameters,
      store,
      isOpenMitt,
      handToggleSideBar,
      handLogout,
    };
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
    <p>
      嗨，<span
        ><a href="member.html" style="color: #f6b352">{{ username }}</a></span
      ><br />
      想要來點活動?
    </p>
    <div class="logo">
      <img
        src="@/assets/music-note-icon-song-melody-tune-flat-symbol-free-vector.webp"
        alt=""
      />
    </div>
    <div class="link">
      <router-link to="/" :class="{ active: idx === 0 }"
        ><span><i class="fa-solid fa-bolt"></i></span>活動首頁</router-link
      >
      <router-link to="/activityCalendar" :class="{ active: idx === 1 }"
        ><span><i class="fa-solid fa-calendar"></i></span>行事曆</router-link
      >
      <!-- <router-link to="/applyActivity" :class="{ active: idx === 2 }"
        ><span><i class="fa-solid fa-plus"></i></span>申請活動</router-link
      > -->
    </div>
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
          placeholder="請輸入活動名稱、地點、類型"
          @input="() => store.dispatch('searchActivities', queryParameters)"
          v-model="searchWord"
        />
      </div>
      <div id="pages">
        <a href="music.html" v-if="isLogin" id="musicPage">音樂播放</a>
        <a href="shop.html" v-if="isLogin" id="shopPage">音樂商城</a>
        <a href="member.html" v-if="isLogin" id="actPage">會員</a>
        <a href="creator.html" v-if="isLogin" id="actPage">創作者</a>
      </div>
      <div class="loginSection">
        <button @click="handLogout" class="logout">登出</button>
      </div>
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
  font-family: "微軟正黑體";
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #1f2124;
}

a {
  text-decoration: none;
}

#activity {
  width: 100%;
  height: 100%;
  font-family: "微軟正黑體", Helvetica, Arial, sans-serif;
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
    background: linear-gradient(
      180deg,
      rgba(60, 61, 62, 1) 0%,
      rgba(59, 55, 49, 1) 100%
    );
    color: white;
    width: 500px; //20vw;
    height: 100%;
    transition: all 0.3s ease-in-out;
    &.open {
      margin-left: -500px; //-20vw;
    }
    // 招呼
    p {
      color: white;
      font-size: 1.25rem;
      margin-bottom: 1.75rem;
      letter-spacing: 2px;
      text-align: center;
      margin-top: -4rem;
      span {
        margin-top: 1rem;
      }
    }
    // 圖像
    .logo {
      width: 175px;
      height: 175px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        scale: 1.2;
        object-fit: cover;
      }
    }
    // 導覽
    > .side-navLogo {
      display: flex;
      position: absolute;
      top: -0.5rem;
      left: 1rem;
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
        z-index: 2;
        margin-top: 1.5rem;
        margin-left: 5.5rem;
      }
      > .logo {
        display: flex;
        width: 300px;
        height: 100px;
        overflow: hidden;
        z-index: 1;

        > img {
          position: absolute;
          top: 1rem;
          left: 0;
          width: 100%;
          height: 100%;
          scale: 1.2;
          object-fit: cover;
          padding-top: 8px;
          margin-left: 4rem;
        }
      }
    }
    .link {
      margin-top: 4rem;
      margin-left: -10px;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: white;
        margin-bottom: 2.5rem;
        font-size: 1.2rem;
        text-align: justify;
        &:hover {
          color: #f6b352;
        }
        span {
          padding-right: 1rem;
          font-size: 1.3rem;
        }
      }
    }
  }
  .content {
    overflow-x: hidden;
    .head {
      width: 100%;
      height: 100px;
      position: sticky;
      top: 0;
      background-color: rgb(31, 33, 36);
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
          display: flex;
          margin-left: 1rem;
          width: 200px;
          height: 100px;
          overflow: hidden;
          z-index: 2;
          margin-top: 2.5rem;

          > img {
            display: flex;
            width: max(10vw, 200px);
            margin-top: -1rem;
            scale: 2;
          }
        }
      }
      .search {
        border: 1px solid white;
        border-radius: 35px;
        margin-left: 2rem;
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
          color: white;
          &:focus {
            outline: none;
            color: white;
          }
        }
      }
      #pages {
        display: flex;
        color: white;

        > :nth-child(1) {
          margin-left: 1rem;
        }

        > a {
          text-decoration: none;
          color: white;
          padding-right: 3rem;
        }
      }
      .loginSection {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 5.5rem;
        > .logout {
          width: 60px;
          height: 35px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          &:hover {
            box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.2),
              0 6px 20px 0 rgba(255, 255, 255, 0.19);
          }
        }
      }
    }
    .view {
      display: flex;
      flex-direction: column;
      align-items: start;
      //   overflow-y: scroll;
      width: 100vw;
      height: auto;
      background-color: #1f2124;
      height: auto;
      padding-left: 5.75rem;
    }
  }
}
</style>
