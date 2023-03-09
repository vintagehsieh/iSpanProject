<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const isLogin = computed(() => {
      return store.getters.getIsLogin;
    });
    const router = useRouter();
    const loginInfo = reactive({
      memberAccount: "",
      memberPassword: "",
    });
    const memberAccount = computed(() => store.getters.getMemberAccount);
    const error_message = reactive({});

    onMounted(() => {
      const isLoginLocalStorage = localStorage.getItem("isLogin");
      if (isLoginLocalStorage) {
        store.commit("setIsLogin", true);
      }
      if (store.getters.getIsLogin) {
        setTimeout(() => {
          redirect();
        }, 1000);
      }
    });

    const handLoginFn = async () => {
      const success = await store.dispatch("login", loginInfo);
      if (success) {
        alert("登入成功");
        saveCookie();
        redirect();
      } else {
        alert("登入失敗，請檢查帳密");
      }
    };

    // 把登入訊息存在cookie 中
    const saveCookie = () => { 
      Cookies.set("loginInfo", loginInfo.memberAccount, { expires: 1 });
      localStorage.setItem("isLogin", true);
    };

    const redirect = () => {
      console.log("redirect");
      window.history.pushState({}, "", "/");
      window.location.reload();
      // window.location.href = "https://localhost:8080";
    };

    const handLoginFn = async () => {
      const success = await store.dispatch("login", loginInfo);
      if (success) {
        alert("登入成功");
        // store.commit("setIsLogin", true);
        saveCookie();
        redirect();
      } else {
        alert("登入失敗，請檢查帳密");
      }
    };

    const handRegisterFn = () => {
      router.push({ path: "/register" });
    };

    // const errorFn = (err) => {
    //   Object.keys(err).forEach((key) => (error_message[key] = err[key]));
    // };

    return {
      isLogin,
      loginInfo,
      memberAccount,
      handLoginFn,
      handRegisterFn,
      redirect,
      saveCookie,
      error_message,
    };
  },
};
</script>
<template>
  <div v-if="!isLogin">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <hr />
    <form>
      <div class="input-box">
        <p>帳號</p>
        <input
          type="text"
          placeholder="帳號"
          v-model="loginInfo.memberAccount"
        />
        <p v-if="error_message.username" class="error">
          {{ error_message.username }}
        </p>
      </div>
      <div class="input-box">
        <p>密碼</p>
        <input
          type="password"
          placeholder="輸入密碼"
          v-model="loginInfo.memberPassword"
        />
        <p v-if="error_message.password" class="error">
          {{ error_message.password }}
        </p>
      </div>
      <button type="submit" class="btn" @click="handLoginFn">送出</button>
      <button type="submit" class="btn" @click="handRegisterFn">註冊</button>
    </form>
  </div>
  <div v-if="isLogin" class="redirection">您已經登入，網頁轉導中...</div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: #233245;
  font-family: "微軟正黑體";
}

.logo {
  width: 300px;
  height: 100px;
  margin: 2rem auto;
  overflow: hidden;
  img {
    width: 100%;
    object-fit: cover;
    scale: 2;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  .input-box {
    display: flex;
    flex-direction: column;
    p {
      margin-top: 1.5rem;
      font-size: 1.25rem;
      padding-left: 5px;
      color: white;
    }
    input {
      width: 300px;
      height: 30px;
      border-radius: 20px;
      padding-left: 1rem;
    }
  }
  .btn {
    margin-top: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    width: 100px;
    height: 30px;
    border-radius: 8px;
    border: none;
    color: black;
    font-size: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
.redirection {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
}
</style>
