<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const isLogin = ref(false);
    const loginInfo = reactive({
      memberAccount: "",
      memberPassword: "",
    });
    const router = useRouter();
    const error_message = reactive({});

    const successFn = () => {
      alert("登入成功");
      isLogin.value = true;
      redirect();
      // router.push({ path: "/home", redirect: "/" });
    };

    // const errorFn = (err) => {
    //   Object.keys(err).forEach((key) => (error_message[key] = err[key]));
    // };

    const handLoginFn = () => {
      axios
        .post("https://localhost:7043/Members/MemberLogin", loginInfo, {
          withCredentials: true,
        })
        .then((res) => {
          successFn();
        });
      // .catch((err) => {
      //   errorFn(err.response.data.error_message);
      // });
    };
    const redirect = () => {
      window.location.href = "http://localhost:8080/";
    };
    return { isLogin, loginInfo, handLoginFn, redirect, error_message };
  },
};
</script>
<template>
  <div class="logo">
    <img src="@/assets/logo.png" alt="" />
  </div>
  <hr />
  <form>
    <div class="input-box">
      <p>帳號</p>
      <input type="text" placeholder="帳號" v-model="loginInfo.memberAccount" />
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
  </form>
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
  display: flex;
  align-items: start;
  justify-content: center;
  font-family: "微軟正黑體";
}

.logo {
  width: 300px;
  height: 100px;
  margin: 2rem 0;
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
  align-items: start;
  justify-content: center;
  .input-box {
    display: flex;
    flex-direction: column;
    p {
      margin-top: 1.5rem;
      font-size: 1rem;
      padding-left: 5px;
      color: white;
    }
    input {
      width: 300px;
      height: 30px;
      border-radius: 20px;
      padding: 5px;
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
    color: white;
    font-size: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
}
</style>
