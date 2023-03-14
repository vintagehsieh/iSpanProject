<script>
import { ref } from "vue";
import Cookies from "js-cookie";

export default {
  props: {
    isLogin: {
      type: Boolean,
    },
    handLogout: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const memberAccount = ref("");

    if (Cookies.get("loginInfo") !== undefined) {
      memberAccount.value = Cookies.get("loginInfo");
    }

    return { props, memberAccount };
  },
};
</script>
<template>
  <header>
    <nav>
      <!-- logo -->
      <div id="logo">
        <a href="index.html"><img src="@/assets/logo.png" /></a>
      </div>
      <!-- Direct -->
      <div id="pages">
        <a href="music.html" id="musicPage">音樂播放</a>
        <a href="shop.html" id="shopPage">音樂商城</a>
        <a href="activity.html" id="actPage">音樂活動</a>
        <a href="creator.html" id="actPage">創作者</a>
      </div>
      <!-- membership -->
      <div class="loginSection">
        <button @click="props.handLogout" class="logout">登出</button>
      </div>
      <!-- 引入font-awesome -->
      <!-- <font-awesome-icon icon="fa-solid fa-caret-down" /> -->
    </nav>
  </header>
</template>
<style lang="scss" scoped>
header {
  background-color: #1f2124;
  width: 100%;
  height: 100px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  > #logo {
    display: flex;
    margin-left: 10rem;
    width: 200px;
    height: 60px;
    overflow: hidden;

    > a img {
      display: flex;
      width: max(10vw, 200px);
      margin-top: -1rem;
      scale: 2;
    }
  }

  > #pages {
    display: flex;
    color: white;

    > :nth-child(1) {
      margin-left: 2rem;
    }

    > a {
      text-decoration: none;
      color: white;
      padding-right: 6rem;
    }
  }

  > .loginSection {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10rem;
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

font-awesome-icon {
  color: white;
}
</style>
