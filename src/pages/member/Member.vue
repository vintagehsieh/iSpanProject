<script>
import MemberSide from "@/pages/member/components/MemberSide";
import MemberHome from "@/pages/member/views/memberHome";
import Header from "@/components/Header.vue";
import { onMounted, ref } from "vue";

export default {
  components: {
    MemberSide,
    MemberHome,
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
  <!-- <Header :isLogin="isLogin" :handLogout="handLogout" /> -->

  <div class="Root_top-container">
    <div class="Root_top-bar"></div>
    <MemberSide class="Root_nav-bar" />
    <div class="Root_main-view">
      <!-- <router-view class="routerView" /> -->
    </div>
    <!-- <MemberHome /> -->
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  > .Root_top-bar {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 18rem;
    width: 100%;
    height: rem;
    background-color: rgba(0, 0, 0, 0);
  }

  > .Root_nav-bar {
    margin-top: 15rem;
    width: 18rem;
    height: 88vh;
    top: 0;
    position: fixed;
    z-index: 10;
  }

  > .Root_main-view {
    margin-left: 18rem;
    background-color: #1f2124;

    > .routerView {
      margin-bottom: 5rem;
    }
  }
}

.routerLink {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: rgb(49, 49, 49);
    text-decoration: none;
  }

  > h3 {
    margin-left: 1rem;
  }
}
</style>