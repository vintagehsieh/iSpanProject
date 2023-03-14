<script>
import MemberSide from "@/pages/member/components/MemberSide";
import Header from "@/pages/member/components/Header.vue";
import { onMounted, ref } from "vue";

export default {
  components: {
    MemberSide,
    Header,
  },
  setup() {
    const isLogin = ref(false);
    onMounted(() => {
      const isLoginLocalStorage = localStorage.getItem("isLogin");
      if (isLoginLocalStorage) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }
    });
    return { isLogin };
  },
};
</script>
<template>
  <div class="container">
    <!-- header -->
    <div class="headContainer">
      <Header :isLogin="isLogin" :handLogout="handLogout" />
    </div>
    <!-- side -->
    <div class="sideContainer">
      <MemberSide />
    </div>
    <!-- router-view -->
    <!-- <div class="view"></div> -->
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

img {
  display: block;
}

html,
body {
  width: 100%;
  height: 100%;
}

#member {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .headContainer {
      display: block;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    .sideContainer {
      position: sticky;
      left: 0;
      top: 20px;
      height: 100%;
    }
    .view {
      flex: 1;
      overflow-y: scroll;
      background-color: white;
      display: flex;
      justify-content: start;
      align-items: start;
      padding-top: 7rem;
      margin-left: 9rem;
    }
  }
}
</style>
