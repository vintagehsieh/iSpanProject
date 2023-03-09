<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const isLogin = ref(false);
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      const isLoginLocalStorage = localStorage.getItem("isLogin");
      if (isLoginLocalStorage) {
        isLogin.value = true;
      } else {
        isLogin.value = false;
      }
    });

    const handLogout = () => {
      // 把isLogin改回false
      isLogin.value = false;

      // 清除cookie和localstorage
      deleteCookie();
      Cookies.remove("loginInfo");
      localStorage.clear();

      redirect();
    };

    const redirect = () => {
      router.push({ path: route.path });
    };

    const deleteCookie = () => {
      fetch("https://localhost:7043/Members/MemberLogOut", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        Credential: "include",
      });
      // axios
      //   .post(
      //     "https://localhost:7043/Members/MemberLogOut",
      //     {},
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     },
      //     { withCredentials: true }
      //   )
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    };

    return { isLogin, handLogout };
  },
};
</script>

<template>
  <Header :isLogin="isLogin" :handLogout="handLogout" />

  <Footer />
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

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
