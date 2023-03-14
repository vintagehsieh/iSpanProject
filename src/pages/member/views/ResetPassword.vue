<template>
  <div>
    <div>
      <label>輸入新密碼</label>
      <input placeholder="請輸入新密碼" v-model.lazy.trim="NewPwd.NewPwd" />
      <label>確認新密碼</label>
      <input
        placeholder="請再次輸入新密碼"
        v-model.lazy.trim="confirmPassword"
      />
      <span v-if="passwordsMatch()">密碼相同</span>
      <span v-else>密碼不相同</span>
    </div>
    <button @click="sendPassword()">送出</button>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
export default {
  setup() {
    const isReset = ref(false);
    const NewPwd = reactive({
      NewPwd: "",
    });
    const url = window.location.href;
    const splash = url.split("/");
    const memberid = splash[splash.length - 2];
    const confirmCode = splash[splash.length - 1];
    const sendPassword = async () => {
      await axios
        .patch(
          `https://localhost:7043/Members/ResetPassword?memberid=${memberid}&${confirmCode}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          successFn();
          redirect();
        })
        .catch((err) => {
          console.log(err);
          // console.log(err.response.data.errors);
          // errorFn(err.response.data.errors);
        });
    };
    const passwordsMatch = () => {
      return this.reset.email === this.confirmPassword;
    };

    const redirect = () => {
      console.log("redirect");
      window.history.pushState({}, "", "/");
      window.location.reload();
    };
    return { isReset, NewPwd, error_message, sendPassword, passwordsMatch };
  },
};
</script>

<style>
</style>