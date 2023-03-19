<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

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
    const store = useStore();
    const username = computed(() => {
      return store.getters.getUserID;
    });

    onMounted(() => {
      store.dispatch("updateUserID");
    });

    return { props, username };
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
        <a href="music.html" v-if="props.isLogin" id="musicPage">音樂播放</a>
        <a href="shop.html" v-if="props.isLogin" id="shopPage">音樂商城</a>
        <a href="activity.html" v-if="props.isLogin" id="actPage">音樂活動</a>
        <a href="creator.html" v-if="props.isLogin" id="actPage">創作者</a>
      </div>
      <!-- membership -->
      <div class="loginSection">
        <div v-if="props.isLogin" class="avatar"></div>
        <div class="member" v-if="props.isLogin">
          <a href="member.html">{{ username }}</a>
        </div>
        <a href="login.html" class="login" v-if="!props.isLogin">會員登入</a>
        <button v-else @click="props.handLogout" class="logout">登出</button>
        <!-- 引入font-awesome -->
        <!-- <font-awesome-icon icon="fa-solid fa-caret-down" /> -->
      </div>
    </nav>
    <div class="blur"></div>
  </header>
</template>
<style lang="scss" scoped>
header {
  background-color: #1F2124;
  width: 100%;
  height: 100px;
  position: relative;
}

.blur {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  backdrop-filter: blur(12vmax);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 3;
  position: relative;

  > #logo {
    display: flex;
    margin-left: 10rem;
    width: 200px;
    height: 60px;
    overflow: hidden;
    z-index: 2;
    position: relative;

    > a img {
      display: flex;
      width: max(10vw, 200px);
      margin-top: -1rem;
      scale: 2;
      z-index: 4;
      position: relative;
    }
  }

  > #pages {
    display: flex;
    color: white;
    z-index: 4;
    position: relative;

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
    z-index: 2;
    position: relative;

    > .avatar {
      // 縮小不要變形
      display: flex;
      min-width: 30px;
      min-height: 30px;
      border-radius: 50%;
      background-color: rgba(247, 164, 82, 0.85);
    }
    > .member {
      margin: 0 1rem;
      padding: 0 1rem;
      a {
        font-size: 1.25rem;
        text-decoration: none;
        color: #f6b352;
        font-weight: bold;
      }
    }

    > a {
      text-decoration: none;
      color: white;
      padding-left: 1rem;
    }
    > .logout {
      width: 60px;
      height: 35px;
      border-radius: 8px;
      font-weight: bold;
      border: 0.5px solid rgba(0,0,0,0.3);
      cursor: pointer;
      &:hover {
        box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0.3),
          0 6px 20px 0 rgba(255, 255, 255, 0.19);
        border: none;
      }
    }
  }
}

font-awesome-icon {
  color: white;
}
</style>
