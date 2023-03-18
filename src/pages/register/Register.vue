<script>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const isReg = ref(false);
    const register = reactive({
      nickname: "",
      account: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    const error_message = reactive({});
    const isSubmitting = ref(false);

    const successFn = () => {
      alert("註冊成功");
      isReg.value = true;
      setTimeout(() => {
        redirect();
      }, 1000);
    };

    const errorFn = (err) => {
      Object.keys(err).forEach((key) => (error_message[key] = err[key]));
      console.log(error_message.Email);
    };

    const handRegister = async () => {
      if (isSubmitting.value) return;
      isSubmitting.value = true;
      await axios
        .post("https://localhost:7043/Members/Register", register, {
          withCredentials: true,
        })
        .then(() => {
          successFn();
        })
        .catch((err) => {
          // console.log(err.response.data.errors);
          isSubmitting.value = false;
          errorFn(err.response.data.errors);
        });
    };

    const redirect = () => {
      console.log("redirect");
      window.history.pushState({}, "", "/");
      window.location.reload();
    };

    return { isReg, register, error_message, handRegister, isSubmitting };
  },
  methods: {
    setRegister() {
      this.register.nickname = 'test01';
      this.register.account = 'test01';
      this.register.password = 'test01';
      this.register.confirmPassword = 'test01';
      this.register.email = 'FUEN25iSMusic@gmail.com'
    }
  }
};
</script>
<template>
  <div v-if="!isReg">
    <div class="logo">
      <img src="@/assets/logo.png" alt="" @click="setRegister" />
    </div>
    <hr />
    <form>
      <div class="input-box">
        <p>暱稱</p>
        <input type="text" placeholder="請輸入暱稱" v-model.lazy.trim="register.nickname" autocomplete="off" id="nickname" />
        <p v-if="error_message.NickName" class="error">
          {{ error_message.NickName[0] }}
        </p>
      </div>
      <div class="input-box">
        <p>帳號</p>
        <input type="text" placeholder="請輸入帳號" v-model.lazy.trim="register.account" autocomplete="off" id="account" />
        <p v-if="error_message.Account" class="error">
          {{ error_message.Account[0] }}
        </p>
      </div>
      <div class="input-box">
        <p>密碼</p>
        <!-- 至少要有英文加數字，最少八碼，不可以有特殊符號 -->
        <input type="password" placeholder="請輸入密碼" v-model.lazy.trim="register.password" autocomplete="off"
          id="password" />
        <p v-if="error_message.Password" class="error">
          {{ error_message.Password[0] }}
        </p>
      </div>
      <div class="input-box">
        <p>密碼驗證</p>
        <!-- 這邊要Regex match -->
        <input type="password" placeholder="請再次輸入密碼" v-model.lazy.trim="register.confirmPassword" autocomplete="off"
          id="confirmPassword" />
        <p v-if="error_message.ConfirmPassword" class="error">
          {{ error_message.ConfirmPassword[0] }}
        </p>
      </div>
      <div class="input-box">
        <p>信箱</p>
        <input type="email" placeholder="請輸入信箱" v-model="register.email" autocomplete="off" id="email" />
        <p v-if="error_message.Email" class="error">
          {{ error_message.Email[0] }}
        </p>
      </div>
      <button :disabled="isSubmitting" type="submit" @click.prevent="handRegister">
        送出
      </button>
    </form>
  </div>
  <div v-if="isReg" class="redirection">註冊成功，請至信箱收驗證信...</div>
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

    >p {
      margin-top: 1.5rem;
      font-size: 1.25rem;
      padding-left: 5px;
      color: white;
    }

    >input {
      width: 300px;
      height: 30px;
      border-radius: 20px;
      padding-left: 1rem;
    }

    .error {
      color: orange;
      font-size: 12px;
      margin-top: 0.25rem;
    }
  }

  >button {
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
